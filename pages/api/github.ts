const GH_HEADERS = new Headers({
  Authorization: `Bauer ${process.env.GITHUB_TOKEN}`,
});

const starReducer = (acc: number, repo: { stargazers_count: number; }) => {
  const result = acc + repo.stargazers_count;

  return result;
};

export default async function handler() {
  const [userResponse, repositoriesResponse] = await Promise.all([
    fetch('https://api.github.com/users/shramkoweb', {
      headers: GH_HEADERS,
    }),
    fetch('https://api.github.com/users/shramkoweb/repos?per_page=100', {
      headers: GH_HEADERS,
    })]);
  const [user, repos] = await Promise.all([userResponse.json(), repositoriesResponse.json()]);

  const mineRepos = repos.filter((repo: { fork: boolean }) => !repo.fork);
  const stars = mineRepos.reduce(starReducer, 0);

  return new Response(
    JSON.stringify({
      followers: user.followers,
      stars,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    },
  );
}

export const config = {
  runtime: 'experimental-edge',
};
