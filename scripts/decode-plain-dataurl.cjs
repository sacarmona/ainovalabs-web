// Decodifica un archivo que contiene UNICAMENTE un data URL de imagen en texto plano
// (sin envoltorio JSON), a diferencia de decode-og.cjs que lee el formato guardado
// por el tool de resultados grandes.
const fs = require('fs');
const path = require('path');

const srcPath = process.argv[2];
const outPath = process.argv[3];
const dataUrl = fs.readFileSync(srcPath, 'utf-8').trim();

if (!dataUrl.startsWith('data:image/')) {
  console.error('ABORT: no es un data URL de imagen. Primeros 60 chars:', dataUrl.slice(0, 60));
  process.exit(1);
}

const b64 = dataUrl.split(',')[1];
fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
console.log(outPath, 'written', Buffer.from(b64, 'base64').length, 'bytes');
