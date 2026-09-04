const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico').default;

const pub = path.join(__dirname, '..', 'public');

pngToIco([path.join(pub, 'favicon-16x16.png'), path.join(pub, 'favicon-32x32.png')])
  .then((buf) => {
    fs.writeFileSync(path.join(pub, 'favicon.ico'), buf);
    console.log('favicon.ico written', buf.length, 'bytes');
  })
  .catch((err) => {
    console.error('ERROR:', err.message);
    process.exit(1);
  });
