/*
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const rand = Math.random();
    setTimeout(() => {
      if (rand < 0.5) {
        resolve("Your fake data here");
      } else {
        reject("Request error");
      }
    }, 1000);
  });
};
fakeRequest("/dogs/1")
  .then(() => {
    console.log("Done with request!");
  })
  .then((data) => {
    console.log("Done with request", data);
  })
  .catch((err) => {
    console.log("Error!", err);
  });
*/
const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    // only resolve
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve(); // remember to call resolve()
    }, delay);
  });
};
delayedColorChange("red", 1000)
  .then(() => delayedColorChange("orange", 1000))
  .then(() => delayedColorChange("purple", 1000))
  .then(() => delayedColorChange("violet", 1000))
  .then(() => delayedColorChange("indigo", 1000))
  .then(() => delayedColorChange("blue", 1000));

// const delayedColorChange = (newColor, delay, doNext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//         doNext && doNext();
//     }, delay)
// }

// delayedColorChange('red', 1000, () => {
//     delayedColorChange('orange', 1000, () => {
//         delayedColorChange('yellow', 1000, () => {
//             delayedColorChange('green', 1000, () => {
//                 delayedColorChange('blue', 1000, () => {
//                     delayedColorChange('indigo', 1000, () => {
//                         delayedColorChange('violet', 1000, () => {

//                         })
//                     })
//                 })
//             })
//         })
//     })
// });
/*
const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

delayedColorChange("red", 1000)
  .then(() => delayedColorChange("orange", 1000))
  .then(() => delayedColorChange("yellow", 1000))
  .then(() => delayedColorChange("green", 1000))
  .then(() => delayedColorChange("blue", 1000))
  .then(() => delayedColorChange("indigo", 1000))
  .then(() => delayedColorChange("violet", 1000));
*/
