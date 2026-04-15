#!/bin/bash

# Load environment variables from .env.local file if it exists
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '#' | xargs)
fi

# Set default values if env variables are not set
SSH_USER=${SSH_USER:-"root"}
SSH_HOST=${SSH_HOST:-"your-server-host.com"}
SSH_PORT=${SSH_PORT:-22}
PROJECT_PATH=${PROJECT_PATH:-"/var/www/dinheiro-web"}
SSH_KEY=${SSH_KEY:-"$HOME/.ssh/id_rsa"}
DOCKER_CONTAINER=${DOCKER_CONTAINER:-"dinheiro-api-app"}

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[DEPLOY]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to run remote commands
run_remote() {
    local cmd=$1
    ssh -i "$SSH_KEY" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "source .bashrc && $cmd"
}

# Start deployment
print_status "Starting deployment..."
print_status "SSH Host: $SSH_HOST"
print_status "Project Path: $PROJECT_PATH"
print_status "Docker Container: $DOCKER_CONTAINER"
echo ""

# Step 1: Connect and go to project folder
print_status "Connecting to server and navigating to project folder..."
run_remote "cd $PROJECT_PATH || exit 1" || { print_error "Failed to navigate to project folder"; exit 1; }

# Step 2: Git pull
print_status "Running git pull..."
run_remote "cd $PROJECT_PATH && git pull" || { print_error "Git pull failed"; exit 1; }

# Step 3: Run docker compose up -d --build
print_status "Running docker compose up -d --build..."
run_remote "cd $PROJECT_PATH && docker compose up -d --build" || { print_error "Docker compose up -d --build failed"; exit 1; }

echo ""
print_status "${GREEN}Deployment completed successfully!${NC}"
