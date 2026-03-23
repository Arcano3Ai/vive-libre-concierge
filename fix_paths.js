const fs = require('fs');
const files = [
  'index.html',
  'css/style.css',
  'js/main.js',
  'public/cabins_data.json'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace 'assets/' with 'img/'
    const newContent = content.replace(/assets\//g, 'img/');
    // Also replace '../assets/' in css with '../img/'
    const finalContent = newContent.replace(/\.\.\/assets\//g, '../img/');
    fs.writeFileSync(file, finalContent);
    console.log(`Updated ${file}`);
  }
});
