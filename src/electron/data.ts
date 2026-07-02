import AdmZip from 'adm-zip';
import path from 'path';
import { CoverSchema } from '../shared/types/cover.types.js';
import {
  BasicPackData,
  PackTrackerJsonSchema,
} from '../shared/types/pack.type.js';
import { USER_PACKS_PATH } from './constants.js';
import { readDir } from './io.js';
import { CoverFileTypeTransformSchema } from './types/transform.types.js';

export function getAllPacksInDir(
  dir: string = USER_PACKS_PATH
): BasicPackData[] {
  const files = readDir(dir);

  if (!files) {
    return [];
  }

  return files
    .filter((file) => {
      return path.extname(file).toLowerCase() === '.zip';
    })
    .map((file) => getPackTrackerJson(dir, file))
    .filter((pack) => pack !== null);
}

export function getPackTrackerJson(
  dir: string,
  fileName: string
): BasicPackData | null {
  const zip = new AdmZip(path.join(dir, fileName));
  const parsed = PackTrackerJsonSchema.safeParse(
    JSON.parse(zip.readAsText('tracker.json'))
  );

  if (!parsed.success) {
    return null;
  }

  return {
    fileName,
    data: parsed.data,
    cover: parsed.data.cover ? getCover(zip, parsed.data.cover) : null,
  } satisfies BasicPackData;
}

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

export function getPackDetails(packId: string) {}
