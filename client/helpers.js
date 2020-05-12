const handleClick = () => {
  user = document.getElementById("username").value;
  console.log(user);
  if (!user) {
    error();
    return;
  }
  go(user);
};

const error = () => {
  let input = document.getElementById("username");
  input.classList.add("error");
};

const reset = () => {
  let input = document.getElementById("username");
  input.classList.contains("error") && input.classList.remove("error");
};

