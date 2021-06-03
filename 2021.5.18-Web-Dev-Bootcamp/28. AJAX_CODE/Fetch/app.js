// fetch("https://api.cryptonator.com/api/ticker/btc-usd")
//   .then((res) => {
//     console.log("Response, waiting to parse...", res);
//     return res.json(); // all data is back and has been parsed to JSON, return promise
//   })
//   .then((data) => {
//     console.log("Data parsed...", data.ticker.price);
//   })
//   .catch((e) => {
//     console.log("Oh no! Error!", e);
//   });

// Async function
const fetchBitcoinPrice = async () => {
  try {
    const res = await fetch("https://api.cryptonator.com/api/ticker/btc-usd");
    const data = await res.json();
    console.log(data.ticker.price);
  } catch (e) {
    console.log("Something went wrong!!", e);
  }
};

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

// const fetchBitcoinPrice = async () => {
//     try {
//         const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
//         const data = await res.json();
//         console.log(data.ticker.price)
//     } catch (e) {
//         console.log("SOMETHING WENT WRONG!!!", e)
//     }
// }
