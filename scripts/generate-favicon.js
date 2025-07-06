// This script can be used to generate favicon.ico from the SVG file
// You'll need to install these packages:
// npm install sharp svg2img

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const svg2img = require('svg2img');

const publicDir = path.join(__dirname, '../public');
const svgPath = path.join(publicDir, 'favicon.svg');
const pngPath = path.join(publicDir, 'favicon.png');
const icoPath = path.join(publicDir, 'favicon.ico');

// Read the SVG file
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Convert SVG to PNG
svg2img(svgContent, { width: 256, height: 256 }, (error, buffer) => {
  if (error) {
    console.error('Error converting SVG to PNG:', error);
    return;
  }

  // Save PNG file
  fs.writeFileSync(pngPath, buffer);
  console.log('PNG favicon created successfully');

  // Convert PNG to ICO (multiple sizes)
  Promise.all([16, 32, 48, 64, 128, 256].map(size => {
    return sharp(buffer)
      .resize(size, size)
      .toBuffer();
  }))
    .then(buffers => {
      // Combine all sizes into one ICO file
      // Note: This is a simplified approach. For production, use a dedicated ICO generator
      fs.writeFileSync(icoPath, buffers[1]); // Using 32x32 as favicon.ico
      console.log('ICO favicon created successfully');
    })
    .catch(err => {
      console.error('Error creating ICO file:', err);
    });
});

console.log('To run this script:');
console.log('1. npm install sharp svg2img');
console.log('2. node scripts/generate-favicon.js'); 