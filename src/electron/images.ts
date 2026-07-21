import AdmZip from 'adm-zip';
import { ImageSchema } from '../shared/types/image.types.js';
import { CoverFileTypeTransformSchema } from './types/transform.types.js';

export function getImage(zip: AdmZip, filePath: string) {
  const buffer = zip.readFile(filePath);

  if (!buffer) {
    return null;
  }

  return ImageSchema.parse({
    name: filePath,
    data: buffer.toString('base64'),
    type: CoverFileTypeTransformSchema.parse(filePath),
  });
}
