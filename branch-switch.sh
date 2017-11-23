echo "Running branch switch task"
echo "Removing Angular dependencies..."
rm -rf node_modules
echo "Removing functions dependencies..."
cd server
rm -rf node_modules
echo "Installing functions dependencies..."
npm i
cd ..
echo "Installing Angular dependencies..."
npm i
echo "Done!"
