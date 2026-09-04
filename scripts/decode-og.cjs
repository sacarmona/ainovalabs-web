const fs = require('fs');
const path = require('path');

const srcPath = process.argv[2];
const outPath = process.argv[3] || path.join(__dirname, '..', 'public', 'og-image.jpg');
const raw = fs.readFileSync(srcPath, 'utf-8');
const envelope = JSON.parse(raw);
const inner = Array.isArray(envelope) ? envelope[0].text : envelope;
let dataUrl = JSON.parse(inner);

// soporta el relleno "|PAD|xxxx" usado para forzar el guardado a archivo
if (typeof dataUrl === 'string' && dataUrl.includes('|PAD|')) {
  dataUrl = dataUrl.split('|PAD|')[0];
}

if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
  console.error('ABORT: no parece un data URL de imagen. Primeros 100 chars:', String(dataUrl).slice(0, 100));
  process.exit(1);
}

const b64 = dataUrl.split(',')[1];
fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
console.log(outPath, 'written', Buffer.from(b64, 'base64').length, 'bytes');
