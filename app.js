// Select elements
const genres = document.querySelectorAll(".genre");
const flags = document.querySelectorAll(".flag");
const generateBtn = document.querySelector(".generateJokeBtn");
const grid = document.querySelector(".grid");
let url = "https://v2.jokeapi.dev/joke/Any?type=single";
// Global variables
let genresList = [];
let flagsList = [];
let amount 
// Fuctions
// Adding element to specific arry
const addToList = (list, data) => list.push(data);
// Removing specific element to specific arry
const removeFromList = (list, name) =>
  list.map((item, index) => {
    if (item.name == name) delete list[index];
  });
// Sorting arry by place
const sortList = (list) => {
  list.sort((a, b) => parseFloat(a.place) - parseFloat(b.place));
};
// Function to chedck and add or remove element in list
const getChecked = (e, list) => {
  if (
    e.target.checked &&
    !(list.filter((item) => item.name == e.target.id).length > 0)
  ) {
    addToList(list, { name: e.target.id, place: e.target.dataset.place });
  }
  if (
    !e.target.checked &&
    list.filter((item) => item.name == e.target.id).length > 0
  ) {
    removeFromList(list, e.target.id);
  }
};
const generateString = (list) => {
   let string = ''
   sortList(list);
   list.forEach((item) => {
     string += (item.name + ',') 
   });
   string =  string.substring(0, string.length - 1);
   return string
}
const generateUrl = () => {
//   Creating string variavbles for  genres and flags
  let genres = "";
  let flags = "";
//   Finding amount of jokes
  amount = document.querySelector("#amount").value;
  if (genresList.length == 0) {
    genres = "Any";
  } else {
    genres = generateString(genresList)
  }

  if(flagsList.length > 0){
   flags = generateString(flagsList)
  }
//   Creating url based on genres, flags and amount 
 url = `https://v2.jokeapi.dev/joke/${genres}?blacklistFlags=${flags}&type=single&amount=${amount}`
};
// Creating card for jokes
const createCard = (joke) => {
   const card = document.createElement('div');
   card.classList.add('card');
   const text = document.createElement('p');
   text.innerText = joke
   text.classList.add('joke-text');
   card.appendChild(text)
   grid.appendChild(card)

}
const  removeCard = () => {
   const cards = document.querySelectorAll('.card')
   cards.forEach(card => card.remove())
}
// Getting jokes from API
let generateJokes = () => {
   generateUrl();
  fetch(url)
    .then((data) => data.json())
    .then((items) => {
      removeCard()
      if(amount == 1){
         createCard(items.joke)
      }
      if(items.jokes.length > 1){
        items.jokes.forEach(joke => createCard(joke.joke))
      }
      
    });
};

// Event listeners
genres.forEach((genre) => {
  genre.addEventListener("change", (e) => getChecked(e, genresList));
});
flags.forEach((flag) => {
  flag.addEventListener("change", (e) => getChecked(e, flagsList));
});
generateBtn.addEventListener("click", generateJokes);


