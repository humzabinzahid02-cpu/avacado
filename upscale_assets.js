const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processAssets() {
  const src = 'public/mockup_reference.jpg';
  const outDir = 'public/assets';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. High-Resolution Hero Banner
  // The full panoramic hero section from mockup
  await sharp(src)
    .extract({ left: 0, top: 46, width: 1024, height: 232 })
    .resize(2048, null, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.0 })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-panoramic-2x.jpg'));
  console.log('Processed hero-panoramic-2x.jpg');

  // The drinks showcase on the right side of the hero (width: 630, height: 232)
  await sharp(src)
    .extract({ left: 395, top: 46, width: 629, height: 232 })
    .resize(1400, null, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.2 })
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'hero-drinks-hd.png'));
  console.log('Processed hero-drinks-hd.png');

  // 2. High-Resolution Logo from Header
  // In mockup: top right: left: 840, top: 4, width: 105, height: 42
  await sharp(src)
    .extract({ left: 835, top: 4, width: 110, height: 42 })
    .resize(440, null, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.5 })
    .png()
    .toFile(path.join(outDir, 'logo-hd.png'));
  console.log('Processed logo-hd.png');

  // Also copy to public/logo.png
  await sharp(path.join(outDir, 'logo-hd.png'))
    .toFile('public/logo.png');

  // 3. High-Resolution Categories (9 categories)
  const categories = [
    { name: 'cat-special', left: 862, top: 304, width: 70, height: 68 },
    { name: 'cat-juices', left: 766, top: 304, width: 70, height: 68 },
    { name: 'cat-avocado', left: 670, top: 304, width: 70, height: 68 },
    { name: 'cat-mixes', left: 574, top: 304, width: 70, height: 68 },
    { name: 'cat-milkshake', left: 478, top: 304, width: 70, height: 68 },
    { name: 'cat-smoothie', left: 384, top: 304, width: 70, height: 68 },
    { name: 'cat-salad', left: 284, top: 304, width: 72, height: 68 },
    { name: 'cat-sweets', left: 182, top: 304, width: 70, height: 68 },
    { name: 'cat-icecream', left: 81, top: 304, width: 70, height: 68 },
  ];

  for (const cat of categories) {
    await sharp(src)
      .extract({ left: cat.left, top: cat.top, width: cat.width, height: cat.height })
      .resize(280, 280, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
      .sharpen({ sigma: 1.2 })
      .jpeg({ quality: 95 })
      .toFile(path.join(outDir, `${cat.name}.jpg`));
  }
  console.log('Processed all 9 categories in HD');

  // 4. High-Resolution 6 Featured Products
  const products = [
    { name: 'prod-avocado', left: 90, top: 432, width: 105, height: 80 },
    { name: 'prod-mango', left: 238, top: 432, width: 105, height: 80 },
    { name: 'prod-choc-shake', left: 386, top: 432, width: 105, height: 80 },
    { name: 'prod-icecream', left: 534, top: 432, width: 105, height: 80 },
    { name: 'prod-salad', left: 676, top: 432, width: 108, height: 80 },
    { name: 'prod-strawberry', left: 825, top: 432, width: 105, height: 80 },
  ];

  for (const prod of products) {
    await sharp(src)
      .extract({ left: prod.left, top: prod.top, width: prod.width, height: prod.height })
      .resize(360, 300, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
      .sharpen({ sigma: 1.2 })
      .jpeg({ quality: 95 })
      .toFile(path.join(outDir, `${prod.name}.jpg`));
  }
  console.log('Processed all 6 featured products in HD');
}

processAssets().catch(console.error);
