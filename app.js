const text = document.querySelector('p')
const btn = document.querySelector('.generateJokeBtn')
const url = 'https://v2.jokeapi.dev/joke/Any?type=single'

 let generateJoke = () => {
    fetch(url)
    .then(data => data.json())
    .then(item => text.innerText = item.joke)
 }

 generateJoke()

btn.addEventListener('click', generateJoke)
