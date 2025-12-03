const fs = require('fs').promises;
const path = require('path');

async function build() {
    try {
        const srcDir = path.join(__dirname, 'src');
        const distDir = path.join(__dirname, 'dist');

        // Ensure dist directory exists
        await fs.mkdir(distDir, { recursive: true });

        // Read files
        const html = await fs.readFile(path.join(srcDir, 'index.html'), 'utf-8');
        const css = await fs.readFile(path.join(srcDir, 'style.css'), 'utf-8');
        const js = await fs.readFile(path.join(srcDir, 'script.js'), 'utf-8');
        const talks = await fs.readFile(path.join(srcDir, 'talks.json'), 'utf-8');

        // Inject CSS, JS, and data
        let finalHtml = html.replace('</head>', `<style>${css}</style></head>`);
        finalHtml = finalHtml.replace('</body>', `<script>${js.replace('__TALKS_DATA__', talks)}</script></body>`);

        // Write final file
        await fs.writeFile(path.join(distDir, 'index.html'), finalHtml);
        console.log('Website built successfully to dist/index.html');
    } catch (error) {
        console.error('Error building website:', error);
    }
}

build();
