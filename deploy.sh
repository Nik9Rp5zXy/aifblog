#!/bin/bash
# Ultra-Premium Portfolio Deployment Script

SSH_USER="akif"
SSH_IP="193.164.4.57"
SSH_PASS="L0calappdata"
DOMAIN="aifblog.m4u.pro"
APP_NAME="premium-portfolio"
GITHUB_REPO="https://github.com/Nik9Rp5zXy/aifblog.git"
GITHUB_BRANCH="main"
REMOTE_DIR="/var/www/aifblog.m4u.pro"

echo "🚀 Starting Deployment Process..."

# 1. Local Git Operations
echo "📦 Committing and pushing local changes..."
git add .
git commit -m "Deploy update: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin $GITHUB_BRANCH

# 2. SSH Commands
echo "🌐 Connecting to server via SSH..."

SSH_CMD="
echo '🔄 Pulling latest changes from GitHub...'
if [ ! -d \"$REMOTE_DIR/.git\" ]; then
  sudo mkdir -p $REMOTE_DIR
  sudo chown -R \$USER:\$USER $REMOTE_DIR
  git clone $GITHUB_REPO $REMOTE_DIR
fi

cd $REMOTE_DIR
git fetch origin
git reset --hard origin/$GITHUB_BRANCH
git pull origin $GITHUB_BRANCH

echo '📦 Installing dependencies...'
npm install

echo '🗄️ Updating Database (Prisma)...'
npx prisma generate
npx prisma db push

echo '🏗️ Building Next.js application...'
npm run build

echo '⚙️ Managing PM2 Process...'
if pm2 list | grep -q \"$APP_NAME\"; then
  pm2 restart $APP_NAME
else
  pm2 start npm --name \"$APP_NAME\" -- run start
fi
pm2 save

echo '🛠️ Configuring Nginx...'
NGINX_CONF=\"/etc/nginx/sites-available/$DOMAIN\"

sudo bash -c \"cat > \$NGINX_CONF << 'EOF'
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
}
EOF\"

sudo ln -sf \$NGINX_CONF /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

echo '✅ Deployment Completed Successfully!'
"

# Execute SSH using sshpass
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_IP "$SSH_CMD"
