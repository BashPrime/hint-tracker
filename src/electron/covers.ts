import AdmZip from 'adm-zip';
import { CoverSchema } from '../shared/types/cover.types.js';
import { CoverFileTypeTransformSchema } from './types/transform.types.js';

export function getCover(zip: AdmZip, filePath: string) {
  const buffer = zip.readFile(filePath);

  if (!buffer) {
    return null;
  }

  return CoverSchema.parse({
    name: filePath,
    data: buffer.toString('base64'),
    type: CoverFileTypeTransformSchema.parse(filePath),
  });
}
