node_modules/.bin/ng build --prod --build-optimizer
node_modules/.bin/ng build --prod --build-optimizer --app 1 --output-hashing none --delete-output-path false
mv public/index.html functions/
