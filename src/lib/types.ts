import type { Endpoints } from '@octokit/types';
import z from 'zod';

export type ReleaseAsset =
  Endpoints['GET /repos/{owner}/{repo}/releases/latest']['response']['data']['assets'][number];

export const DownloadAssetSchema = z.object({
  icon: z.enum(['windows', 'apple', 'linux']),
  name: z.string(),
  url: z.url(),
});
export type DownloadAsset = z.infer<typeof DownloadAssetSchema>;
