const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const localtunnel = require('localtunnel');

(async () => {
    console.log('\n🚀 Starting your Node.js backend server...');
    const serverProcess = require('child_process').spawn('node', ['server.js'], {
        cwd: __dirname,
        stdio: 'inherit'
    });

    console.log('\n⏳ Establishing secure internet connection...');

    const scriptPath = path.join(__dirname, '..', 'script.js');
    const rootDir = path.join(__dirname, '..');
    const publicUrl = 'https://khush-portfolio-api-777.loca.lt';

    console.log(`\n✅ Locking public API to fixed URL: ${publicUrl}`);

    // Update script.js just in case 
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    scriptContent = scriptContent.replace(
        /(const\s+API_URL\s*=\s*)['"`].*?['"`]\s*;/g, 
        `$1'${publicUrl}/contact';`
    );
    fs.writeFileSync(scriptPath, scriptContent);
    
    try {
        console.log(`⏳ Synchronizing changes to GitHub Pages...`);
        execSync('git add script.js', { cwd: rootDir });
        execSync('git commit -m "chore: permanently set robust localtunnel API URL"', { cwd: rootDir });
        execSync('git push', { cwd: rootDir });
        console.log(`✅ GitHub Pages updated successfully! (Takes ~2 minutes to go live on the site)`);
    } catch (gitErr) {
        console.log(`⚠️ Git sync skipped (no changes detected). `);
    }

    console.log('\n======================================================================');
    console.log('🚀 YOUR BACKEND IS NOW ONLINE AND CONNECTED TO GITHUB!');
    console.log('⚠️ IMPORTANT: You MUST leave this window open for the form to work.');
    console.log('======================================================================\n');

    // Run localtunnel as a completely isolated secondary shell process to prevent promise crashes
    function spawnTunnel() {
        console.log('🔄 Spawning LocalTunnel proxy...');
        const ltBin = path.join(__dirname, 'node_modules', 'localtunnel', 'bin', 'lt.js');
        const tunnelProcess = require('child_process').spawn('node', [ltBin, '--port', '5000', '--subdomain', 'khush-portfolio-api-777'], {
            cwd: __dirname,
            stdio: 'inherit'
        });

        tunnelProcess.on('close', (code) => {
            console.log(`\n❌ LocalTunnel disconnected (code ${code}). Automatically restarting in 3 seconds...`);
            setTimeout(spawnTunnel, 3000);
        });
        
        tunnelProcess.on('error', (err) => {
            console.error('\n❌ LocalTunnel background process error:', err.message);
        });
    }

    spawnTunnel();
})();

process.on('uncaughtException', (err) => {
    console.error('\n⚠️ Ignored background exception:', err.message);
});
process.on('unhandledRejection', (err) => {
    console.error('\n⚠️ Ignored background network error:', err.message);
});
