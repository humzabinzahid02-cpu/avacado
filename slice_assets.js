const sharp = require('sharp');
const fs = require('fs');

async function sliceAssets() {
  const dir = 'public/assets';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const src = 'public/mockup_reference.jpg';

  // 1. Full Hero Background / Showcase
  // Mockup: 1024 x 682
  // Hero is approximately Y: 46, Height: 230, Width: 1024
  await sharp(src)
    .extract({ left: 0, top: 46, width: 1024, height: 232 })
    .toFile(`${dir}/hero-full-banner.jpg`);
  console.log('Saved hero-full-banner.jpg');

  // Hero drinks composition only (from left: 350 to 950, top: 46, height: 232)
  await sharp(src)
    .extract({ left: 420, top: 46, width: 550, height: 232 })
    .toFile(`${dir}/hero-drinks.png`);
  console.log('Saved hero-drinks.png');

  // 2. Categories (Y: ~ 305 to 370)
  // There are 9 categories across width 1024:
  // Card 1 (far right in RTL): Special drinks ~ left: 885, width: 65, top: 308, height: 60
  // Card 2: Fresh juices ~ left: 775, width: 75, top: 308, height: 60
  // Card 3: Avocado drinks ~ left: 672, width: 70, top: 308, height: 60
  // Card 4: Mixes ~ left: 580, width: 68, top: 308, height: 60
  // Card 5: Milkshake ~ left: 485, width: 68, top: 308, height: 60
  // Card 6: Smoothie ~ left: 390, width: 68, top: 308, height: 60
  // Card 7: Fruit Salad ~ left: 285, width: 72, top: 308, height: 60
  // Card 8: Sweets ~ left: 185, width: 68, top: 308, height: 60
  // Card 9: Ice cream ~ left: 85, width: 68, top: 308, height: 60

  const catCrops = [
    { name: 'cat-special', left: 865, top: 306, width: 65, height: 65 },
    { name: 'cat-juices', left: 768, top: 306, width: 65, height: 65 },
    { name: 'cat-avocado', left: 672, top: 306, width: 65, height: 65 },
    { name: 'cat-mixes', left: 576, top: 306, width: 65, height: 65 },
    { name: 'cat-milkshake', left: 480, top: 306, width: 65, height: 65 },
    { name: 'cat-smoothie', left: 386, top: 306, width: 65, height: 65 },
    { name: 'cat-salad', left: 286, top: 306, width: 68, height: 65 },
    { name: 'cat-sweets', left: 184, top: 306, width: 65, height: 65 },
    { name: 'cat-icecream', left: 83, top: 306, width: 65, height: 65 },
  ];

  for (const c of catCrops) {
    await sharp(src)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .toFile(`${dir}/${c.name}.jpg`);
  }
  console.log('Saved category images');

  // 3. Featured Products (Y: ~ 430 to 520)
  // 6 cards from left to right:
  // Card 1 (far right in RTL / Strawberry Smoothie): left: 825, top: 436, width: 110, height: 75
  // Card 2 (Fruit salad): left: 675, top: 436, width: 110, height: 75
  // Card 3 (Avocado ice cream): left: 528, top: 436, width: 110, height: 75
  // Card 4 (Chocolate milkshake): left: 380, top: 436, width: 110, height: 75
  // Card 5 (Mango smoothie): left: 230, top: 436, width: 110, height: 75
  // Card 6 (Avocado shake): left: 85, top: 436, width: 110, height: 75

  const prodCrops = [
    { name: 'prod-avocado', left: 95, top: 435, width: 95, height: 75 },
    { name: 'prod-mango', left: 242, top: 435, width: 95, height: 75 },
    { name: 'prod-choc-shake', left: 390, top: 435, width: 95, height: 75 },
    { name: 'prod-icecream', left: 538, top: 435, width: 95, height: 75 },
    { name: 'prod-salad', left: 680, top: 435, width: 98, height: 75 },
    { name: 'prod-strawberry', left: 830, top: 435, width: 95, height: 75 },
  ];

  for (const p of prodCrops) {
    await sharp(src)
      .extract({ left: p.left, top: p.top, width: p.width, height: p.height })
      .toFile(`${dir}/${p.name}.jpg`);
  }
  console.log('Saved product images');

  // 4. Promo Banner (Y: 565, height: 65, left: 65, width: 890)
  await sharp(src)
    .extract({ left: 65, top: 565, width: 894, height: 68 })
    .toFile(`${dir}/promo-banner-full.jpg`);
  console.log('Saved promo-banner-full.jpg');

  // 5. Clean Logo: crop the logo from the header of mockup_reference.jpg!
  // In mockup: top right: left: 840, top: 5, width: 95, height: 40
  await sharp(src)
    .extract({ left: 845, top: 5, width: 85, height: 38 })
    .toFile(`${dir}/logo-clean.png`);
  console.log('Saved logo-clean.png');
}

sliceAssets().catch(console.error);
