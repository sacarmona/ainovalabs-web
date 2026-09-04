const fs = require('fs');
const path = require('path');

const srcPath = process.argv[2];
const raw = fs.readFileSync(srcPath, 'utf-8');
const envelope = JSON.parse(raw);
const inner = Array.isArray(envelope) ? envelope[0].text : envelope;
const dataUrl = JSON.parse(inner);

if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
  console.error('ABORT: no parece un data URL de imagen. Primeros 100 chars:', String(dataUrl).slice(0, 100));
  process.exit(1);
}

const b64 = dataUrl.split(',')[1];
const outPath = path.join(__dirname, '..', 'public', 'og-image.jpg');
fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
console.log('og-image.jpg written', Buffer.from(b64, 'base64').length, 'bytes');
