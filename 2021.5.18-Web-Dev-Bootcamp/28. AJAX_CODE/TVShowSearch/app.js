const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  //   console.log("Submitted!");
  const searchTerm = form.elements.query.value; //store input
  const res = await axios.get(
    `http://api.tvmaze.C om/search/shows?q=${searchTerm}`
  );
  console.log(res.data[0].show.image.medium);
  const img = document.createElement("IMG");
  img.src = res.data[0].show.img.medium;
  document.body.append(img);
});

/* 
const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data)
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}
*/
