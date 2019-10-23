#!/bin/sh
cd ~/<Project directory>
echo "cd into "
echo $PWD
git pull
echo "repo updated"
yarn install
echo "installed"
pm2 restart index.js
