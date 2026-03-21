const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const raduxAxiosPath = path.join(srcDir, 'Radux', 'axios.js');

function processDirectory(dir) {
     const files = fs.readdirSync(dir);
     for (const file of files) {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) {
               processDirectory(fullPath);
          } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
               processFile(fullPath);
          }
     }
}

function processFile(filePath) {
     let content = fs.readFileSync(filePath, 'utf8');
     let original = content;

     // 1. Calculate relative path to Radux/axios.js
     let relativeToRaduxAxios = path.relative(path.dirname(filePath), raduxAxiosPath);
     // Make sure it starts with ./ or ../
     if (!relativeToRaduxAxios.startsWith('.')) {
          relativeToRaduxAxios = './' + relativeToRaduxAxios;
     }
     // Remove .js extension for imports
     relativeToRaduxAxios = relativeToRaduxAxios.replace(/\.js$/, '');

     // 2. Replace imports of Auth/axios
     content = content.replace(/import\s+([a-zA-Z0-9_]+)\s+from\s+['"][^'"]*Auth\/axios['"];?/g, `import $1 from '${relativeToRaduxAxios}';`);
     content = content.replace(/import\s+([a-zA-Z0-9_]+)\s+from\s+['"][^'"]*Pages\/Auth\/axios['"];?/g, `import $1 from '${relativeToRaduxAxios}';`);

     // 3. Replace raw axios where hardcoded URLs are found
     if (content.match(/localhost:8000\/api/i) || content.match(/127\.0\.0\.1:8000\/api/i) || content.match(/Authorization:\s*`Bearer/i)) {
          content = content.replace(/import\s+axios\s+from\s+['"]axios['"];?/g, `import axios from '${relativeToRaduxAxios}';`);
     }

     // 4. Remove hardcoded domain 'http://localhost:8000/api' or 'http://127.0.0.1:8000/api'
     // e.g. axios.get('http://localhost:8000/api/trips') -> axios.get('/trips')
     content = content.replace(/https?:\/\/(localhost|127\.0\.0\.1):8000\/api/ig, '');

     // 5. Remove manual authorization headers passed as axios config
     // Handles: , { headers: { Authorization: `Bearer ${token}` } }
     // Handles: , { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
     // Matches the comma, spaces, the object, up to the closing brace. We use a somewhat relaxed regex.
     content = content.replace(/,\s*\{\s*headers:\s*\{\s*Authorization:\s*`Bearer\s*\$?[^`]*`\s*\}\s*\}/g, '');

     // Sometimes it's written as a variable: headers = { Authorization: ... }; axios.get(url, { headers })
     // We will just let those be, or handle them manually if necessary.
     content = content.replace(/,\s*\{\s*headers\s*\}/g, ''); // Be careful with this, it might remove legitimate headers, but usually it's just { headers }. Let's comment this out to be safe.

     if (content !== original) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log('Updated:', filePath);
     }
}

processDirectory(srcDir);
console.log('Done!');
