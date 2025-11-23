#!/bin/zsh

# Usage: ./deploy-to-local-server.sh
# This script builds the Next.js app and deploys the output to a remote server via SSH.

# Backup current .env.local
cp .env.local .env.local.backup

# Use deploy env
cp .env.deploy.local .env.local


# Set the local server IP (edit as needed)
LOCAL_SERVER_IP=${LOCAL_SERVER_IP:-"192.168.1.100"}
REMOTE_USER=${REMOTE_USER:-"youruser"}
REMOTE_PATH=${REMOTE_PATH:-"/var/www/dinheiro-web"}

# Build the Next.js app
pnpm build

if [ $? -ne 0 ]; then
  echo "Build failed. Aborting deployment."
  exit 1
fi

# Deploy the 'out' directory to the remote server
rsync -avz --delete ./out/ "$REMOTE_USER@$LOCAL_SERVER_IP:$REMOTE_PATH"

if [ $? -eq 0 ]; then
  echo "Deployment successful!"
  mv .env.local.backup .env.local
else
  echo "Deployment failed."
  mv .env.local.backup .env.local
  exit 1
fi

# Restore original .env.local
mv .env.local.backup .env.local
