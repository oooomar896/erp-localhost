const {
  getDeviceId,
  normalizeDeviceId,
  generateShortActivationKey,
  generateExtendedLicenseKey
} = require('../src/license-engine');

const args = process.argv.slice(2);
const targetDeviceId = args[0] ? normalizeDeviceId(args[0]) : getDeviceId();
const clientName = args[1] || '';
const expiresAt = args[2] || null;

console.log('====================================================');
console.log('   DAR TOOL CONSULTING - أداة توليد تراخيص العملاء   ');
console.log('====================================================');
console.log(`معرّف الجهاز المستهدف (Device ID) : ${targetDeviceId}`);
const shortKey = generateShortActivationKey(targetDeviceId);
console.log(`رمز التفعيل الدائم (Activation Key): ${shortKey}`);

if (clientName || expiresAt) {
  const extKey = generateExtendedLicenseKey({
    deviceId: targetDeviceId,
    clientName,
    expiresAt
  });
  console.log(`رمز التفعيل المخصص (Extended Key)  : ${extKey}`);
}
console.log('====================================================');
