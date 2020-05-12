const { getRepoLangs } = require("../githubAPI/calls");

module.exports = async (req, res) => {
  const start = new Date();
  const { repo } = req.query;
  const languages = await getRepoLangs(repo);
  const end = new Date();
  console.log(`seconds elapsed = ${Math.floor((end - start) / 1000)}`);
  res.status(200).json({ allLanguages: languages.data });
};
