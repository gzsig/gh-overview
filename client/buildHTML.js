const newNode = (
  type = "div",
  content = "",
  id = "",
  classList = [],
  attributeList = []
) => {
  let node = document.createElement(type);
  if (id !== "") {
    node.setAttribute("id", id);
  }
  if (classList.length) {
    classList.forEach((className) => {
      node.classList.add(className);
    });
  }
  if (attributeList.length) {
    for (let i = 0; i < attributeList.length; i++) {
      node.setAttribute(
        Object.keys(attributeList[i])[0],
        Object.values(attributeList[i])[0]
      );
    }
  }
  if (content !== "") {
    node.innerHTML = content;
  }
  return node;
};

const buildCard = (repoInfo) => {
  const repos = document.getElementById("repos");
  let card = newNode("div", "", "", ["card"], []);
  let title = newNode("div", repoInfo.name, "", ["card-title"], []);
  let link = newNode(
    "a",
    "link",
    "",
    ["card-link"],
    [{ href: repoInfo.link }, { target: "_blank" }]
  );
  let contributions = newNode(
    "div",
    `${repoInfo.contributions} Commits`,
    "",
    ["card-contributions"],
    []
  );
  let languages = newNode("div", "", "", ["card-languages"], []);
  repoInfo.languages.forEach((element) => {
    let language = newNode("div", element.name, "", ["card-language"], []);
    let size = newNode("div", element.size, "", ["card-size"], []);
    let languageLine = newNode("div", "", "", ["card-language-line"], []);
    languageLine.appendChild(language);
    languageLine.appendChild(size);
    languages.appendChild(languageLine);
  });
  card.appendChild(title);
  card.appendChild(link);
  card.appendChild(languages);
  card.appendChild(contributions);
  repos.appendChild(card);
};
