echo "Running build task"
echo "Building Angular Client..."
node_modules/.bin/ng build --prod --build-optimizer --stats-json
echo "Building Angular Server..."
node_modules/.bin/ng build --prod --build-optimizer --app 1 --output-hashing none --delete-output-path false
echo "Building Firebase functions"
cd server
npm run build
cd ..
echo "Copying index.html to functions directory"
mv public/index.html functions/
echo "Moving server/package.json to functions directory"
cp server/package.json functions/
echo "Installing functions dependencies"
cd functions
npm install
cd ..
echo "Done!"
