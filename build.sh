node_modules/.bin/ng build --prod --build-optimizer
node_modules/.bin/ng build --prod --build-optimizer --app 1 --output-hashing none --delete-output-path false
cd functions
npm install
npm run build
cd ..
mv public/index.html functions/
