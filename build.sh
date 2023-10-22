#!/bin/zsh

# USER SPECIFIC VARIABLES:

ROOT_PATH="/Users/davidperez/Documents/Capstone/Sundial/cli"
NODE="node18"
PLATFORM="macos"
ARCH="arm64"
NEW_CRONTAB="/tmp/new_crontab"

# BUILD SCRIPT

# Package project
cd $ROOT_PATH
npm run convert
pkg --target $NODE-$PLATFORM-$ARCH ./lib/index.js

# Transfer executable to bin
sudo rm /usr/local/bin/sundial
sudo mv ./index /usr/local/bin/sundial

# Grant read permissions
chmod +x /usr/local/bin/sundial

# Modify crontab with example cronjob + output
echo "PATH=/usr/local/bin:/usr/bin:/bin" > $NEW_CRONTAB
echo "* * * * * /usr/local/bin/sundial exec abcde echo hello >> $ROOT_PATH/cron.log" >> $NEW_CRONTAB

crontab $NEW_CRONTAB

# Cleanup
rm -r $NEW_CRONTAB $ROOT_PATH/lib