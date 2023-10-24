#!/bin/zsh

# USER SPECIFIC VARIABLES:

ROOT_PATH="/Users/davidperez/Documents/Capstone/Sundial/cli"
NODE="node18"
PLATFORM="macos"
ARCH="arm64"
UPDATED_CRONTAB="/tmp/updated_crontab"

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
# crontab -l > $UPDATED_CRONTAB
# echo "* * * * * /usr/local/bin/sundial run abcde echo hello >> $ROOT_PATH/cron.log" >> $UPDATED_CRONTAB

# crontab $UPDATED_CRONTAB
# rm -r $UPDATED_CRONTAB

# Cleanup
rm -r $ROOT_PATH/lib