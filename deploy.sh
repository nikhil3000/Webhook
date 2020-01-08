#!/bin/sh
cd /home/bitnami/website
echo "cd into "
echo $PWD
git pull
echo "repo updated"
npm install
echo "installed"
forever stop server.js
forever start server.js
sudo /opt/bitnami/ctlscript.sh restart apache
