const { getContributions } = require("../githubAPI/calls");

module.exports = async (req, res) => {
  const start = new Date();
  let numberOfContributions = 0;
  const { repo, user } = req.query;
  const contributions = await getContributions(repo, user);
  for (let i = 0; i < contributions.data.length; i++) {
    if (contributions.data[i].login.toLowerCase() === user.toLowerCase()) {
      numberOfContributions = contributions.data[i].contributions;
    }
  }
  const end = new Date();
  console.log(`seconds elapsed = ${Math.floor((end - start) / 1000)}`);
  res.status(200).json({ allContributions: numberOfContributions });
};
