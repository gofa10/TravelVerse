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

        // Replace http://localhost:8000
        content = content.replace(/http:\/\/localhost:8000/g, "${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}");
        
        // Let's resolve the template literal properly to avoid broken backticks.
        content = content.replace(/`http:\/\/localhost:8000/g, "`${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : ''}");

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    }
});
