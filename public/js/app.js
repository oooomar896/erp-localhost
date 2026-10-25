/**
 * المنطق الرئيسي لبرنامج نماذج الموارد البشرية — دار تول للاستشارات
 */

const STORAGE_KEY = 'DARTOOL_HR_WORKSPACE_V1';

const CATEGORY_ICONS = {
  doc: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  wallet: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  cap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  chart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="18" x2="9" y2="15"/><line x1="15" y1="18" x2="15" y2="14"/></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><polyline points="8 12 11 12 12 9 14 15 15 12 17 12"/></svg>`,
  gear: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
};

const appState = {
  uiLang: 'ar', // 'ar' | 'en'
  selectedCategory: 'all',
  formLangFilter: 'all', // 'all' | 'ar' | 'en'
  searchQuery: '',
  selectedFormId: 'form-15',
  isBlankLetterMode: false,
  isDirectEditing: false,
  isTableCollapsed: false,
  zoomPercent: 100,
  showDecorativeFrame: true,
  customTemplates: [],
  formValuesById: {},
  customEditedHtmlById: {},
  company: {
    nameAr: 'شركة التقنية المتقدمة',
    nameEn: 'Advanced Technology Company',
    cr: '1010500123',
    phone: '0114000000',
    email: 'hr@company.sa',
    postal: '12345',
    managerName: '',
    docDate: '2026/10/23',
    logoDataUrl: '',
    signatureDataUrl: '',
    stampDataUrl: '',
    isSampleData: true
  },
  license: {
    activated: false,
    deviceId: '',
    clientName: 'العميل',
    type: ''
  }
};

const STANDALONE_LICENSE_KEY = 'DARTOOL_DEVICE_LIC_V1';
const _MS_KEY = 'DAR_TOOL_CONSULTING_HR_ERP_2026_MASTER_SECRET_KEY_#9981_SA';
const _MEM_STORE = {};

function safeGetStorage(key) {
  try {
    const val = localStorage.getItem(key);
    if (val !== null) return val;
  } catch (_) {}
  return _MEM_STORE[key] || null;
}

function safeSetStorage(key, val) {
  _MEM_STORE[key] = String(val);
  try {
    localStorage.setItem(key, String(val));
  } catch (_) {}
}

// Pure-JS synchronous SHA-256 + HMAC-SHA256 (works 100% offline on file://, PC, Laptop, Android, iOS)
function _sha256Bytes(ascii) {
  function rightRotate(v, amount) { return (v >>> amount) | (v << (32 - amount)); }
  const maxWord = Math.pow(2, 32);
  const words = [], asciiBitLength = ascii.length * 8;
  let hash = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const k = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ];
  ascii += '\x80';
  while (ascii.length % 64 - 56) ascii += '\x00';
  for (let i = 0; i < ascii.length; i++) {
    words[i >> 2] |= ascii.charCodeAt(i) << ((3 - i) % 4) * 8;
  }
  words[words.length] = ((asciiBitLength / maxWord) | 0);
  words[words.length] = (asciiBitLength);
  for (let j = 0; j < words.length;) {
    const w = words.slice(j, j += 16);
    const oldHash = hash.slice(0);
    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
      const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
      hash.pop();
    }
    for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
  }
  const out = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) out.push((hash[i] >> (j * 8)) & 255);
  }
  return out;
}

function _hmacHex(secret, message) {
  const utf8 = s => unescape(encodeURIComponent(String(s)));
  let k = utf8(secret), m = utf8(message);
  if (k.length > 64) k = String.fromCharCode(..._sha256Bytes(k));
  let oKey = '', iKey = '';
  for (let i = 0; i < 64; i++) {
    const b = i < k.length ? k.charCodeAt(i) : 0;
    oKey += String.fromCharCode(b ^ 0x5c);
    iKey += String.fromCharCode(b ^ 0x36);
  }
  const inner = _sha256Bytes(iKey + m);
  const outer = _sha256Bytes(oKey + String.fromCharCode(...inner));
  return outer.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

async function getStandaloneMobileOrPcDeviceId() {
  let savedHwId = safeGetStorage('DARTOOL_HW_DEVICE_ID');
  if (savedHwId && /^DT-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(savedHwId)) {
    return savedHwId;
  }
  const traits = [
    navigator.platform || '',
    navigator.language || '',
    screen.width + 'x' + screen.height + 'x' + (screen.colorDepth || 24),
    navigator.hardwareConcurrency || 4,
    navigator.deviceMemory || 4,
    Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  ].join('|');

  const hash = _hmacHex('DAR_TOOL_HWID_SALT_V1_2026', traits);
  const c = hash.slice(0, 12);
  savedHwId = `DT-${c.slice(0, 4)}-${c.slice(4, 8)}-${c.slice(8, 12)}`;
  safeSetStorage('DARTOOL_HW_DEVICE_ID', savedHwId);
  return savedHwId;
}

// Pre-verified hashes of the 30 VIP client codes + owner device key
const VALID_VIP_CODES_SET = new Set([
  'DTVIPC0015FD3FA7C', 'DTVIPC002834AE445', 'DTVIPC003E23AE59F', 'DTVIPC004D85AA562', 'DTVIPC005EFC49CA1',
  'DTVIPC006D1F52A9D', 'DTVIPC007B053D0B7', 'DTVIPC00848528770', 'DTVIPC0099A3CA0E4', 'DTVIPC010173050AF',
  'DTVIPC011A4DCA061', 'DTVIPC01212F2FD04', 'DTVIPC013BE099B89', 'DTVIPC014687A1030', 'DTVIPC015556D314F',
  'DTVIPC0167266A4E4', 'DTVIPC01759E53D89', 'DTVIPC018A2B909A4', 'DTVIPC019A2299E35', 'DTVIPC020A173CC45',
  'DTVIPC021CBCA2867', 'DTVIPC02234B48C40', 'DTVIPC023A8F5D5FA', 'DTVIPC0241CCF7CFE', 'DTVIPC02595E3BBE8',
  'DTVIPC026C46392E6', 'DTVIPC027D4524C2D', 'DTVIPC02822FDDC48', 'DTVIPC029DF116533', 'DTVIPC030AA47DE5C',
  'DTKEY0FD5E05637D11F44'
]);

function normalizeKeyDigitsAndAscii(raw) {
  return String(raw || '')
    .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x06F0))
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

async function verifyKeyClientSide(inputKey, deviceId) {
  const cleanUpper = normalizeKeyDigitsAndAscii(inputKey);
  if (!cleanUpper) return { valid: false, reason: 'يرجى إدخال رمز التفعيل.' };

  // 1. Check VIP Client Code (DTVIP-XXXX-XXXX-XXXX) or pre-authorized key
  if (VALID_VIP_CODES_SET.has(cleanUpper)) {
    return { valid: true, type: 'ترخيص دائم', clientName: 'عميل معتمد', deviceId };
  }

  // 2. Check Device-Specific Key (DTKEY-XXXX-XXXX-XXXX-XXXX)
  const hmac = _hmacHex(_MS_KEY, `PERMANENT_V1::${deviceId}`);
  const expected = 'DTKEY' + hmac.slice(0, 16);
  if (cleanUpper === expected) {
    return { valid: true, type: 'ترخيص دائم', clientName: 'عميل معتمد', deviceId };
  }

  return {
    valid: false,
    reason: 'رمز التفعيل غير صحيح أو أنه مرتبط بجهاز آخر. لا يعمل الرمز إلا على الجهاز المخصص له فقط.'
  };
}

// =========================================================
// 1. INITIALIZATION & DEVICE LICENSE VERIFICATION
// =========================================================
async function bootDarToolApp() {
  if (window.__dtAppBooted) return;
  window.__dtAppBooted = true;
  const wvNotice = document.getElementById('webviewJsNotice');
  if (wvNotice) wvNotice.style.display = 'none';
  const keyInp = document.getElementById('activationKeyInput');
  if (keyInp) {
    keyInp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitLicenseActivation();
      }
    });
  }
  initDefaultFormValues();
  renderAllUI();
  await checkDeviceLicense();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootDarToolApp);
} else {
  bootDarToolApp();
}

async function checkDeviceLicense() {
  try {
    let status = null;
    if (window.darToolDesktop && window.darToolDesktop.getLicenseStatus) {
      status = await window.darToolDesktop.getLicenseStatus();
    } else if (location.protocol.startsWith('http')) {
      try {
        const res = await fetch('/api/license/status');
        if (res.ok) status = await res.json();
      } catch (_) {}
    }

    // Standalone Mobile / PC Fallback (when running as single encrypted file without server)
    if (!status) {
      const devId = await getStandaloneMobileOrPcDeviceId();
      let savedLic = null;
      try { savedLic = JSON.parse(safeGetStorage(STANDALONE_LICENSE_KEY) || 'null'); } catch (_) {}
      if (savedLic && savedLic.deviceId === devId && savedLic.key) {
        const check = await verifyKeyClientSide(savedLic.key, devId);
        if (check.valid) {
          status = { activated: true, deviceId: devId, type: check.type, clientName: savedLic.clientName || 'العميل' };
        }
      }
      if (!status) {
        status = { activated: false, deviceId: devId };
      }
    }

    appState.license = status;
    document.getElementById('displayDeviceId').textContent = status.deviceId || 'DT-XXXX-XXXX-XXXX';
    document.getElementById('settingsDeviceId').textContent = status.deviceId || '';

    if (status.activated) {
      unlockApplication(status);
    } else {
      document.getElementById('licenseOverlay').classList.remove('hidden');
    }
  } catch (err) {
    console.error('License verification error:', err);
  }
}

async function submitLicenseActivation() {
  const keyInput = document.getElementById('activationKeyInput').value.trim();
  const clientInput = document.getElementById('activationClientInput').value.trim();
  const errBox = document.getElementById('licenseErrorBox');

  errBox.style.display = 'none';
  if (!keyInput) {
    errBox.textContent = 'يرجى إدخال رمز التفعيل الخاص بجهازك.';
    errBox.style.display = 'block';
    return;
  }

  try {
    let result = null;
    if (window.darToolDesktop && window.darToolDesktop.activateLicense) {
      result = await window.darToolDesktop.activateLicense(keyInput, clientInput);
    } else if (location.protocol.startsWith('http')) {
      try {
        const res = await fetch('/api/license/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activationKey: keyInput, clientName: clientInput })
        });
        result = await res.json();
      } catch (_) {}
    }

    // Standalone Mobile / PC Fallback
    if (!result) {
      const devId = await getStandaloneMobileOrPcDeviceId();
      const check = await verifyKeyClientSide(keyInput, devId);
      if (check.valid) {
        const record = { deviceId: devId, key: keyInput, clientName: clientInput || 'العميل', activatedAt: new Date().toISOString() };
        safeSetStorage(STANDALONE_LICENSE_KEY, JSON.stringify(record));
        result = { success: true, deviceId: devId, type: check.type, clientName: record.clientName };
      } else {
        result = { success: false, message: check.reason };
      }
    }

    if (!result.success) {
      errBox.textContent = result.message || 'رمز التفعيل غير صالح لهذا الجهاز.';
      errBox.style.display = 'block';
      return;
    }

    showToast('✅ تم تفعيل البرنامج وربطه بهذا الجهاز بنجاح!');
    unlockApplication(result);
  } catch (e) {
    errBox.textContent = 'حدث خطأ أثناء التحقق من رمز التفعيل.';
    errBox.style.display = 'block';
  }
}

async function unlockApplication(licenseInfo) {
  document.getElementById('licenseOverlay').classList.add('hidden');
  if (licenseInfo.clientName && licenseInfo.clientName !== 'عميل معتمد') {
    document.getElementById('headerClientName').textContent = licenseInfo.clientName;
  }
  document.getElementById('settingsLicenseType').textContent = licenseInfo.type || 'مفعّل';

  await loadSavedWorkspace();
  initDefaultFormValues();
  renderAllUI();
}

function copyDeviceId(btn) {
  const idText = document.getElementById('displayDeviceId').textContent.trim();
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(idText);
    } else {
      const ta = document.createElement('textarea');
      ta.value = idText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  } catch (_) {}
  const old = btn.textContent;
  btn.textContent = '✅ تم النسخ';
  setTimeout(() => { btn.textContent = old; }, 1800);
}

// =========================================================
// 2. WORKSPACE LOCAL PERSISTENCE (DISK + LOCALSTORAGE)
// =========================================================
function getAllTemplates() {
  const customHydrated = (appState.customTemplates || []).map(tpl => ({
    ...tpl,
    renderHtml: (vals) => {
      let text = tpl.bodyTemplate || '';
      text = text
        .replace(/\{اسم_الموظف\}/g, vals.employeeName || '________________')
        .replace(/\{المسمى_الوظيفي\}/g, vals.jobTitle || '________________')
        .replace(/\{القسم\}/g, vals.department || '________________');
      return `<div class="doc-body-content"><p class="doc-paragraph" style="white-space:pre-line;">${text}</p></div>`;
    }
  }));
  return [...window.DEFAULT_HR_TEMPLATES, ...customHydrated];
}

function initDefaultFormValues() {
  const all = getAllTemplates();
  all.forEach(tpl => {
    if (!appState.formValuesById[tpl.id]) {
      appState.formValuesById[tpl.id] = {};
      (tpl.fields || []).forEach(f => {
        appState.formValuesById[tpl.id][f.key] = f.defaultValue || '';
      });
    }
  });
}

async function loadSavedWorkspace() {
  // Try loading from local disk API first if running on localhost server
  if (location.protocol.startsWith('http')) {
    try {
      const res = await fetch('/api/workspace/load');
      if (res.ok) {
        const payload = await res.json();
        if (payload.exists && payload.data) {
          applyLoadedWorkspace(payload.data);
          return;
        }
      }
    } catch (_) {}
  }

  // Fallback to browser safeStorage
  try {
    const raw = safeGetStorage(STORAGE_KEY);
    if (raw) {
      applyLoadedWorkspace(JSON.parse(raw));
    }
  } catch (_) {}
}

function applyLoadedWorkspace(saved) {
  if (!saved) return;
  if (saved.company) appState.company = { ...appState.company, ...saved.company };
  if (saved.customTemplates) appState.customTemplates = saved.customTemplates;
  if (saved.formValuesById) appState.formValuesById = { ...appState.formValuesById, ...saved.formValuesById };
  if (saved.selectedFormId) appState.selectedFormId = saved.selectedFormId;
  if (typeof saved.showDecorativeFrame === 'boolean') {
    appState.showDecorativeFrame = saved.showDecorativeFrame;
    const chk = document.getElementById('chkShowDecorFrame');
    if (chk) chk.checked = saved.showDecorativeFrame;
  }
  if (saved.uiLang) appState.uiLang = saved.uiLang;
}

async function persistWorkspaceQuietly() {
  const snapshot = {
    company: appState.company,
    customTemplates: appState.customTemplates,
    formValuesById: appState.formValuesById,
    selectedFormId: appState.selectedFormId,
    showDecorativeFrame: appState.showDecorativeFrame,
    uiLang: appState.uiLang,
    updatedAt: new Date().toISOString()
  };

  safeSetStorage(STORAGE_KEY, JSON.stringify(snapshot));

  if (location.protocol.startsWith('http')) {
    try {
      await fetch('/api/workspace/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot)
      });
    } catch (_) {}
  }
}

async function saveCurrentWorkspaceManual() {
  await persistWorkspaceQuietly();
  showToast(appState.uiLang === 'en' ? '✅ Changes saved locally' : '✅ تم حفظ جميع البيانات والتعديلات محلياً');
}

// =========================================================
// 3. RENDER UI & COMPONENTS
// =========================================================
function renderAllUI() {
  applyLanguageTranslations();
  renderCompanySummaryAndLetterhead();
  renderCategoriesGrid();
  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  toggleA4FrameSetting(appState.showDecorativeFrame, false);
}

function renderCompanySummaryAndLetterhead() {
  const c = appState.company;

  // Sidebar Summary
  document.getElementById('summaryCompName').textContent = c.nameAr || c.nameEn || '—';
  document.getElementById('summaryCompCr').textContent = c.cr || '—';
  document.getElementById('summaryCompPhone').textContent = c.phone || '—';
  document.getElementById('summaryCompEmail').textContent = c.email || '—';
  document.getElementById('summaryCompPostal').textContent = c.postal || '—';

  const sampleBadge = document.getElementById('sampleDataNotice');
  if (sampleBadge) {
    sampleBadge.style.display = c.isSampleData ? 'block' : 'none';
  }

  // A4 Letterhead Meta (Hide row if empty so no awkward blanks appear - Test Case 8)
  const setMetaRow = (rowId, valId, val) => {
    const rowEl = document.getElementById(rowId);
    const valEl = document.getElementById(valId);
    if (!val || !val.trim()) {
      rowEl.style.display = 'none';
    } else {
      rowEl.style.display = 'block';
      valEl.textContent = val;
    }
  };

  setMetaRow('docMetaCrRow', 'docCompCr', c.cr);
  setMetaRow('docMetaPhoneRow', 'docCompPhone', c.phone);
  setMetaRow('docMetaEmailRow', 'docCompEmail', c.email);
  setMetaRow('docMetaPostalRow', 'docCompPostal', c.postal);

  document.getElementById('docCompNameAr').textContent = c.nameAr || '';
  document.getElementById('docCompNameEn').textContent = c.nameEn || '';
  document.getElementById('docCurrentDate').textContent = c.docDate || new Date().toISOString().slice(0, 10).replace(/-/g, '/');

  // Stamp & Manager Name
  document.getElementById('stampCompName').textContent = c.nameAr || c.nameEn || '';
  document.getElementById('stampCompCr').textContent = c.cr || '';
  document.getElementById('docManagerNameDisplay').textContent = c.managerName || '';

  // Client Logo
  const defaultSvg = document.getElementById('defaultClientBuildingSvg');
  const uploadedLogo = document.getElementById('docClientUploadedLogo');
  if (c.logoDataUrl) {
    defaultSvg.style.display = 'none';
    uploadedLogo.src = c.logoDataUrl;
    uploadedLogo.style.display = 'block';
  } else {
    defaultSvg.style.display = 'block';
    uploadedLogo.style.display = 'none';
  }

  // Client Signature
  const defaultSig = document.getElementById('defaultSignatureSvg');
  const uploadedSig = document.getElementById('docUploadedSignature');
  if (c.signatureDataUrl) {
    defaultSig.style.display = 'none';
    uploadedSig.src = c.signatureDataUrl;
    uploadedSig.style.display = 'block';
  } else {
    defaultSig.style.display = 'block';
    uploadedSig.style.display = 'none';
  }

  // Client Stamp
  const defaultStamp = document.getElementById('defaultStampContent');
  const uploadedStamp = document.getElementById('docUploadedStamp');
  if (c.stampDataUrl) {
    defaultStamp.style.display = 'none';
    uploadedStamp.src = c.stampDataUrl;
    uploadedStamp.style.display = 'block';
  } else {
    defaultStamp.style.display = 'flex';
    uploadedStamp.style.display = 'none';
  }
}

function renderCategoriesGrid() {
  const container = document.getElementById('categoriesGrid');
  container.innerHTML = window.HR_CATEGORIES.map(cat => {
    const isActive = appState.selectedCategory === cat.id;
    const label = appState.uiLang === 'en' ? cat.nameEn : cat.nameAr;
    return `
      <div class="category-card ${isActive ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
        <div class="cat-icon">${CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.doc}</div>
        <div class="cat-name">${label}</div>
        <div class="cat-count">(${cat.badgeCount})</div>
      </div>
    `;
  }).join('');
}

function getFilteredTemplates() {
  const all = getAllTemplates();
  const q = (appState.searchQuery || '').trim().toLowerCase();

  return all.filter(tpl => {
    if (appState.selectedCategory !== 'all') {
      if (tpl.category !== appState.selectedCategory && tpl.secondaryCategory !== appState.selectedCategory) {
        return false;
      }
    }
    if (appState.formLangFilter === 'ar' && tpl.langType === 'en') return false;
    if (appState.formLangFilter === 'en' && tpl.langType === 'ar' && !tpl.titleEn) return false;

    if (q) {
      const catObj = window.HR_CATEGORIES.find(c => c.id === tpl.category);
      const catName = catObj ? `${catObj.nameAr} ${catObj.nameEn}`.toLowerCase() : '';
      const haystack = `${tpl.titleAr} ${tpl.titleEn || ''} ${tpl.docHeadingAr || ''} ${catName} ${tpl.number || ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function renderFormsTable() {
  const tbody = document.getElementById('formsTableBody');
  const filtered = getFilteredTemplates();

  const activeCatObj = window.HR_CATEGORIES.find(c => c.id === appState.selectedCategory);
  const badgeTotal = appState.searchQuery
    ? filtered.length
    : (activeCatObj ? activeCatObj.badgeCount : 72);
  document.getElementById('formsCountBadge').textContent = `(${badgeTotal})`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; padding:18px; color:#64748b;">
          لا توجد نماذج مطابقة لبحثك. يمكنك الضغط على (إنشاء خطاب جديد) أو (+ نموذج مخصص).
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((tpl, idx) => {
    const isSelected = !appState.isBlankLetterMode && appState.selectedFormId === tpl.id;
    const catObj = window.HR_CATEGORIES.find(c => c.id === tpl.category);
    const catLabel = catObj ? (appState.uiLang === 'en' ? catObj.nameEn : catObj.nameAr) : '';
    const formTitle = appState.uiLang === 'en' ? (tpl.titleEn || tpl.titleAr) : tpl.titleAr;

    return `
      <tr class="${isSelected ? 'selected' : ''}" onclick="selectFormTemplate('${tpl.id}')">
        <td>${idx + 1}</td>
        <td>
          <div class="form-name-cell">
            <span class="form-doc-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </span>
            <span>${formTitle}</span>
          </div>
        </td>
        <td style="text-align:center; color:#475569;">${catLabel}</td>
        <td style="text-align:center;">
          <span class="radio-circle"></span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderDynamicFieldsEditor() {
  const box = document.getElementById('fieldsEditorBox');
  const grid = document.getElementById('dynamicFieldsGrid');

  if (appState.isBlankLetterMode) {
    box.style.display = 'block';
    grid.innerHTML = `
      <div class="field-item" style="grid-column: 1 / -1;">
        <label>أنت الآن في وضع <strong>إنشاء خطاب جديد (فارغ)</strong> — يمكنك الكتابة مباشرة داخل ورقة الخطاب على اليسار أو تعديل العنوان كما تشاء.</label>
      </div>
    `;
    return;
  }

  const tpl = getAllTemplates().find(t => t.id === appState.selectedFormId);
  if (!tpl || !tpl.fields || tpl.fields.length === 0) {
    box.style.display = 'none';
    return;
  }

  box.style.display = 'block';
  const currentVals = appState.formValuesById[tpl.id] || {};

  grid.innerHTML = tpl.fields.map(field => {
    const val = currentVals[field.key] !== undefined ? currentVals[field.key] : (field.defaultValue || '');
    const label = appState.uiLang === 'en' ? (field.labelEn || field.labelAr) : field.labelAr;
    const suffix = appState.uiLang === 'en' ? field.suffixEn : field.suffixAr;

    if (field.type === 'select') {
      const optsHtml = (field.options || []).map(opt =>
        `<option value="${opt}" ${opt === val ? 'selected' : ''}>${opt}</option>`
      ).join('');
      return `
        <div class="field-item">
          <label>${label}</label>
          <div class="field-control-wrap">
            <select onchange="handleDynamicFieldChange('${tpl.id}', '${field.key}', this.value)">
              ${optsHtml}
            </select>
          </div>
        </div>
      `;
    }

    return `
      <div class="field-item">
        <label>${label}</label>
        <div class="field-control-wrap">
          <input
            type="text"
            value="${escapeHtmlAttr(val)}"
            oninput="handleDynamicFieldChange('${tpl.id}', '${field.key}', this.value)"
          />
          ${suffix ? `<span class="field-suffix">${suffix}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderLiveDocumentPreview() {
  const headingEl = document.getElementById('docMainHeading');
  const bodyEl = document.getElementById('docEditableBody');
  const blankBtn = document.getElementById('btnBlankLetter');

  if (appState.isBlankLetterMode) {
    blankBtn.classList.add('active');
    headingEl.textContent = appState.uiLang === 'en' ? 'OFFICIAL LETTER' : 'خطاب رسمي';
    bodyEl.innerHTML = `
      <div class="doc-body-content" style="min-height:240px;">
        <p class="doc-salutation">${appState.uiLang === 'en' ? 'To Whom It May Concern,' : 'السادة / .................................................. المحترمين،،'}</p>
        <p class="doc-paragraph">${appState.uiLang === 'en' ? 'Type your letter content here...' : 'السلام عليكم ورحمة الله وبركاته،،،'}</p>
        <p class="doc-paragraph"></p>
      </div>
    `;
    enableDirectDocEditing(true);
    return;
  }

  blankBtn.classList.remove('active');
  const tpl = getAllTemplates().find(t => t.id === appState.selectedFormId) || getAllTemplates()[0];
  if (!tpl) return;

  const effectiveLang = appState.formLangFilter === 'en' ? 'en' : appState.uiLang;
  headingEl.textContent = effectiveLang === 'en'
    ? (tpl.docHeadingEn || tpl.docHeadingAr)
    : tpl.docHeadingAr;

  const vals = appState.formValuesById[tpl.id] || {};
  bodyEl.innerHTML = tpl.renderHtml(vals, appState.company, effectiveLang);
}

// =========================================================
// 4. INTERACTIONS: SELECT FORM, EDIT FIELDS, BLANK LETTER
// =========================================================
function selectCategory(catId) {
  appState.selectedCategory = catId;
  renderCategoriesGrid();
  renderFormsTable();
}

function setFormLangFilter(filterVal, btnEl) {
  appState.formLangFilter = filterVal;
  document.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderFormsTable();
  renderLiveDocumentPreview();
}

function handleSearchAndFilter() {
  appState.searchQuery = document.getElementById('formSearchInput').value;
  renderFormsTable();
}

function toggleFormsTable() {
  appState.isTableCollapsed = !appState.isTableCollapsed;
  const container = document.getElementById('formsTableContainer');
  const btn = document.getElementById('btnToggleTable');
  if (appState.isTableCollapsed) {
    container.classList.add('collapsed');
    btn.textContent = appState.uiLang === 'en' ? 'Show Table' : 'إظهار الجدول';
  } else {
    container.classList.remove('collapsed');
    btn.textContent = appState.uiLang === 'en' ? 'Hide Table' : 'إخفاء الجدول';
  }
}

function selectFormTemplate(formId) {
  appState.isBlankLetterMode = false;
  appState.selectedFormId = formId;
  enableDirectDocEditing(false);
  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  persistWorkspaceQuietly();
}

function handleDynamicFieldChange(formId, fieldKey, newValue) {
  if (!appState.formValuesById[formId]) {
    appState.formValuesById[formId] = {};
  }
  appState.formValuesById[formId][fieldKey] = newValue;

  // Auto-calculate totalSalary in Job Offer Form (form-1) if basic/housing/transport change
  if (formId === 'form-1' && ['basicSalary', 'housingAllowance', 'transportAllowance'].includes(fieldKey)) {
    const v = appState.formValuesById[formId];
    const b = parseFloat((v.basicSalary || '0').replace(/,/g, '')) || 0;
    const h = parseFloat((v.housingAllowance || '0').replace(/,/g, '')) || 0;
    const t = parseFloat((v.transportAllowance || '0').replace(/,/g, '')) || 0;
    const sum = b + h + t;
    if (sum > 0) {
      v.totalSalary = sum.toLocaleString('en-US');
      renderDynamicFieldsEditor();
    }
  }

  renderLiveDocumentPreview();
  persistWorkspaceQuietly();
}

function clearCurrentFormInputs() {
  if (appState.isBlankLetterMode) {
    activateBlankLetterMode();
    return;
  }
  const tpl = getAllTemplates().find(t => t.id === appState.selectedFormId);
  if (!tpl) return;
  const current = appState.formValuesById[tpl.id] || {};
  const isAllEmpty = (tpl.fields || []).every(f => !current[f.key]);

  appState.formValuesById[tpl.id] = {};
  (tpl.fields || []).forEach(f => {
    appState.formValuesById[tpl.id][f.key] = isAllEmpty ? (f.defaultValue || '') : '';
  });
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  showToast(isAllEmpty ? 'تمت استعادة البيانات الافتراضية للنموذج' : 'تم تفريغ حقول النموذج (اضغط مرة أخرى لاستعادة الافتراضي)');
}

function activateBlankLetterMode() {
  appState.isBlankLetterMode = true;
  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  const bodyEl = document.getElementById('docEditableBody');
  if (bodyEl) bodyEl.focus();
  showToast(appState.uiLang === 'en' ? 'Blank letter opened with your letterhead' : 'تم فتح خطاب جديد فارغ بترويسة منشأتك');
}

function toggleDirectDocEditing() {
  enableDirectDocEditing(!appState.isDirectEditing);
  if (appState.isDirectEditing) {
    document.getElementById('docEditableBody').focus();
    showToast('وضع التحرير المباشر مفعّل: يمكنك تعديل وتنسيق أي نص داخل الخطاب');
  }
}

function enableDirectDocEditing(enable) {
  appState.isDirectEditing = enable;
  const bodyEl = document.getElementById('docEditableBody');
  const btn = document.getElementById('btnToggleEditDoc');
  const fmtBar = document.getElementById('richFormatBar');
  bodyEl.contentEditable = enable ? 'true' : 'false';
  if (enable) {
    bodyEl.classList.add('editing-active');
    btn.classList.add('active');
    if (fmtBar) fmtBar.style.display = 'flex';
  } else {
    bodyEl.classList.remove('editing-active');
    btn.classList.remove('active');
    if (fmtBar) fmtBar.style.display = 'none';
  }
}

function execDocCommand(cmd) {
  enableDirectDocEditing(true);
  document.execCommand(cmd, false, null);
  document.getElementById('docEditableBody').focus();
}

let currentDocFontScale = 0.92;
function adjustDocFontSize(dir) {
  currentDocFontScale = Math.min(1.25, Math.max(0.74, +(currentDocFontScale + dir * 0.05).toFixed(2)));
  const bodyEl = document.getElementById('docEditableBody');
  if (bodyEl) bodyEl.style.fontSize = `${currentDocFontScale}rem`;
}

function resetCurrentDocBody() {
  currentDocFontScale = 0.92;
  const bodyEl = document.getElementById('docEditableBody');
  if (bodyEl) bodyEl.style.fontSize = '';
  renderLiveDocumentPreview();
  showToast('تمت استعادة النص الأصلي للنموذج');
}

function insertCustomParagraph() {
  enableDirectDocEditing(true);
  const bodyEl = document.getElementById('docEditableBody');
  const p = document.createElement('p');
  p.className = 'doc-paragraph';
  p.textContent = appState.uiLang === 'en' ? 'Additional paragraph text...' : 'اكتب النص الإضافي هنا...';
  bodyEl.appendChild(p);
  p.focus();
}

// =========================================================
// 5. COMPANY MODAL & IMAGE UPLOADS (LOGO, STAMP, SIGNATURE)
// =========================================================
function openModal(modalId) {
  if (modalId === 'companyModal') {
    const c = appState.company;
    document.getElementById('inputCompNameAr').value = c.nameAr || '';
    document.getElementById('inputCompNameEn').value = c.nameEn || '';
    document.getElementById('inputCompCr').value = c.cr || '';
    document.getElementById('inputCompPhone').value = c.phone || '';
    document.getElementById('inputCompEmail').value = c.email || '';
    document.getElementById('inputCompPostal').value = c.postal || '';
    document.getElementById('inputManagerName').value = c.managerName || '';
    document.getElementById('inputDocDate').value = c.docDate || '';
  }
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

function saveCompanyFromModal() {
  appState.company.nameAr = document.getElementById('inputCompNameAr').value.trim();
  appState.company.nameEn = document.getElementById('inputCompNameEn').value.trim();
  appState.company.cr = document.getElementById('inputCompCr').value.trim();
  appState.company.phone = document.getElementById('inputCompPhone').value.trim();
  appState.company.email = document.getElementById('inputCompEmail').value.trim();
  appState.company.postal = document.getElementById('inputCompPostal').value.trim();
  appState.company.managerName = document.getElementById('inputManagerName').value.trim();
  appState.company.docDate = document.getElementById('inputDocDate').value.trim();
  appState.company.isSampleData = false;

  renderCompanySummaryAndLetterhead();
  if (!appState.isBlankLetterMode) renderLiveDocumentPreview();
  persistWorkspaceQuietly();
  closeModal('companyModal');
  showToast('✅ تم تحديث بيانات المنشأة وترويسة الخطابات');
}

function clearAllCompanyData() {
  document.getElementById('inputCompNameAr').value = '';
  document.getElementById('inputCompNameEn').value = '';
  document.getElementById('inputCompCr').value = '';
  document.getElementById('inputCompPhone').value = '';
  document.getElementById('inputCompEmail').value = '';
  document.getElementById('inputCompPostal').value = '';
  document.getElementById('inputManagerName').value = '';
}

function handleImageUpload(event, targetType) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('يرجى اختيار ملف صورة صالح (PNG, JPG, SVG).');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    if (targetType === 'logo') appState.company.logoDataUrl = dataUrl;
    if (targetType === 'signature') appState.company.signatureDataUrl = dataUrl;
    if (targetType === 'stamp') appState.company.stampDataUrl = dataUrl;
    appState.company.isSampleData = false;
    renderCompanySummaryAndLetterhead();
    persistWorkspaceQuietly();
    showToast('✅ تم رفع الصورة وتحديث المعاينة');
  };
  reader.readAsDataURL(file);
}

function clearUploadedImage(targetType) {
  if (targetType === 'logo') appState.company.logoDataUrl = '';
  if (targetType === 'signature') appState.company.signatureDataUrl = '';
  if (targetType === 'stamp') appState.company.stampDataUrl = '';
  renderCompanySummaryAndLetterhead();
  persistWorkspaceQuietly();
}

// =========================================================
// 6. CUSTOM TEMPLATE CREATION & BACKUP
// =========================================================
function saveNewCustomTemplate() {
  const title = document.getElementById('newTplTitle').value.trim();
  const category = document.getElementById('newTplCategory').value;
  const heading = document.getElementById('newTplHeading').value.trim() || title;
  const body = document.getElementById('newTplBody').value.trim();

  if (!title || !body) {
    alert('يرجى إدخال اسم النموذج ونص الخطاب.');
    return;
  }

  const newId = 'custom-' + Date.now();
  const newTpl = {
    id: newId,
    number: getAllTemplates().length + 1,
    titleAr: title,
    titleEn: title,
    docHeadingAr: heading,
    docHeadingEn: heading,
    category,
    langType: 'both',
    bodyTemplate: body,
    fields: [
      { key: 'employeeName', labelAr: 'اسم الموظف', labelEn: 'Employee Name', type: 'text', defaultValue: 'أسامة بكر' },
      { key: 'jobTitle', labelAr: 'المسمى الوظيفي', labelEn: 'Job Title', type: 'text', defaultValue: 'مستشار إداري' },
      { key: 'department', labelAr: 'القسم', labelEn: 'Department', type: 'text', defaultValue: 'الإدارة العامة' }
    ]
  };

  appState.customTemplates.push(newTpl);
  initDefaultFormValues();
  appState.selectedFormId = newId;
  appState.isBlankLetterMode = false;

  renderFormsTable();
  renderDynamicFieldsEditor();
  renderLiveDocumentPreview();
  persistWorkspaceQuietly();
  closeModal('addTemplateModal');
  showToast('✅ تم إضافة النموذج الجديد بنجاح');
}

function exportWorkspaceBackup() {
  const dataStr = JSON.stringify({
    company: appState.company,
    customTemplates: appState.customTemplates,
    formValuesById: appState.formValuesById
  }, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DarTool_HR_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importWorkspaceBackup(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      applyLoadedWorkspace(parsed);
      initDefaultFormValues();
      renderAllUI();
      persistWorkspaceQuietly();
      closeModal('settingsModal');
      showToast('✅ تم استعادة النسخة الاحتياطية بنجاح');
    } catch (_) {
      alert('ملف النسخة الاحتياطية غير صالح.');
    }
  };
  reader.readAsText(file);
}

// =========================================================
// 7. NAVIGATION, LANGUAGE SWITCHER, ZOOM, PRINT & PDF
// =========================================================
function handleNavClick(navKey) {
  document.querySelectorAll('.nav-item').forEach(li => {
    li.classList.toggle('active', li.dataset.nav === navKey);
  });

  if (navKey === 'company') openModal('companyModal');
  if (navKey === 'settings') openModal('settingsModal');
  if (navKey === 'help') openModal('helpModal');
  if (navKey === 'forms') {
    document.getElementById('formSearchInput').focus();
  }
}

function toggleAppLanguage() {
  appState.uiLang = appState.uiLang === 'ar' ? 'en' : 'ar';
  renderAllUI();
  persistWorkspaceQuietly();
}

function applyLanguageTranslations() {
  const isEn = appState.uiLang === 'en';
  document.getElementById('currentLangLabel').textContent = isEn ? 'English' : 'العربية';
  document.getElementById('uiAppTitle').textContent = isEn ? 'HR Forms Management System' : 'برنامج نماذج الموارد البشرية';
  document.getElementById('uiAppSubtitle').textContent = isEn ? 'Manage your HR forms professionally' : 'إدارة نماذجك بسهولة واحترافية';

  document.getElementById('navHomeText').textContent = isEn ? 'Dashboard' : 'الرئيسية';
  document.getElementById('navFormsText').textContent = isEn ? 'Forms' : 'النماذج';
  document.getElementById('navCompanyText').textContent = isEn ? 'Company Info' : 'بيانات المنشأة';
  document.getElementById('navSettingsText').textContent = isEn ? 'Settings' : 'إعدادات';
  document.getElementById('navHelpText').textContent = isEn ? 'Help' : 'مساعدة';

  document.getElementById('sideCompanyTitle').textContent = isEn ? 'Company Profile' : 'بيانات المنشأة';
  document.getElementById('lblSideCompName').textContent = isEn ? 'Company Name' : 'اسم المنشأة';
  document.getElementById('lblSideCr').textContent = isEn ? 'Commercial Reg.' : 'السجل التجاري';
  document.getElementById('lblSidePhone').textContent = isEn ? 'Phone' : 'الهاتف';
  document.getElementById('lblSideEmail').textContent = isEn ? 'Email' : 'البريد الإلكتروني';
  document.getElementById('lblSidePostal').textContent = isEn ? 'Postal Code' : 'الرمز البريدي';
  document.getElementById('btnEditCompanyText').textContent = isEn ? 'Edit Profile' : 'تعديل البيانات';

  document.getElementById('centerTitle').textContent = isEn ? 'Select Appropriate Form' : 'اختر النموذج المناسب';
  document.getElementById('btnBlankLetterText').textContent = isEn ? 'New Blank Letter' : 'إنشاء خطاب جديد';
  const addTplEl = document.getElementById('btnAddTemplateText');
  if (addTplEl) addTplEl.textContent = isEn ? 'Custom Form' : 'نموذج مخصص';
  document.getElementById('formSearchInput').placeholder = isEn ? 'Search for a form...' : 'ابحث عن نموذج ...';

  document.getElementById('formsListTitle').textContent = isEn ? 'Forms List' : 'قائمة النماذج';
  document.getElementById('thFormName').textContent = isEn ? 'Form Name' : 'اسم النموذج';
  document.getElementById('thCategory').textContent = isEn ? 'Category' : 'الفئة';
  document.getElementById('fieldsEditorHeading').textContent = isEn ? 'Edit Form Details (Optional)' : 'تعديل بيانات النموذج (اختياري)';
  const resetBtn = document.getElementById('btnResetFields');
  if (resetBtn) resetBtn.textContent = isEn ? 'Reset Fields' : 'إعادة ضبط الحقول';

  document.getElementById('btnPrintText').textContent = isEn ? 'Print' : 'طباعة';
  document.getElementById('btnPreviewText').textContent = isEn ? 'Preview' : 'معاينة';
  document.getElementById('btnSavePdfText').textContent = isEn ? 'Save as PDF' : 'حفظ كملف PDF';

  document.getElementById('previewTitle').textContent = isEn ? 'Letter Preview' : 'معاينة الخطاب';
  document.getElementById('lblToolbarEdit').textContent = isEn ? 'Edit' : 'تعديل';
  document.getElementById('lblToolbarAddText').textContent = isEn ? 'Add Text' : 'إضافة نص';
  document.getElementById('lblToolbarSave').textContent = isEn ? 'Save' : 'حفظ';
  document.getElementById('docStampLabel').textContent = isEn ? 'Company Stamp' : 'ختم المنشأة';
}

function adjustZoom(delta) {
  appState.zoomPercent = Math.min(130, Math.max(70, appState.zoomPercent + delta));
  const sheet = document.getElementById('a4Sheet');
  sheet.style.transform = `scale(${appState.zoomPercent / 100})`;
  document.getElementById('zoomPercentLabel').textContent = `${appState.zoomPercent}%`;
}

function resetZoom() {
  appState.zoomPercent = 100;
  document.getElementById('a4Sheet').style.transform = 'scale(1)';
  document.getElementById('zoomPercentLabel').textContent = '100%';
}

function toggleA4FrameSetting(showFrame, persist = true) {
  appState.showDecorativeFrame = showFrame;
  const sheet = document.getElementById('a4Sheet');
  if (sheet) {
    sheet.classList.toggle('no-frame', !showFrame);
  }
  if (persist) persistWorkspaceQuietly();
}

function scrollToPreview() {
  const preview = document.getElementById('previewSection');
  if (preview) {
    preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function getSuggestedDocumentFilename() {
  const heading = document.getElementById('docMainHeading').textContent.trim() || 'مستند-الموارد-البشرية';
  const vals = appState.formValuesById[appState.selectedFormId] || {};
  const emp = vals.employeeName ? ` - ${vals.employeeName.trim()}` : '';
  return `${heading}${emp}`.replace(/[\\/:*?"<>|]/g, '-');
}

function triggerPrintDocument() {
  enableDirectDocEditing(false);
  const oldTitle = document.title;
  document.title = getSuggestedDocumentFilename();
  window.print();
  setTimeout(() => { document.title = oldTitle; }, 1000);
}

async function triggerExportPdf() {
  enableDirectDocEditing(false);
  const baseName = getSuggestedDocumentFilename();
  const safeName = `${baseName}.pdf`;

  if (window.darToolDesktop && window.darToolDesktop.exportPdfNative) {
    const res = await window.darToolDesktop.exportPdfNative(safeName);
    if (res && res.success) {
      showToast('✅ تم حفظ ملف PDF بنجاح');
    }
    return;
  }

  const oldTitle = document.title;
  document.title = baseName;
  showToast('📄 اختر "Save as PDF / حفظ بتنسيق PDF" من نافذة الطباعة');
  setTimeout(() => {
    window.print();
    setTimeout(() => { document.title = oldTitle; }, 1000);
  }, 250);
}

function showToast(msg) {
  const el = document.getElementById('toastMsg');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2600);
}

function escapeHtmlAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

Object.assign(window, {
  bootDarToolApp,
  checkDeviceLicense,
  submitLicenseActivation,
  copyDeviceId,
  selectCategory,
  setFormLangFilter,
  handleSearchAndFilter,
  toggleFormsTable,
  selectFormTemplate,
  handleDynamicFieldChange,
  clearCurrentFormInputs,
  activateBlankLetterMode,
  toggleDirectDocEditing,
  execDocCommand,
  adjustDocFontSize,
  resetCurrentDocBody,
  insertCustomParagraph,
  openModal,
  closeModal,
  saveCompanyFromModal,
  clearAllCompanyData,
  handleImageUpload,
  clearUploadedImage,
  saveNewCustomTemplate,
  exportWorkspaceBackup,
  importWorkspaceBackup,
  handleNavClick,
  toggleAppLanguage,
  adjustZoom,
  resetZoom,
  toggleA4FrameSetting,
  scrollToPreview,
  triggerPrintDocument,
  triggerExportPdf,
  saveCurrentWorkspaceManual
});

