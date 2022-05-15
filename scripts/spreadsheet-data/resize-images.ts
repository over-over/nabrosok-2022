import { readdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const IMAGES_FOLDER = join(__dirname, '../../public/images-max');

const resizeImages = async () => {
  try {
    const images: string[] = [];
    readdirSync(IMAGES_FOLDER + '/artists').forEach(item => {
      if (item.includes('.jpg') || item.includes('.peg')) {
        images.push(join(IMAGES_FOLDER, '/artists', item));
      }
    });
    readdirSync(IMAGES_FOLDER + '/works').forEach(item => {
      if (item.includes('.jpg') || item.includes('.peg')) {
        images.push(join(IMAGES_FOLDER, '/works', item));
      }
    });
    for (const path of images) {
      const newPath = path.replace('images-max', 'images');
      // if (!existsSync(newPath)) {
      const sharpResult = await sharp(path)
        .resize(512, 512, { fit: 'cover' })
        .withMetadata()
        .jpeg({ quality: 85 })
        .toBuffer();
      writeFileSync(newPath, sharpResult);
      // }
    }
  } catch (e) {
    console.log(e);
  }
};

resizeImages();
