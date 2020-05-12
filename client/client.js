const go = async (username) => {
  let current;
  const repos = await getRepos(username);
  for (let i = 0; i < repos.length; i++) {
    current = await getRepoInfo(repos[i], username);
    buildCard(current);
  }
};

const getRepos = async (username) => {
  const repos = await axios.get(`/api/repos?user=${username}`);
  return repos.data.allRepos;
};

const getRepoInfo = async (repo, username) => {
  let languages = [];
  const { fullname } = repo;
  const { name } = repo;
  const { link } = repo;
  const lang = await axios.get(`/api/repo-info?repo=${fullname}`);
  const contributions = await axios.get(
    `/api/repo-contribution?repo=${fullname}&user=${username}`
  );
  for (let key in lang.data.allLanguages) {
    languages.push({ name: key, size: lang.data.allLanguages[key] });
  }
  return {
    name,
    languages,
    contributions: contributions.data.allContributions,
    link,
  };
};
