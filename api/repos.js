const axios = require("axios");
require("dotenv").config();
const { GH_TOKEN } = process.env;

const instance = axios.create({
  baseURL: "https://api.github.com",
  // timeout: 1000,
  headers: { Authorization: `token ${GH_TOKEN}` },
});

const getRepos = (username, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const axiosRes = instance.get(
        `users/${username}/repos?type=all&sort=full_name&per_page=100&page=${page}`
      );
      resolve(axiosRes);
    } catch (error) {
      reject(error);
    }
  });
};

getAllRepos = async (username, allRepos, page) => {
  const repos = await getRepos(username, page);
  for (let i = 0; i < repos.data.length; i++) {
    allRepos.push(repos.data[i].full_name);
    console.log("Adding: ", repos.data[i].full_name);
  }
  if (repos.data.length) {
    page = page + 1;
    console.log("Getting page: ", page);
    await getAllRepos(username, allRepos, page);
  }
  return allRepos;
};

module.exports = async (req, res) => {
  const start = new Date();
  const allRepos = [];
  const { user } = req.query;
  const allMyRepos = await getAllRepos(user, allRepos, 1);
  console.log(user);
  console.log(allMyRepos);

  const end = new Date();
  console.log(`seconds elapsed = ${Math.floor((end - start) / 1000)}`);
  res.status(200).json({ allRepos: allMyRepos });
};
