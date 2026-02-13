import path from 'path';
import z from 'zod';

export const CoverFileTypeTransformSchema = z.string().transform((fileExt) => {
  const parsed = path.parse(fileExt);

  switch (parsed.ext) {
    case '.webp':
      return 'webp';
    case '.png':
      return 'png';
    case 'jpg':
    case 'jpeg':
      return 'jpeg';
    default:
      return 'png';
  }
});
