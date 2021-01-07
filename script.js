let apiKey = `39c117dd`;
let searchField = document.getElementById(`searchInput`);
let results = document.getElementById(`results`);
let p = document.querySelector(`p`);
let list = document.querySelector(`ul`);
let movieDiv = document.getElementById(`movieDiv`);

function search(searchType, searchWord) {
  fetch(`http://www.omdbapi.com/?${searchType}=${searchWord}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((movieData) => {
      if (searchType === `s`) {
        movieList(movieData);
      } else if (searchType === `i`) {
        showUniqueMovie(movieData);
      } else {
        console.log(`Something went wrong`);
      }
    });
}

function choseUniqueMovie(movieData) {
  search(`i`, movieData);
}

function showUniqueMovie(movieData) {
  // Orkar jag förbättra denna?
  let dataTest = JSON.stringify(movieData);
  console.log(movieData);

  movieDiv.innerHTML = `
     <img src="${movieData.Poster}" alt="" srcset="">
     <br>
     <br>
     <p>
     Titel: ${movieData.Title}<br>
     Årtal: ${movieData.Year}<br>
     Rek ålder: ${movieData.Rated}<br>
     Releasedatum: ${movieData.Released}<br>
     Längd: ${movieData.Runtime}<br>
     Skådespelare: ${movieData.Actors}<br>
     Priser: ${movieData.Awards}<br>
     Land: ${movieData.Country}<br>
     Genre: ${movieData.Genre}<br>
     Regissör: ${movieData.Director}<br>
     Handling: ${movieData.Plot}<br>
     Typ: ${movieData.Type} <br>
     
     <br><br><br><br><br><br>
     All info om filmen finns här:
     ${dataTest}
  `;
}



searchField.addEventListener(`keyup`, function () {
  movieDiv.innerHTML = ``;
  if (searchField.value.length > 2) {
    let searchWord = searchField.value;
    search(`s`, searchWord);
  }
});

const movieList = (movieData) => {
  console.log(movieData);
  if (movieData.Error === "Movie not found!") {
    p.innerHTML = ``;
    list.innerHTML = ``;

    results.style.backgroundColor = `pink`;
    p.textContent = `Inga sökträffar`;
  } else {
    results.style.backgroundColor = `green`;
    p.innerHTML = ``;
    list.innerHTML = ``;

    for (let i = 0; i < movieData.Search.length; i++) {
      console.log(movieData.Search[i]);

      const newLi = document.createElement(`li`);
      newLi.textContent = `${movieData.Search[i].Title} (${movieData.Search[i].Year})`;
      newLi.setAttribute(
        "onclick",
        `choseUniqueMovie("${movieData.Search[i].imdbID}")`
      );
      list.appendChild(newLi);
      console.log(newLi);
    }
  }
};
