const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const QUERY = `{
  user(login: "shramkoweb") {
    followers {
      totalCount
    }
    repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
      nodes {
        stargazerCount
      }
    }
  }
}`;

export async function fetchGitHubStats() {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const json = await response.json();

  if (json.errors || !json.data) {
    throw new Error(
      json.errors?.[0]?.message ?? 'GitHub GraphQL request failed',
    );
  }

  const stars = json.data.user.repositories.nodes.reduce(
    (acc: number, repo: { stargazerCount: number }) =>
      acc + repo.stargazerCount,
    0,
  );

  return {
    stars,
    followers: json.data.user.followers.totalCount as number,
  };
}
