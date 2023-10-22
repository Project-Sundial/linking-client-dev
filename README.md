# cli
Command line interface for loading cron jobs and pinging the server 

FOR DEVELOPMENT:

Before you execute bash build.sh, you need to check the variables at the top of the bash file to make sure they match with your system. In particular, the root path will change from user to user.

The bash script build.sh allows you to:
1. compile an executable 
2. remove all the outdated files + extra files only needed for packaging
3. place the executable in the proper folder
4. give the executable executable permissions
5. add an example cronjob that logs its output to a new cron.log file

Whenever we want to recompile our program executable, we can with one command from the root folder: 
`sudo bash build.sh`