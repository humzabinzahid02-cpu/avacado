const sharp = require('sharp');

async function main() {
  // Extract drinks from the right side of the hero banner
  await sharp('public/mockup_reference.jpg')
    .extract({ left: 390, top: 46, width: 634, height: 232 })
    .toFile('public/assets/hero-drinks-showcase.png');
  console.log('Saved hero-drinks-showcase.png');

  // Also extract the entire hero banner so we can use it as a full-bleed crisp hero image
  await sharp('public/mockup_reference.jpg')
    .extract({ left: 0, top: 46, width: 1024, height: 232 })
    .toFile('public/assets/hero-mockup-full.jpg');
  console.log('Saved hero-mockup-full.jpg');
}

main();
