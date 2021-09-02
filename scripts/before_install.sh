#!/bin/bash

echo "*** STOPPING PM2 ***"
/home/ubuntu/.nvm/versions/node/v12.13.1/bin/pm2 kill

echo "*** RUNNING BACKUP ***"
/home/ubuntu/exportDB.sh

echo "*** REMOVING OLD DATA ***"
rm -rf -r /home/ubuntu/bluu-server