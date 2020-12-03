#!/bin/sh

echo "Hello from Cezerin3..."
echo "Checking for nodejs and yarnpkg"
node -v
yarn -v
echo "................................"

echo "Installing Packages"
yarn
echo "................................"

echo "Adding NX Cli"
yarn global add nx
echo "................................"

echo "Building Cezerin3"
# nx run admin:build --baseHref=/admin --deployUrl=/admin/ --extractCss --extractLicenses --no-namedChunks --optimization --outputHashing=all --no-sourceMap --no-vendorChunk
nx run admin:build
nx run store:build
echo "................................"

echo "Starting store..."
echo "You can see the the store at http://localhost:3000"
echo "Thankyou for using Cezerin3"
echo "And please consider monetery support if you gained value from this"
echo "because it takes years of precious human time to make this..."
echo "If you have any quetions, post them at issues section or,"
echo "cezerin3@yahoo.com"
yarn sstart
