const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function getLogs() {
  try {
    await ssh.connect({
      host: '193.164.4.57',
      username: 'akif',
      password: 'L0calappdata'
    });
    
    const commands = `
      pm2 logs premium-portfolio --lines 100 --nostream
    `;
    
    const result = await ssh.execCommand(commands);
    console.log('LOGS:\n', result.stdout);
    if(result.stderr) console.error('STDERR:\n', result.stderr);
    ssh.dispose();
  } catch (err) {
    console.error(err);
  }
}

getLogs();
