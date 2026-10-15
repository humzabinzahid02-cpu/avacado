const sharp = require('sharp');

async function main() {
  const meta = await sharp('public/mockup_reference.jpg').metadata();
  console.log('Mockup dimensions:', meta.width, 'x', meta.height);

  const logoMeta = await sharp('public/logo.png').metadata();
  console.log('Logo dimensions:', logoMeta.width, 'x', logoMeta.height);
}

main();
