import type { Endpoints } from '@octokit/types';
import z from 'zod';

const httpsRegex = /^https$/;

export const SemVerSchema = z
  .string()
  .regex(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  );
export type SemVer = z.infer<typeof SemVerSchema>;

export type ReleaseAsset =
  Endpoints['GET /repos/{owner}/{repo}/releases/latest']['response']['data']['assets'][number];

export const DownloadAssetSchema = z.object({
  icon: z.enum(['windows', 'apple', 'linux']),
  name: z.string(),
  url: z.url({ protocol: httpsRegex }),
});
export type DownloadAsset = z.infer<typeof DownloadAssetSchema>;

export const PackSchema = z.object({
  id: z.string(),
  name: z.string(),
  game: z.string(),
  version: SemVerSchema,
  author: z.string(),
  downloadUrl: z.url({ protocol: httpsRegex }),
});
export type Pack = z.infer<typeof PackSchema>;
