const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function checkCerts() {
  try {
    await ssh.connect({
      host: '193.164.4.57',
      username: 'akif',
      password: 'L0calappdata'
    });
    
    const commands = `
      echo "L0calappdata" | sudo -S certbot certificates
    `;
    
    const result = await ssh.execCommand(commands);
    console.log('CERTS:\n', result.stdout);
    ssh.dispose();
  } catch (err) {
    console.error(err);
  }
}

checkCerts();
