const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function checkNginx() {
  try {
    await ssh.connect({
      host: '193.164.4.57',
      username: 'akif',
      password: 'L0calappdata'
    });
    
    const commands = `
      echo "L0calappdata" | sudo -S nginx -T | grep -A 20 "server_name aifblog.m4u.pro"
    `;
    
    const result = await ssh.execCommand(commands);
    console.log('NGINX CONFIG:\n', result.stdout);
    ssh.dispose();
  } catch (err) {
    console.error(err);
  }
}

checkNginx();
