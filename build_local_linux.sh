#!/bin/zsh

# USER SPECIFIC VARIABLES:

ROOT_PATH="/home/david/cli"
NODE="node18"
PLATFORM="linux"
ARCH="x64"
UPDATED_CRONTAB="/tmp/updated_crontab"
# BUILD SCRIPT

# Package project
cd $ROOT_PATH
npm run convert
pkg --target $NODE-$PLATFORM-$ARCH ./lib/index.js

# Transfer executable to bin
sudo rm /usr/bin/sundial
sudo mv ./index /usr/bin/sundial
chmod +x /usr/bin/sundial

rm -r $ROOT_PATH/lib
