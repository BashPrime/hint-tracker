import AdmZip from 'adm-zip';
import path from 'path';
import {
  BasicPack,
  BasicPackSchema,
  PackTrackerJsonSchema,
} from '../shared/types/pack.types.js';
import { USER_PACKS_PATH } from './constants.js';
import { getCover } from './covers.js';
import { readDir } from './io.js';
import { buildPackDetails } from './pack-builder.js';

let packs: BasicPack[];

export function getAllPacksInDir(
  dir: string = USER_PACKS_PATH
): BasicPack[] {
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

export function getPackTrackerJson(filePath: string): BasicPack | null {
  const zip = new AdmZip(filePath);
  const parsedJson = PackTrackerJsonSchema.safeParse(
    JSON.parse(zip.readAsText('tracker.json'))
  );

  if (!parsedJson.success) {
    return null;
  }

  return BasicPackSchema.parse({
    ...parsedJson.data,
    path: filePath,
    cover: parsedJson.data.cover ? getCover(zip, parsedJson.data.cover) : null,
  })
}

export function getPackDetails(packId: string) {
  if (!packs) {
    getAllPacksInDir();
  }

  const match = packs.find((p) => p.id === packId);

  if (!match) {
    return null;
  }

  return buildPackDetails(match);
}