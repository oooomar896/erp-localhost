/**
 * أداة بناء نسخة العميل المحمية بدون السورس كود (No-Source-Code Builder)
 * تنتج في مجلد (dist-client/):
 * 1. DarTool_HR_App.html -> ملف واحد مشفر بالكامل (بدون سورس كود مقروء) يعمل على الجوال (Android/iOS) والكمبيوتر.
 * 2. DarTool_HR_Desktop.exe -> برنامج تنفيذي مستقل للكمبيوتر (Windows EXE) مدمج بداخله كل شيء بدون أي ملفات سورس كود.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const licenseEngine = require('../src/license-engine');

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
// Remove external script tags from bodyInner
bodyInner = bodyInner
  .replace(/<script\s+src="\/js\/templates-data\.js"><\/script>/gi, '')
  .replace(/<script\s+src="\/js\/app\.js"><\/script>/gi, '');

// Combine JS and trigger initialization immediately after unpacking
const combinedJs = `
${rawTemplates}
${rawAppJs}
// Anti-inspection protection for client build
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) {
    e.preventDefault();
    return false;
  }
});
if (document.readyState !== 'loading') {
  checkDeviceLicense();
}
`;

// Encrypt payload using multi-byte XOR key + Base64 so no HTML/CSS/JS is readable in source view
const XOR_KEY = 'DAR_TOOL_OBFUSCATION_SHIELD_2026_#991';
function obfuscateString(str) {
  const utf8Bytes = Buffer.from(str, 'utf8');
  const keyBytes = Buffer.from(XOR_KEY, 'utf8');
  const out = Buffer.alloc(utf8Bytes.length);
  for (let i = 0; i < utf8Bytes.length; i++) {
    out[i] = utf8Bytes[i] ^ keyBytes[i % keyBytes.length];
  }
  return out.toString('base64');
}

const encCss = obfuscateString(rawCss);
const encBody = obfuscateString(bodyInner);
const encJs = obfuscateString(combinedJs);

const protectedHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
<title>برنامج نماذج الموارد البشرية — دار تول للاستشارات</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
<script>
(function(_k,_c,_b,_j){
  function _d(b64){
    var bin=atob(b64),len=bin.length,bytes=new Uint8Array(len),kLen=_k.length;
    for(var i=0;i<len;i++){bytes[i]=bin.charCodeAt(i)^_k.charCodeAt(i%kLen);}
    return new TextDecoder('utf-8').decode(bytes);
  }
  var st=document.createElement('style');
  st.textContent=_d(_c);
  document.head.appendChild(st);
  document.body.innerHTML=_d(_b);
  var sc=document.createElement('script');
  sc.textContent=_d(_j);
  document.body.appendChild(sc);
})(${JSON.stringify(XOR_KEY)},${JSON.stringify(encCss)},${JSON.stringify(encBody)},${JSON.stringify(encJs)});
</script>
</body>
</html>`;

const outHtmlPath = path.join(DIST_DIR, 'DarTool_HR_App.html');
fs.writeFileSync(outHtmlPath, protectedHtmlContent, 'utf8');
console.log('✅ 1. تم بناء نسخة الجوال والكمبيوتر المشفرة (بدون سورس كود): dist-client/DarTool_HR_App.html');

// 2. Compile Native Windows Standalone EXE (DarTool_HR_Desktop.exe) using built-in csc.exe
const cscPath = 'C:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe';
if (fs.existsSync(cscPath)) {
  const htmlBase64 = Buffer.from(protectedHtmlContent, 'utf8').toString('base64');
  const csSource = `
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Diagnostics;
using System.Threading;

class DarToolDesktopApp {
    static readonly string AppHtmlBase64 = "${htmlBase64}";

    static void Main(string[] args) {
        byte[] htmlBytes = Convert.FromBase64String(AppHtmlBase64);
        TcpListener listener = new TcpListener(IPAddress.Loopback, 0);
        listener.Start();
        int port = ((IPEndPoint)listener.LocalEndpoint).Port;
        string url = "http://127.0.0.1:" + port + "/";

        Thread serverThread = new Thread(() => {
            while (true) {
                try {
                    using (TcpClient client = listener.AcceptTcpClient())
                    using (NetworkStream stream = client.GetStream()) {
                        byte[] buf = new byte[4096];
                        int read = stream.Read(buf, 0, buf.Length);
                        string header = "HTTP/1.1 200 OK\\r\\nContent-Type: text/html; charset=utf-8\\r\\nContent-Length: " + htmlBytes.Length + "\\r\\nCache-Control: no-store\\r\\nConnection: close\\r\\n\\r\\n";
                        byte[] headerBytes = Encoding.UTF8.GetBytes(header);
                        stream.Write(headerBytes, 0, headerBytes.Length);
                        stream.Write(htmlBytes, 0, htmlBytes.Length);
                        stream.Flush();
                    }
                } catch { break; }
            }
        });
        serverThread.IsBackground = true;
        serverThread.Start();

        try {
            ProcessStartInfo psi = new ProcessStartInfo("msedge", "--app=\\"" + url + "\\" --window-size=1440,920");
            psi.UseShellExecute = true;
            Process.Start(psi);
        } catch {
            Process.Start(url);
        }

        // Keep alive while user uses the app
        Thread.Sleep(Timeout.Infinite);
    }
}
`;
  const tempCsPath = path.join(DIST_DIR, '_temp_app.cs');
  const outExePath = path.join(DIST_DIR, 'DarTool_HR_Desktop.exe');
  fs.writeFileSync(tempCsPath, csSource, 'utf8');
  try {
    execSync(`"${cscPath}" /target:winexe /optimize+ /out:"${outExePath}" "${tempCsPath}"`, { stdio: 'pipe' });
    fs.unlinkSync(tempCsPath);
    console.log('✅ 2. تم بناء البرنامج التنفيذي للكمبيوتر (بدون سورس كود): dist-client/DarTool_HR_Desktop.exe');
  } catch (err) {
    if (fs.existsSync(tempCsPath)) fs.unlinkSync(tempCsPath);
    console.error('Failed to compile EXE:', err.message);
  }
}
