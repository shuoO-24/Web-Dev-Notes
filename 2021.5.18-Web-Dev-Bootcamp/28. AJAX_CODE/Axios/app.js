// axios
//   .get("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js")
//   .then((res) => {
//     console.log(res.ticker.price);
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });

// Async function
const fetchBitcoinPrice = async () => {
  try {
    const res = await axios.get(
      "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
    );
    console.log(res.ticker.price);
  } catch (err) {
    console.log("Error", err);
  }
};

// Get joke --- read docs for how to set up header

const jokes = document.querySelector("#jokes");
// Get new joke
const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke; // return a promise
    // either chain a .then or await that
  } catch (e) {
    return "No jokes available, sorry";
  }
};
// Add new joke
const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  console.log(jokeText);
  const newLI = document.createElement("LI");
  newLI.append(jokeText);
  jokes.append(newLI);
};
const button = document.querySelector("button");
button.addEventListener("click", addNewJoke);

// fetch('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log("RESPONSE, WAITING TO PARSE...", res)
//         return res.json()
//     })
//     .then(data => {
//         console.log("DATA PARSED...")
//         console.log(data.ticker.price)
//     })
//     .catch(e => {
//         console.log("OH NO! ERROR!", e)
//     })

// axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log(res.data.ticker.price)
//     })
//     .catch(err => {
//         console.log("ERROR!", err)
//     })
/*
const fetchBitcoinPrice = async () => {
    try {
        const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
        console.log(res.data.ticker.price)
    } catch (e) {
        console.log("ERROR!", e)
    }
}

const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    const newLI = document.createElement('LI');
    newLI.append(jokeText);
    jokes.append(newLI)
}

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://icanhazdadjoke.com/', config)
        return res.data.joke;
    } catch (e) {
        return "NO JOKES AVAILABLE! SORRY :("
    }

}

button.addEventListener('click', addNewJoke)
*/
