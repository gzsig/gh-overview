let GLOBAL_LANGUAGES = {};

const go = async (username) => {
  document.getElementById("portfolio").innerHTML = "";
  document.getElementById("repos").innerHTML = "";
  let currentRepo, currentUser, mainChart;
  GLOBAL_LANGUAGES = {};
  currentUser = await getUser(username);
  if (currentUser !== null) {
    buildPortfolio(currentUser);
    const repos = await getRepos(username);
    for (let i = 0; i < 10; i++) {
      //repos.length
      currentRepo = await getRepoInfo(repos[i], username);
      buildCard(currentRepo);
      if (i % 4 === 0 || i === 9) {
        mainChart = languagesOverview(GLOBAL_LANGUAGES, mainChart);
      }
    }
  } else {
    error();
  }
};

const getUser = async (username) => {
  try {
    const info = await axios.get(`/api/user-info?user=${username}`);
    return info.data;
  } catch (error) {
    return null;
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
  let { description } = repo;
  if (description === null) {
    description = "No description";
  }
  const lang = await axios.get(`/api/repo-info?repo=${fullname}`);
  const contributions = await axios.get(
    `/api/repo-contribution?repo=${fullname}&user=${username}`
  );
  for (let key in lang.data.allLanguages) {
    languages.push({ name: key, size: lang.data.allLanguages[key] });
    if (GLOBAL_LANGUAGES[key] === undefined) {
      GLOBAL_LANGUAGES[key] = parseInt(lang.data.allLanguages[key]);
    } else {
      GLOBAL_LANGUAGES[key] =
        GLOBAL_LANGUAGES[key] + parseInt(lang.data.allLanguages[key]);
    }
  }
  return {
    name,
    languages,
    contributions: contributions.data.allContributions,
    link,
    description,
  };
};
