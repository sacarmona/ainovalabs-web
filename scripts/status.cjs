const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(dir);
const garbage = files.filter((f) => /^icon-\d+\.png$/.test(f));
const good = ['favicon.svg', 'favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];
const goodStatus = {};
for (const g of good) goodStatus[g] = files.includes(g);

console.log('total files:', files.length);
console.log('garbage icon-N.png count:', garbage.length);
console.log('good files present:', JSON.stringify(goodStatus, null, 2));
