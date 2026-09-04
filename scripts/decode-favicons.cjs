// Decodifica el resultado de una llamada javascript_exec guardada en archivo.
// El transporte del tool serializa el valor de retorno UNA vez (JSON.stringify)
// dentro de {type:'text', text: <serializado>}, y ese envoltorio se vuelve a
// serializar al guardar el archivo. Por eso solo hace falta UN JSON.parse
// sobre `text` para recuperar el valor original devuelto por el navegador
// (siempre que en el navegador NO se haya llamado JSON.stringify manualmente).
const fs = require('fs');
const path = require('path');

const srcPath = process.argv[2];
const raw = fs.readFileSync(srcPath, 'utf-8');
const envelope = JSON.parse(raw);
const inner = Array.isArray(envelope) ? envelope[0].text : envelope;
const obj = JSON.parse(inner);

const outDir = path.join(__dirname, '..', 'public');
const names = {
  '16': 'favicon-16x16.png',
  '32': 'favicon-32x32.png',
  '48': 'favicon-48x48.png',
  '180': 'apple-touch-icon.png',
  '192': 'icon-192.png',
};

const keys = Object.keys(obj);
if (keys.some((k) => !(k in names))) {
  console.error('ABORT: claves inesperadas, no coinciden con los tamaños esperados:', keys.slice(0, 10));
  process.exit(1);
}

for (const [size, b64] of Object.entries(obj)) {
  const fname = names[size];
  fs.writeFileSync(path.join(outDir, fname), Buffer.from(b64, 'base64'));
  console.log(fname, 'written', Buffer.from(b64, 'base64').length, 'bytes');
}
