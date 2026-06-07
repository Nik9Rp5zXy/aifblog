const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function runDeploy() {
  try {
    console.log('Sunucuya baglaniliyor...');
    await ssh.connect({
      host: '193.164.4.57',
      username: 'akif',
      password: 'L0calappdata'
    });
    
    console.log('SSH baglantisi basarili. Deployment komutlari calistiriliyor...');
    
    const commands = `
      export REMOTE_DIR="/var/www/aifblog.m4u.pro"
      export GITHUB_REPO="https://github.com/Nik9Rp5zXy/aifblog.git"
      export GITHUB_BRANCH="main"
      export APP_NAME="premium-portfolio"
      export DOMAIN="aifblog.m4u.pro"
      export SUDO_PASS="L0calappdata"

      # Rastgele boş bir port bul (Python ile)
      FREE_PORT=$(python3 -c 'import socket; s=socket.socket(); s.bind(("", 0)); print(s.getsockname()[1]); s.close()')
      echo "Bulunan bos port: $FREE_PORT"

      if [ ! -d "$REMOTE_DIR/.git" ]; then
        echo $SUDO_PASS | sudo -S mkdir -p $REMOTE_DIR
        echo $SUDO_PASS | sudo -S chown -R $USER:$USER $REMOTE_DIR
        git clone $GITHUB_REPO $REMOTE_DIR
      fi

      cd $REMOTE_DIR
      git fetch origin
      git reset --hard origin/$GITHUB_BRANCH
      git pull origin $GITHUB_BRANCH

      echo "Npm paketleri kuruluyor..."
      npm install

      echo "Veritabani (Prisma) guncelleniyor..."
      npx prisma generate
      npx prisma db push

      echo "Next.js uygulamasi build ediliyor..."
      rm -rf .next
      npm run build

      echo "PM2 sureci yeniden baslatiliyor (Port $FREE_PORT)..."
      if pm2 list | grep -q "$APP_NAME"; then
        pm2 delete $APP_NAME
      fi
      
      # PM2'ye doğrudan Next.js binary'si ile portu belirterek başlat
      pm2 start node_modules/next/dist/bin/next --name "$APP_NAME" -- start -p $FREE_PORT
      pm2 save

      echo "Nginx konfigrasyonu yapiliyor..."
      echo $SUDO_PASS | sudo -S bash -c "cat > /etc/nginx/sites-available/$DOMAIN << 'EOF'
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$FREE_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_cache_bypass \\$http_upgrade;
    }
}
EOF"

      echo $SUDO_PASS | sudo -S ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
      echo $SUDO_PASS | sudo -S nginx -t && echo $SUDO_PASS | sudo -S systemctl reload nginx
      
      echo "Certbot (SSL) Kurulumu Yapiliyor..."
      echo $SUDO_PASS | sudo -S certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN --redirect
      
      echo "Deploy islemi basariyla tamamlandi! Uygulama $FREE_PORT portunda calisiyor."
    `;
    
    const result = await ssh.execCommand(commands);
    console.log('STDOUT:\n' + result.stdout);
    if(result.stderr) console.error('STDERR:\n' + result.stderr);
    
    ssh.dispose();
  } catch (err) {
    console.error('Baglanti veya deployment hatasi:', err);
    process.exit(1);
  }
}

runDeploy();
