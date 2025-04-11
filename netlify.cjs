// The purpose of this file is to help with Netlify deployment

const fs = require('fs');
const path = require('path');

// Make sure the public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Ensure _redirects file exists for client-side routing
if (!fs.existsSync(path.join('public', '_redirects'))) {
  fs.writeFileSync(
    path.join('public', '_redirects'),
    '/* /index.html 200',
    'utf8'
  );
}

// Ensure _headers file exists for proper MIME types
if (!fs.existsSync(path.join('public', '_headers'))) {
  fs.writeFileSync(
    path.join('public', '_headers'),
    `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block

/*.js
  Content-Type: text/javascript

/*.mjs
  Content-Type: text/javascript

/*.css
  Content-Type: text/css

/*.module.js
  Content-Type: text/javascript

/*.tsx
  Content-Type: text/javascript

/*.ts
  Content-Type: text/javascript
`,
    'utf8'
  );
}

console.log('✅ Netlify deployment files created successfully'); 