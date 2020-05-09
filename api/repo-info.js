const axios = require("axios");
require("dotenv").config();
const { GH_TOKEN } = process.env;

const instance = axios.create({
  baseURL: "https://api.github.com",
  // timeout: 1000,
  headers: { Authorization: `token ${GH_TOKEN}` },
});

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
  const { repo } = req.query;
  const languages = await getRepoLangs(repo);
  const end = new Date();
  console.log(`seconds elapsed = ${Math.floor((end - start) / 1000)}`);
  res.status(200).json({ allLanguages: languages.data });
};
