const { getRepos } = require("../githubAPI/calls");

getAllRepos = async (username, allRepos, page) => {
  const repos = await getRepos(username, page);
  for (let i = 0; i < repos.data.length; i++) {
    allRepos.push({
      name: repos.data[i].name,
      description: repos.data[i].description,
      fullname: repos.data[i].full_name,
      link: repos.data[i].html_url,
    });
  }
  if (repos.data.length) {
    page = page + 1;
    await getAllRepos(username, allRepos, page);
  }
  return allRepos;
};

module.exports = async (req, res) => {
  const start = new Date();
  const allRepos = [];
  const { user } = req.query;
  const allMyRepos = await getAllRepos(user, allRepos, 1);
  const end = new Date();
  console.log(`seconds elapsed = ${Math.floor((end - start) / 1000)}`);
  res.status(200).json({ allRepos: allMyRepos });
};
