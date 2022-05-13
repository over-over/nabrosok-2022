import { fstat, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const IMAGES_FOLDER = join(__dirname, '../../public/images');

const resizeImages = async () => {
  const images = [];
  readdirSync(IMAGES_FOLDER + '/artists').forEach(item => {
    images.push(join(IMAGES_FOLDER, '/artists', item));
  });
  readdirSync(IMAGES_FOLDER + '/works').forEach(item => {
    images.push(join(IMAGES_FOLDER, '/works', item));
  });

  for (const path of images) {
    const sharpResult = await sharp(path)
      .resize(512, 512, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toBuffer();
    writeFileSync(path, sharpResult);
  }
};

resizeImages();
