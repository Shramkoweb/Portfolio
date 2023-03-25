import { NextApiRequest, NextApiResponse } from 'next';

const GH_HEADERS = new Headers({
  Authorization: `Bauer ${process.env.GITHUB_TOKEN}`,
});

const starReducer = (acc: number, repo: { stargazers_count: number }) => {
  const result = acc + repo.stargazers_count;

  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const [userResponse, repositoriesResponse] = await Promise.all([
      fetch('https://api.github.com/users/shramkoweb', {
        headers: GH_HEADERS,
      }),
      fetch('https://api.github.com/users/shramkoweb/repos?per_page=100', {
        headers: GH_HEADERS,
      }),
    ]);
    const [user, repos] = await Promise.all([
      userResponse.json(),
      repositoriesResponse.json(),
    ]);

    const mineRepos = repos.filter((repo: { fork: boolean }) => !repo.fork);
    const stars = mineRepos.reduce(starReducer, 0);

    // With edge error we have error
    // https://github.com/getsentry/sentry-javascript/issues/5667
    return res.status(200).json({
      stars,
      followers: user.followers,
    });
  } catch (err) {
    return res.status(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
}
