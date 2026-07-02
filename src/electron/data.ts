import AdmZip from 'adm-zip';
import path from 'path';
import { CoverSchema } from '../shared/types/cover.types.js';
import {
  BasicPackData,
  PackTrackerJsonSchema,
} from '../shared/types/pack.type.js';
import { USER_PACKS_PATH } from './constants.js';
import { readDir } from './io.js';
import { buildPackDetails } from './pack-builder.js';
import { CoverFileTypeTransformSchema } from './types/transform.types.js';

let packs: BasicPackData[];

export function getAllPacksInDir(
  dir: string = USER_PACKS_PATH
): BasicPackData[] {
  const files = readDir(dir);

  if (!files) {
    return [];
  }

  packs = files
    .filter((file) => {
      return path.extname(file).toLowerCase() === '.zip';
    })
    .map((file) => getPackTrackerJson(path.join(dir, file)))
    .filter((pack) => pack !== null);

  return packs;
}

export function getPackTrackerJson(filePath: string): BasicPackData | null {
  const zip = new AdmZip(filePath);
  const parsed = PackTrackerJsonSchema.safeParse(
    JSON.parse(zip.readAsText('tracker.json'))
  );

  if (!parsed.success) {
    return null;
  }

  return {
    path: filePath,
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

export function getPackDetails(packId: string) {
  if (!packs) {
    getAllPacksInDir();
  }

  const match = packs.find((p) => p.data.id === packId);

  if (!match) {
    return null;
  }

  return buildPackDetails(match);
}
