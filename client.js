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

const handleClick = () => {
  user = document.getElementById("username").value;
  console.log(user);
  getRepos(user);
};

const getRepos = async (username) => {
  const root = document.getElementById("root");
  const repos = await axios.get(`/api/repos?user=${username}`);
  for (let i = 0; i < repos.data.allRepos.length; i++) {
    const lang = await axios.get(
      `/api/repo-info?repo=${repos.data.allRepos[i]}`
    );
    console.log(lang);
    let ul = newNode("ul");
    let currentRepo = newNode("li", repos.data.allRepos[i]);
    langArray = Object.keys(lang.data.allLanguages);
    langArray.forEach((element) => {
      ul.innerHTML += `<li>${element}</li>`;
    });
    let item = newNode("div");
    item.appendChild(currentRepo);
    item.appendChild(ul);
    root.appendChild(item);
  }
};
