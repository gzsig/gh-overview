const axios = require("axios");
require("dotenv").config();
const { GH_TOKEN } = process.env;

const instance = axios.create({
  baseURL: "https://api.github.com",
  // timeout: 1000,
  headers: { Authorization: `token ${GH_TOKEN}` },
});

const getContributions = (repo, username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const axiosRes = instance.get(`/repos/${repo}/contributors`);
      resolve(axiosRes);
    } catch (error) {
      reject(error);
    }
  });
};

const getRepos = (username, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const axiosRes = instance.get(
        `/users/${username}/repos?type=all&sort=full_name&per_page=100&page=${page}`
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

const getUserInfo = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const axiosRes = instance.get(`/users/${username}`);
      resolve(axiosRes);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getContributions,
  getRepos,
  getRepoLangs,
  getUserInfo,
};
