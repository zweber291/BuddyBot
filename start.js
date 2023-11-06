const child_process = require('child_process');
const child = child_process.spawn('node index.js', [], { shell: true});
const { ntfy_url } = require('./config.json');
const fetch = require('node-fetch');

child.on('exit', async (code) => {
    fetch(new URL(ntfy_url), {
        method: 'POST',
        body: `Buddybot offline!`,
        headers: {
            'Title': `Code: ${code}`,
            'Priority': 'urgent'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Child process exited with code', code);
        process.exit(1);
    })
    .catch(error => {
        console.error('Error sending notification:', error);
        process.exit(1);
    });
  });