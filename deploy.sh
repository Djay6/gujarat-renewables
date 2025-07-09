#!/bin/bash

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

# Deploy to production
echo "Deploying to production..."
npm run deploy

echo "Deployment complete. Remember to verify your environment variables in production!"

