#!/bin/zsh

# USER SPECIFIC VARIABLES:

ROOT_PATH=""
NODE="node18"
PLATFORM="macos"
ARCH="arm64"

# BUILD SCRIPT

# Package project
cd $ROOT_PATH
npm install
npm run convert
pkg --target $NODE-$PLATFORM-$ARCH ./lib/index.js

# Transfer executable to bin
sudo rm /usr/local/bin/sundial
sudo mv ./index /usr/local/bin/sundial
chmod +x /usr/local/bin/sundial

# Cleanup
rm -r $ROOT_PATH/lib
