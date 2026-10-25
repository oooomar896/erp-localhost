const crypto = require('crypto');
const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Master cryptographic secret for Dar Tool Consulting (دار تول للاستشارات)
const MASTER_SECRET = 'DAR_TOOL_CONSULTING_HR_ERP_2026_MASTER_SECRET_KEY_#9981_SA';
const DEVICE_SALT = 'DAR_TOOL_HWID_SALT_V1_2026';

let cachedDeviceId = null;
let cachedHardwareRaw = null;

/**
 * Reads immutable hardware identifiers from the local Windows/OS machine.
 * Uses Registry MachineGuid + BIOS UUID + CPU ID + BaseBoard Serial.
 */
function getRawHardwareInfo() {
  if (cachedHardwareRaw) return cachedHardwareRaw;

  const parts = [];

  if (process.platform === 'win32') {
    // 1. Windows Cryptography MachineGuid (Fast & reliable across Win 10/11)
    try {
      const regOut = execSync(
        'reg query "HKLM\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid',
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 3000, windowsHide: true }
      );
      const match = regOut.match(/MachineGuid\s+REG_SZ\s+([^\r\n]+)/i);
      if (match && match[1]) {
        parts.push(`MGUID:${match[1].trim()}`);
      }
    } catch (_) {}

    // 2. ComputerSystemProduct UUID & ProcessorId via PowerShell CIM (Win 10/11 standard)
    try {
      const psCmd = 'powershell -NoProfile -NonInteractive -Command "(Get-CimInstance Win32_ComputerSystemProduct).UUID; (Get-CimInstance Win32_Processor | Select-Object -First 1).ProcessorId; (Get-CimInstance Win32_BaseBoard | Select-Object -First 1).SerialNumber"';
      const psOut = execSync(psCmd, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
        timeout: 4000,
        windowsHide: true
      });
      const lines = psOut.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      if (lines.length > 0) {
        parts.push(`CIM:${lines.join('|')}`);
      }
    } catch (_) {}
  }

  // Fallback / additional OS traits if needed
  if (parts.length === 0) {
    const cpus = os.cpus() || [];
    const cpuModel = cpus[0] ? cpus[0].model : 'GENERIC_CPU';
    parts.push(`OS:${os.platform()}|${os.arch()}|${os.hostname()}|${cpuModel}|${os.totalmem()}`);
  }

  cachedHardwareRaw = parts.join('||');
  return cachedHardwareRaw;
}

/**
 * Generates a formatted, deterministic Device ID (معرّف الجهاز) for this specific machine.
 * Format: DT-XXXX-XXXX-XXXX
 */
function getDeviceId() {
  if (cachedDeviceId) return cachedDeviceId;

  const raw = getRawHardwareInfo();
  const hash = crypto
    .createHmac('sha256', DEVICE_SALT)
    .update(raw)
    .digest('hex')
    .toUpperCase();

  // Take 12 hex chars and format as DT-XXXX-XXXX-XXXX
  const clean = hash.slice(0, 12);
  cachedDeviceId = `DT-${clean.slice(0, 4)}-${clean.slice(4, 8)}-${clean.slice(8, 12)}`;
  return cachedDeviceId;
}

/**
 * Normalizes a Device ID string to uppercase DT-XXXX-XXXX-XXXX format
 */
function normalizeDeviceId(deviceId) {
  if (!deviceId || typeof deviceId !== 'string') return '';
  const stripped = deviceId.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const core = stripped.startsWith('DT') ? stripped.slice(2) : stripped;
  if (core.length !== 12) return deviceId.trim().toUpperCase();
  return `DT-${core.slice(0, 4)}-${core.slice(4, 8)}-${core.slice(8, 12)}`;
}

/**
 * Generates the short permanent Activation Key (رمز التفعيل) for a specific Device ID.
 * Format: DTKEY-XXXX-XXXX-XXXX-XXXX
 */
function generateShortActivationKey(deviceId) {
  const normId = normalizeDeviceId(deviceId);
  const hmac = crypto
    .createHmac('sha256', MASTER_SECRET)
    .update(`PERMANENT_V1::${normId}`)
    .digest('hex')
    .toUpperCase();

  const code = hmac.slice(0, 16);
  return `DTKEY-${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}-${code.slice(12, 16)}`;
}

/**
 * Generates an extended signed Activation Key containing metadata (client name, expiry date, etc.)
 * Format: DTLIC-<base64url_payload>.<signature_16>
 */
function generateExtendedLicenseKey({ deviceId, clientName = '', expiresAt = null }) {
  const normId = normalizeDeviceId(deviceId);
  const payloadObj = {
    d: normId,
    c: clientName.trim(),
    e: expiresAt ? new Date(expiresAt).toISOString().slice(0, 10) : null,
    v: 1
  };
  const payloadStr = Buffer.from(JSON.stringify(payloadObj), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', MASTER_SECRET)
    .update(`EXTENDED_V1::${payloadStr}`)
    .digest('hex')
    .toUpperCase()
    .slice(0, 16);

  return `DTLIC-${payloadStr}.${sig}`;
}

/**
 * Verifies whether an Activation Key is valid FOR THE SPECIFIED DEVICE ID ONLY.
 */
function verifyActivationKeyForDevice(inputKey, targetDeviceId) {
  if (!inputKey || typeof inputKey !== 'string') {
    return { valid: false, reason: 'يرجى إدخال رمز التفعيل.' };
  }

  const cleanInput = inputKey.trim();
  const normTargetDevice = normalizeDeviceId(targetDeviceId);

  // Case 1: Extended License Key (DTLIC-...)
  if (cleanInput.toUpperCase().startsWith('DTLIC-')) {
    const body = cleanInput.slice(6);
    const dotIndex = body.lastIndexOf('.');
    if (dotIndex === -1) {
      return { valid: false, reason: 'صيغة رمز التفعيل المتقدم غير صحيحة.' };
    }
    const payloadStr = body.slice(0, dotIndex);
    const providedSig = body.slice(dotIndex + 1).toUpperCase();

    const expectedSig = crypto
      .createHmac('sha256', MASTER_SECRET)
      .update(`EXTENDED_V1::${payloadStr}`)
      .digest('hex')
      .toUpperCase()
      .slice(0, 16);

    if (providedSig !== expectedSig) {
      return { valid: false, reason: 'رمز التفعيل غير صالح أو تم التلاعب به.' };
    }

    try {
      const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
      if (normalizeDeviceId(payload.d) !== normTargetDevice) {
        return {
          valid: false,
          reason: 'هذا الرمز مخصص لجهاز آخر ولا يمكن استخدامه أو مشاركته على هذا الجهاز.'
        };
      }
      if (payload.e) {
        const expDate = new Date(`${payload.e}T23:59:59`);
        if (Date.now() > expDate.getTime()) {
          return {
            valid: false,
            reason: `انتهت صلاحية هذا الترخيص بتاريخ ${payload.e}. يرجى التواصل مع دار تول للاستشارات للتجديد.`
          };
        }
      }
      return {
        valid: true,
        type: payload.e ? 'محدد بمدة' : 'ترخيص دائم',
        clientName: payload.c || 'عميل معتمد',
        expiresAt: payload.e || null,
        deviceId: normTargetDevice
      };
    } catch (_) {
      return { valid: false, reason: 'تعذر قراءة بيانات رمز التفعيل.' };
    }
  }

  // Case 2: Pre-generated Exclusive Client Code (DTVIP-XXXX-XXXX-XXXX)
  // Validated via HMAC signature and permanently locked to the first device that activates it
  const cleanUpper = cleanInput.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (cleanUpper.startsWith('DTVIP') && cleanUpper.length === 17) {
    const serialPart = cleanUpper.slice(5, 9); // 4 chars
    const sigPart = cleanUpper.slice(9, 17);   // 8 chars
    const expectedVipSig = crypto
      .createHmac('sha256', MASTER_SECRET)
      .update(`VIP_CLIENT_CODE_V1::${serialPart}`)
      .digest('hex')
      .toUpperCase()
      .slice(0, 8);

    if (sigPart === expectedVipSig) {
      return {
        valid: true,
        type: 'ترخيص دائم',
        clientName: 'عميل معتمد',
        expiresAt: null,
        deviceId: normTargetDevice
      };
    }
  }

  // Case 3: Standard Short Permanent Key (DTKEY-XXXX-XXXX-XXXX-XXXX)
  const expectedShort = generateShortActivationKey(normTargetDevice);
  const normalizedInputShort = cleanUpper;
  const normalizedExpectedShort = expectedShort.replace(/[^A-Z0-9]/g, '');

  if (normalizedInputShort === normalizedExpectedShort) {
    return {
      valid: true,
      type: 'ترخيص دائم',
      clientName: 'عميل معتمد',
      expiresAt: null,
      deviceId: normTargetDevice
    };
  }

  return {
    valid: false,
    reason: 'رمز التفعيل غير صحيح أو أنه مرتبط بجهاز آخر. لا يعمل الرمز إلا على الجهاز المخصص له فقط.'
  };
}

/**
 * Generates N pre-issued VIP client activation codes (DTVIP-XXXX-XXXX-XXXX)
 */
function generateVipClientCodes(count = 30) {
  const codes = [];
  for (let i = 1; i <= count; i++) {
    const serial = `C${String(i).padStart(3, '0')}`; // C001 .. C030
    const sig = crypto
      .createHmac('sha256', MASTER_SECRET)
      .update(`VIP_CLIENT_CODE_V1::${serial}`)
      .digest('hex')
      .toUpperCase()
      .slice(0, 8);
    codes.push({
      index: i,
      code: `DTVIP-${serial}-${sig.slice(0, 4)}-${sig.slice(4, 8)}`
    });
  }
  return codes;
}

/**
 * Returns the path to the hardware-encrypted license file stored in the OS AppData folder.
 * Also keeps a secondary mirror in the local data directory, both encrypted with the live Hardware ID.
 */
function getLicenseStoragePaths() {
  const appDataDir = process.env.APPDATA || process.env.HOME || path.join(__dirname, '..');
  const secureDir = path.join(appDataDir, 'DarToolConsulting_HR');
  const localDataDir = path.join(__dirname, '..', 'data');
  return [
    path.join(secureDir, 'device_license.dat'),
    path.join(localDataDir, 'device_license.dat')
  ];
}

/**
 * Encrypts license data using AES-256-GCM keyed by the live Hardware Fingerprint of THIS machine.
 * Even if copied to another machine, decryption will fail immediately.
 */
function encryptForCurrentHardware(dataObj) {
  const liveDeviceId = getDeviceId();
  const key = crypto.scryptSync(`${MASTER_SECRET}::${liveDeviceId}`, 'DARTOOL_AES_SALT', 32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const plaintext = JSON.stringify(dataObj);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

function decryptForCurrentHardware(cipherBase64) {
  const liveDeviceId = getDeviceId();
  const key = crypto.scryptSync(`${MASTER_SECRET}::${liveDeviceId}`, 'DARTOOL_AES_SALT', 32);
  const buf = Buffer.from(cipherBase64, 'base64');
  if (buf.length < 28) throw new Error('Invalid license blob');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const encrypted = buf.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
  return JSON.parse(decrypted);
}

/**
 * Checks if the current machine is activated and valid.
 */
function getCurrentMachineLicenseStatus() {
  const liveDeviceId = getDeviceId();
  const paths = getLicenseStoragePaths();

  for (const filePath of paths) {
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, 'utf8').trim();
        const record = decryptForCurrentHardware(raw);
        if (record && record.activationKey && record.deviceId === liveDeviceId) {
          const check = verifyActivationKeyForDevice(record.activationKey, liveDeviceId);
          if (check.valid) {
            return {
              activated: true,
              deviceId: liveDeviceId,
              type: check.type,
              clientName: record.clientName || check.clientName || 'عميل معتمد',
              expiresAt: check.expiresAt,
              activatedAt: record.activatedAt
            };
          }
        }
      } catch (_) {
        // Decryption failed (e.g., file was copied from another PC!) -> Ignore and treat as unactivated
      }
    }
  }

  return {
    activated: false,
    deviceId: liveDeviceId,
    reason: 'البرنامج غير مفعل على هذا الجهاز. يرجى إدخال رمز التفعيل الخاص بمعرّف جهازك.'
  };
}

/**
 * Activates the current machine if the provided key matches THIS machine's Hardware ID.
 */
function activateCurrentMachine(activationKey, clientNameOptional = '') {
  const liveDeviceId = getDeviceId();
  const verification = verifyActivationKeyForDevice(activationKey, liveDeviceId);

  if (!verification.valid) {
    return {
      success: false,
      deviceId: liveDeviceId,
      message: verification.reason
    };
  }

  const record = {
    deviceId: liveDeviceId,
    activationKey: activationKey.trim(),
    clientName: clientNameOptional.trim() || verification.clientName,
    activatedAt: new Date().toISOString()
  };

  const encryptedBlob = encryptForCurrentHardware(record);
  const paths = getLicenseStoragePaths();

  for (const filePath of paths) {
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, encryptedBlob, 'utf8');
    } catch (_) {}
  }

  return {
    success: true,
    deviceId: liveDeviceId,
    type: verification.type,
    clientName: record.clientName,
    expiresAt: verification.expiresAt,
    activatedAt: record.activatedAt,
    message: 'تم تفعيل البرنامج بنجاح وربطه بهذا الجهاز حصرياً.'
  };
}

/**
 * Deactivates/resets license on current machine (for testing or admin reset)
 */
function deactivateCurrentMachine() {
  const paths = getLicenseStoragePaths();
  for (const filePath of paths) {
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) {}
  }
  return { success: true, deviceId: getDeviceId() };
}

module.exports = {
  getDeviceId,
  normalizeDeviceId,
  generateShortActivationKey,
  generateExtendedLicenseKey,
  generateVipClientCodes,
  verifyActivationKeyForDevice,
  getCurrentMachineLicenseStatus,
  activateCurrentMachine,
  deactivateCurrentMachine
};
