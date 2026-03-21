const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (f !== 'node_modules' && f !== '.git') {
            isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
        }
    });
}

walk('./src', function(filePath) {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        let originalContent = fs.readFileSync(filePath, 'utf8');
        let content = originalContent;

        // 1. Replace imports
        // Match things like `import axios from '../../Radux/axios';` or `import axios from '../Radux/axios';`
        content = content.replace(/import\s+axios\s+from\s+['"](.*)Radux\/axios['"];?/g, "import api from '$1Radux/axios';");
        
        // 2. Replace hardcoded localhost inside imports or strings
        content = content.replace(/['"]http:\/\/localhost:8000\/api(.*?)['"]/g, "import.meta.env.VITE_API_BASE_URL + '$1'");
        content = content.replace(/['"]http:\/\/localhost:8000(.*?)['"]/g, "import.meta.env.VITE_API_BASE_URL.replace('/api', '') + '$1'");

        // 3. Replace method calls from axios.* to api.* IF we imported api from Radux/axios (meaning it's the localized instance)
        // Wait, if a file imports standard 'axios' from 'axios', we shouldn't change its methods to `api.`
        // Let's only change method calls if it contains our `import api from '...Radux/axios'`
        if (content.includes("import api from '") && content.includes("Radux/axios")) {
            content = content.replace(/axios\.(get|post|put|delete|patch|interceptors|defaults|create)/g, "api.$1");
            // Also replace bare `axios(` calls to `api(`
            content = content.replace(/\baxios\(/g, "api(");
            
            // Fix some bad headers logic where they manually append Authorization Bearer etc string headers 
            // since the interceptor now handles it
            content = content.replace(/headers:\s*{\s*Authorization:\s*`Bearer.*?},\s*/g, ""); 
            content = content.replace(/headers:\s*{\s*Authorization:\s*`Bearer.*?}\s*}/g, "}");
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    }
});
