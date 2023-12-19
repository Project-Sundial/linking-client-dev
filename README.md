# Linking Client
Command line interface for loading cron jobs and pinging the server 

FOR DEVELOPMENT:

Before you execute bash build.sh, you need to check the variables at the top of the bash file to make sure they match with your system. In particular, the root path will change from user to user.

The bash script build.sh allows you to:
1. compile an executable 
2. remove all the outdated files + extra files only needed for packaging
3. place the executable in the proper folder
4. give the executable executable permissions
5. add some example cronjobs that log its output to a new cron.log file

Whenever we want to recompile our program executable and add new , we can with one command from the root folder: 
`bash build.sh`

DANGEROUS ACTION:
If we'd like to reset the crontab to an empty text file for testing, we can cd into the root directory and run:
`crontab ./samples/blank.txt`