import { throttling } from '@octokit/plugin-throttling';
import { Octokit } from 'octokit';

const ThrottledOctokit = Octokit.plugin(throttling);
const octokit = new ThrottledOctokit({
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (retryCount < 1) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds`);
        return true;
      }
    },
    onSecondaryRateLimit: (_, options, octokit) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );
    },
  },
});

export async function fetchLatestRelease() {
  try {
    const res = await octokit.rest.repos.getLatestRelease({
      owner: 'BashPrime',
      repo: 'hint-tracker',
    });

    return res;
  } catch (err) {
    throw new Error('fetchLatestRelease(): github api response was not ok');
  }
}
