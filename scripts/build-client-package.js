/**
 * أداة بناء نسخة العميل المستقلة والجاهزة للمشاركة (Standalone Client Package Builder)
 * تنتج:
 * 1. dist-client/DarTool_HR_App.html (ونسخة في المجلد الرئيسي DarTool_HR_App.html) -> ملف واحد مضغوط يعمل مباشرة على الكمبيوتر واللابتوب والجوال بدون الحاجة لأي ملفات سورس كود إضافية.
 * 2. dist-client/تشغيل_نسخة_الكمبيوتر.bat -> مشغل فوري للكمبيوتر.
 * 3. تشغيل_البرنامج.bat + Run_DarTool_HR.bat -> مشغل البرنامج الرئيسي.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist-client');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// 1. Read source files
const rawHtml = fs.readFileSync(path.join(ROOT, 'public', 'index.html'), 'utf8');
const rawCss = fs.readFileSync(path.join(ROOT, 'public', 'css', 'styles.css'), 'utf8');
const rawTemplates = fs.readFileSync(path.join(ROOT, 'public', 'js', 'templates-data.js'), 'utf8');
const rawAppJs = fs.readFileSync(path.join(ROOT, 'public', 'js', 'app.js'), 'utf8');

// Extract body inner content from index.html
const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyInner = bodyMatch ? bodyMatch[1] : rawHtml;
bodyInner = bodyInner
  .replace(/<script\s+src="\/?js\/templates-data\.js"><\/script>/gi, '')
  .replace(/<script\s+src="\/?js\/app\.js"><\/script>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/\n\s+/g, '\n')
  .trim();

const minCss = rawCss
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};:,])\s*/g, '$1')
  .trim();

const stripJsComments = (code) => code
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split('\n')
  .map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//')) return '';
    return line;
  })
  .filter(Boolean)
  .join('\n');

const combinedJs = `
${stripJsComments(rawTemplates)}
${stripJsComments(rawAppJs)}
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes((e.key || '').toUpperCase())) || (e.ctrlKey && (e.key || '').toUpperCase() === 'U')) {
    e.preventDefault();
    return false;
  }
});
if (typeof bootDarToolApp === 'function') {
  bootDarToolApp();
}
`;

// Build a clean, single-file HTML that is NEVER blocked by WhatsApp, iOS QuickLook, Android HTML Viewer, or Windows SmartScreen
const standaloneHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>برنامج نماذج الموارد البشرية — دار تول للاستشارات</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>${minCss}</style>
</head>
<body>
${bodyInner}
<script>
${combinedJs}
</script>
</body>
</html>`;

const outHtmlPath = path.join(DIST_DIR, 'DarTool_HR_App.html');
fs.writeFileSync(outHtmlPath, standaloneHtmlContent, 'utf8');
fs.writeFileSync(path.join(DIST_DIR, 'index.html'), standaloneHtmlContent, 'utf8');
const rootHtmlPath = path.join(ROOT, 'DarTool_HR_App.html');
fs.writeFileSync(rootHtmlPath, standaloneHtmlContent, 'utf8');
fs.writeFileSync(path.join(ROOT, 'index.html'), standaloneHtmlContent, 'utf8');
fs.writeFileSync(path.join(ROOT, '.nojekyll'), '', 'utf8');
console.log('✅ 1. تم بناء نسخة العميل المتوافقة مع جميع أجهزة الكمبيوتر والجوال والواتساب و GitHub Pages: dist-client/DarTool_HR_App.html + index.html');

// 2. Create pure-ASCII CRLF Desktop Launcher for dist-client
const desktopBatContent = [
  '@echo off',
  'cd /d "%~dp0"',
  'start "" "%~dp0DarTool_HR_App.html"',
  'exit /b 0',
  ''
].join('\r\n');

fs.writeFileSync(path.join(DIST_DIR, 'تشغيل_نسخة_الكمبيوتر.bat'), desktopBatContent, 'ascii');
fs.writeFileSync(path.join(DIST_DIR, 'Run_DarTool_HR.bat'), desktopBatContent, 'ascii');
console.log('✅ 2. تم بناء مشغل الكمبيوتر بنجاح: dist-client/تشغيل_نسخة_الكمبيوتر.bat');

// 3. Create pure-ASCII CRLF Root Launcher
const rootBatContent = [
  '@echo off',
  'cd /d "%~dp0"',
  'where node >nul 2>nul',
  'if %errorlevel% equ 0 (',
  '  node server.js',
  ') else (',
  '  start "" "%~dp0DarTool_HR_App.html"',
  ')',
  ''
].join('\r\n');

fs.writeFileSync(path.join(ROOT, 'تشغيل_البرنامج.bat'), rootBatContent, 'ascii');
fs.writeFileSync(path.join(ROOT, 'Run_DarTool_HR.bat'), rootBatContent, 'ascii');
console.log('✅ 3. تم تحديث مشغل البرنامج الرئيسي: تشغيل_البرنامج.bat + Run_DarTool_HR.bat');
