#!/bin/bash
export PM2_HOME=/home/ubuntu/.pm2

echo "*** RESTARTING PM2 ***"
cd /home/ubuntu/ || exit
/home/ubuntu/.nvm/versions/node/v12.13.1/bin/pm2 kill
/home/ubuntu/.nvm/versions/node/v12.13.1/bin/pm2 start ecosystem.config.js -i max
