// THE CALLBACK VERSION
const fakeRequestCallback = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 500) + 500;
  setTimeout(() => {
    if (delay > 3000) {
      failure("Connection Timeout :(");
    } else {
      success(`Here is your fake data from ${url}`);
    }
  }, delay);
};
// THE PROMISE VERSION
const fakeRequestPromise = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 300) + 500;
    setTimeout(() => {
      if (delay > 7000) {
        reject("Connection Timeout :(");
      } else {
        resolve(`Here is your fake data from ${url}`);
      }
    }, delay);
  });
};

/*
fakeRequestCallback(
  "Book.com",
  function(response) {
    console.log("It works, 1st", response);
    fakeRequestCallback(
      "book.com/page2",
      function(response) {
        console.log(response);
        console.log("It worked, 2nd");
        fakeRequestCallback(
          "book.com/page3",
          function(response) {
            console.log(response);
            console.log("It works, 3nd");
          },
          function(err) {
            console.log("Error, 3nd");
            console.log(err);
          }
        );
      },
      function(err) {
        console.log("Error, 2st");
        console.log(err);
      }
    );
  },
  function(error) {
    console.log("Error, 1st", error);
  }
);
// It works Here is your fake data from Book.com
*/
/*
fakeRequestPromise("yelp.com/api/coffee/page1")
  .then(() => {
    console.log("Promise resolved!(Page 1)");
    console.log("It worked!");
    fakeRequestPromise("yelp.com/api/coffee/page2")
      .then(() => {
        console.log("Promise resolved(Page 2)!");
        fakeRequestPromise("yelp.com/api/coffee/page3")
          .then(() => {
            console.log("Promise resolved(Page 3)!");
          })
          .catch(() => {
            console.log("Promise rejected!(Page 3)");
          });
      })
      .catch(() => {
        console.log("Promise rejected!(Page 2)");
      });
  })
  .catch(() => {
    console.log("Promise rejected!(Page 1)");
    console.log("Error!");
  });
*/
/*
fakeRequestPromise("yelp.com/api/coffee/page1")
  .then(() => {
    console.log("Promise resolved!(Page 1)");
    return fakeRequestPromise("yelp.com/api/coffee/page2");
  })
  .then(() => {
    // the fakeRequestPromise returned by previous .then will call this
    console.log("Promise resolved!(Page 2)");
    return fakeRequestPromise("yelp.com/api/coffee/page3");
  })
  .then(() => {
    // the fakeRequestPromise returned by previous .then will call this
    console.log("Promise resolved!(Page 3)");
  })
  .catch(() => {
    console.log("Error!");
  });
*/
// The promise can be resolved or rejected with values
fakeRequestPromise("yelp.com/api/coffee/page1")
  .then((data) => {
    console.log(data);
    console.log("Promise resolved!(Page 1)");
    return fakeRequestPromise("yelp.com/api/coffee/page2");
  })
  .then((data) => {
    console.log(data);
    console.log("Promise resolved!(Page 2)");
    return fakeRequestPromise("yelp.com/api/coffee/page3");
  })
  .then((data) => {
    console.log(data);
    console.log("Promise resolved!(Page 3)");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error!");
  });

// fakeRequestCallback('books.com/page1',
//     function (response) {
//         console.log("IT WORKED!!!!")
//         console.log(response)
//         fakeRequestCallback('books.com/page2',
//             function (response) {
//                 console.log("IT WORKED AGAIN!!!!")
//                 console.log(response)
//                 fakeRequestCallback('books.com/page3',
//                     function (response) {
//                         console.log("IT WORKED AGAIN (3rd req)!!!!")
//                         console.log(response)
//                     },
//                     function (err) {
//                         console.log("ERROR (3rd req)!!!", err)
//                     })
//             },
//             function (err) {
//                 console.log("ERROR (2nd req)!!!", err)
//             })
//     }, function (err) {
//         console.log("ERROR!!!", err)
//     })

// fakeRequestPromise('yelp.com/api/coffee/page1')
//     .then(() => {
//         console.log("IT WORKED!!!!!! (page1)")
//         fakeRequestPromise('yelp.com/api/coffee/page2')
//             .then(() => {
//                 console.log("IT WORKED!!!!!! (page2)")
//                 fakeRequestPromise('yelp.com/api/coffee/page3')
//                     .then(() => {
//                         console.log("IT WORKED!!!!!! (page3)")
//                     })
//                     .catch(() => {
//                         console.log("OH NO, ERROR!!! (page3)")
//                     })
//             })
//             .catch(() => {
//                 console.log("OH NO, ERROR!!! (page2)")
//             })
//     })
//     .catch(() => {
//         console.log("OH NO, ERROR!!! (page1)")
//     })

// THE CLEANEST OPTION WITH THEN/CATCH
// RETURN A PROMISE FROM .THEN() CALLBACK SO WE CAN CHAIN!
// fakeRequestPromise("yelp.com/api/coffee/page1")
//   .then((data) => {
//     console.log("IT WORKED!!!!!! (page1)");
//     console.log(data);
//     return fakeRequestPromise("yelp.com/api/coffee/page2");
//   })
//   .then((data) => {
//     console.log("IT WORKED!!!!!! (page2)");
//     console.log(data);
//     return fakeRequestPromise("yelp.com/api/coffee/page3");
//   })
//   .then((data) => {
//     console.log("IT WORKED!!!!!! (page3)");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO, A REQUEST FAILED!!!");
//     console.log(err);
//   });

// makerequest(
//   () => {
//     // If work, run this
//     // can nest functions
//   },
//   () => {
//     // If didn't work, run this
//   }
// );
