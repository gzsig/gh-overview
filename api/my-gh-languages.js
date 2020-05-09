const axios = require("axios");
require("dotenv").config();
const { GH_TOKEN } = process.env;

const instance = axios.create({
  baseURL: "https://api.github.com",
  // timeout: 1000,
  headers: { Authorization: `token ${GH_TOKEN}` },
});

const getAllRepos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const axiosRes = instance.get(
        "user/repos?affiliation=owner,collaborator&sort=full_name&per_page=100&page=1&direction=asc"
      );
      resolve(axiosRes);
    } catch (error) {
      reject(error);
    }
  });
};

const getRepoLangs = (repo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const axiosRes = instance.get(`/repos/${repo}/languages`);
      resolve(axiosRes);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = async (req, res) => {
  const start = new Date();
  const repos = [];
  const languages = {};
  const allMyRepos = await getAllRepos();
  for (let i = 0; i < allMyRepos.data.length; i++) {
    repos.push(allMyRepos.data[i].full_name);
  }
  for (let i = 0; i < repos.length; i++) {
    const langs = await getRepoLangs(repos[i]);
    if (Object.keys(langs.data).length) {
      langsArray = Object.keys(langs.data);
      for (let j = 0; j < langsArray.length; j++) {
        if (languages[langsArray[j]] === undefined) {
          languages[langsArray[j]] = parseInt(langs.data[langsArray[j]]);
        } else {
          languages[langsArray[j]] =
            languages[langsArray[j]] + parseInt(langs.data[langsArray[j]]);
        }
      }
    }
  }
  console.log(languages);
  const end = new Date();
  console.log(`seconds elapsed = ${Math.floor((end - start) / 1000)}`);
  res.status(200).json(languages);
};
