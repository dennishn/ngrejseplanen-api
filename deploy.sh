echo "Deploying..."
firebase use default
firebase deploy --only functions,hosting
echo "Done!"
