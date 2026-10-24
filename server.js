const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const licenseEngine = require('./src/license-engine');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4580;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const WORKSPACE_FILE = path.join(DATA_DIR, 'client_workspace.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString('utf8');
      if (body.length > 15 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const pathname = parsedUrl.pathname;

  // --- API ENDPOINTS ---
  if (pathname === '/api/license/status' && req.method === 'GET') {
    const status = licenseEngine.getCurrentMachineLicenseStatus();
    return sendJson(res, 200, status);
  }

  if (pathname === '/api/license/activate' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const result = licenseEngine.activateCurrentMachine(
        body.activationKey || '',
        body.clientName || ''
      );
      return sendJson(res, result.success ? 200 : 400, result);
    } catch (err) {
      return sendJson(res, 400, { success: false, message: 'بيانات التفعيل غير صالحة.' });
    }
  }

  if (pathname === '/api/license/deactivate' && req.method === 'POST') {
    const result = licenseEngine.deactivateCurrentMachine();
    return sendJson(res, 200, result);
  }

  if (pathname === '/api/workspace/load' && req.method === 'GET') {
    const lic = licenseEngine.getCurrentMachineLicenseStatus();
    if (!lic.activated) {
      return sendJson(res, 403, { error: 'UNACTIVATED_DEVICE', deviceId: lic.deviceId });
    }
    if (fs.existsSync(WORKSPACE_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(WORKSPACE_FILE, 'utf8'));
        return sendJson(res, 200, { exists: true, data });
      } catch (_) {}
    }
    return sendJson(res, 200, { exists: false, data: null });
  }

  if (pathname === '/api/workspace/save' && req.method === 'POST') {
    const lic = licenseEngine.getCurrentMachineLicenseStatus();
    if (!lic.activated) {
      return sendJson(res, 403, { error: 'UNACTIVATED_DEVICE', deviceId: lic.deviceId });
    }
    try {
      const body = await readJsonBody(req);
      fs.writeFileSync(WORKSPACE_FILE, JSON.stringify(body, null, 2), 'utf8');
      return sendJson(res, 200, { success: true, savedAt: new Date().toISOString() });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: 'تعذر حفظ البيانات محلياً.' });
    }
  }

  // Serve Reference Docs if requested
  if (pathname.startsWith('/docs/')) {
    const safeDoc = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.(\/|\\|$))+/, '');
    const docPath = path.join(__dirname, safeDoc);
    if (fs.existsSync(docPath) && fs.statSync(docPath).isFile()) {
      const ext = path.extname(docPath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      return fs.createReadStream(docPath).pipe(res);
    }
  }

  // --- STATIC FRONTEND FILES ---
  let filePath = pathname === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, pathname);
  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

// Listen strictly on 127.0.0.1 (Localhost only - cannot be shared over network)
server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}`;
  const lic = licenseEngine.getCurrentMachineLicenseStatus();
  console.log('==============================================================');
  console.log('   برنامج نماذج الموارد البشرية — دار تول للاستشارات');
  console.log('==============================================================');
  console.log(`- الرابط المحلي للبرنامج : ${url}`);
  console.log(`- معرّف هذا الجهاز       : ${lic.deviceId}`);
  console.log(`- حالة الترخيص           : ${lic.activated ? 'مفعّل (' + lic.type + ')' : 'غير مفعّل (بانتظار إدخال رمز التفعيل)'}`);
  console.log('==============================================================');

  // Open as standalone desktop app window on Windows unless --no-open is passed
  if (!process.argv.includes('--no-open') && process.platform === 'win32') {
    // Try Microsoft Edge App Mode first for native desktop window experience, fallback to default browser
    exec(`start msedge --app="${url}" --window-size=1440,920`, (err) => {
      if (err) {
        exec(`start "" "${url}"`);
      }
    });
  }
});
