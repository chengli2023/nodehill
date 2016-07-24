pm2 stop all
pm2 delete all
pm2 start ./bin/www -i 4 -f