#!/bin/zsh

# USER SPECIFIC VARIABLES:

ROOT_PATH="Users/Sofia/Programming/Capstone/capstone-project/cli"
NODE="node18"
PLATFORM="macos"
ARCH="x64"
UPDATED_CRONTAB="/tmp/updated_crontab"

# BUILD SCRIPT

# Package project
cd $ROOT_PATH
npm run convert
pkg --target $NODE-$PLATFORM-$ARCH ./lib/index.js

# Transfer executable to bin
# sudo rm /usr/local/bin/sundial
sudo mv ./index /usr/local/bin/sundial

# Grant read permissions
chmod +x /usr/local/bin/sundial

# cd ./http_server
# node server.js

# Kill old server processes if they exist
# Can also run this when done to terminate server process
pkill -f "node server.js"

# Http server
cd ./http_server
npm install

# Start the server as forgeround process for debugging
node server.js

# COMMENT OUT THIS SECTION (LINES 25-30) IF YOU'D LIKE TO AVOID MODIFYING CRONTAB
# Append crontab with example cronjobs + output to log
# crontab -l > $UPDATED_CRONTAB
cat $ROOT_PATH/samples/cronjobs.txt >> $UPDATED_CRONTAB
crontab $UPDATED_CRONTAB
rm $UPDATED_CRONTAB

# Cleanup
rm -r $ROOT_PATH/lib