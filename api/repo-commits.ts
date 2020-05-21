import { NowRequest, NowResponse } from "@now/node";

import { getUserRepoCommit, getUserRepoCommits } from "../githubAPI/calls";

const callGithubForEachCommit = async (commits, repo, commitIds, i) => {
  if (commitIds.length) {
    let commitInfo = await getUserRepoCommit(repo, commitIds[i]);
    commits.push(commitInfo.data);
  }
  if (i < commitIds.length - 1) {
    i = i + 1;
    await callGithubForEachCommit(commits, repo, commitIds, i);
  }
  return commits;
};

export default async (req: NowRequest, res: NowResponse) => {
  const start = new Date();
  const languageExtentions = [
    "asp",
    "aspx",
    "aspx-vb",
    "as3",
    "apache",
    "nasm",
    "bat",
    "c#",
    "csharp",
    "c",
    "c++",
    "cpp",
    "chpl",
    "coffee",
    "coffee-script",
    "cfm",
    "common-lisp",
    "lisp",
    "dpatch",
    "dart",
    "elisp",
    "emacs",
    "emacs-lisp",
    "pot",
    "html",
    "xhtml",
    "html+erb",
    "erb",
    "irc",
    "json",
    "jsp",
    "java",
    "javascript",
    "js",
    "lhs",
    "literate-haskell",
    "objc",
    "openedge",
    "progress",
    "abl",
    "pir",
    "posh",
    "puppet",
    "pure-data",
    "raw",
    "rb",
    "ruby",
    "r",
    "scheme",
    "bash",
    "sh",
    "shell",
    "zsh",
    "supercollider",
    "tex",
    "ts",
    "vim",
    "viml",
    "rst",
    "xbm",
    "xpm",
    "yml",
  ];
  let languageUpdates = {};
  const { user, repo } = req.query;
  let shas = [];
  const commits = await getUserRepoCommits(repo, user);
  for (let i = 0; i < commits.data.length; i++) {
    shas.push(commits.data[i].sha);
  }
  console.log(shas.length);

  const commitsInfo = await callGithubForEachCommit([], repo, shas, 0);

  commitsInfo.forEach((commit) => {
    for (let i = 0; i < commit.files.length; i++) {
      let file = commit.files[i];
      console.log(file.filename);
      console.log(file.additions);
      console.log(file.deletions);
      let extention = file.filename.match(/\w*$/);
      console.log(extention[0]);
      let key = extention[0];
      if (languageExtentions.includes(key)) {
        if (languageUpdates[key] === undefined) {
          languageUpdates[key] = parseInt(file.additions);
        } else {
          languageUpdates[key] += parseInt(file.additions);
        }
      }

      console.log("\n");
    }
  });
  const end = new Date();
  console.log(
    `seconds elapsed = ${Math.floor((Number(end) - Number(start)) / 1000)}`
  );
  res.send(languageUpdates);
};
