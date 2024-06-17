"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let currentBatch = 0;
  const batchSize = 20;
  let allMovies = [];
  let filteredMovies = [];
  let searchBar = document.querySelector(".search-field");
  // Fetch the movie data
  async function getmovieData() {
    let response = await fetch(`https://sahilz9.github.io/CW-API/data.json`);
    let data = await response.json();
    allMovies = data.movies;
    filteredMovies = allMovies;
    showData();
  }
  let showData = (clearPrevious = false) => {
    let gridList = document.querySelector(".grid-list");
    if (clearPrevious) {
      gridList.innerHTML = ""; // Clear previous data only if clearPrevious is true
      currentBatch = 0; // Reset the batch
    }
    let startIndex = currentBatch * batchSize;
    let endIndex = startIndex + batchSize;
    let batchData = filteredMovies.slice(startIndex, endIndex);
    batchData.forEach((ele) => {
      let movieCard = document.createElement("div");
      movieCard.innerHTML = `
        <figure class="poster-box card-banner">
          <img src="${ele.thumbnail}" alt="${ele.title}" class="img-cover"/>
        </figure>
        <h4 class="movie-title">${getTitle(ele.title)}</h4>
        <div class="meta-list">
          <div class="meta-item">
            <img src="./src/images/star.png" width="20" height="20" loading="lazy" alt="" class=""/>
            <span class="span">8.4</span>
          </div>
          <div class="card-badge">${ele.year}</div>
        </div>
        <a href="./detail.html" class="card-btn" title="${ele.title}"></a>`;
      gridList.append(movieCard);
    });
    currentBatch++;
  };
  function getTitle(title) {
    const maxLength = 20;
    if (title.length > maxLength) {
      let titleArray = title.split("");
      titleArray.splice(maxLength, title.length - maxLength, "...");
      return titleArray.join("");
    }
    return title;
  }
  searchBar.addEventListener("input", () => {
    let query = searchBar.value.toLowerCase();
    filteredMovies = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    showData(true); // Clear previous data and show new data
  });
  let loadBtn = document.querySelector(".load-more");
  loadBtn.addEventListener("click", () => {
    showData();
  });
  getmovieData();
});
