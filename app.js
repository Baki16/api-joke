const genres = document.querySelectorAll(".genre");
const flags = document.querySelectorAll(".flag");
const generateBtn = document.querySelector(".generateJokeBtn");
const grid = document.querySelector(".grid");
let url = "https://v2.jokeapi.dev/joke/Any?type=single";
let genresList = [];
let flagsList = [];
let amount;

const addToList = (list, data) => list.push(data);

const removeFromList = (list, name) => {
  const index = list.findIndex((item) => item.name === name);
  if (index !== -1) list.splice(index, 1);
};

const sortList = (list) =>
  list.sort((a, b) => parseFloat(a.place) - parseFloat(b.place));

const getChecked = (e, list) => {
  const isChecked = e.target.checked;
  const id = e.target.id;

  if (isChecked && !list.some((item) => item.name === id))
    addToList(list, { name: id, place: e.target.dataset.place });
  else if (!isChecked && list.some((item) => item.name === id))
    removeFromList(list, id);
};

const generateString = (list) =>
  list
    .map((item) => item.name)
    .sort()
    .join(",");

const generateUrl = () => {
  amount = document.querySelector("#amount").value;
  const genres = genresList.length ? generateString(genresList) : "Any";
  const flags = flagsList.length ? generateString(flagsList) : "";
  url = `https://v2.jokeapi.dev/joke/${genres}?blacklistFlags=${flags}&type=single&amount=${amount}`;
};

const createCard = (joke) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const text = document.createElement("p");
  text.innerText = joke;
  text.classList.add("joke-text");
  card.appendChild(text);
  grid.appendChild(card);
};

const removeCard = () =>
  document.querySelectorAll(".card").forEach((card) => card.remove());

const generateJokes = async () => {
  generateUrl();
  const data = await fetch(url);
  const { joke, jokes } = await data.json();

  removeCard();

  if (joke) createCard(joke);
  else if (jokes && jokes.length > 0)
    jokes.forEach(({ joke }) => createCard(joke));
};

genres.forEach((genre) =>
  genre.addEventListener("change", (e) => getChecked(e, genresList))
);
flags.forEach((flag) =>
  flag.addEventListener("change", (e) => getChecked(e, flagsList))
);
generateBtn.addEventListener("click", generateJokes);
