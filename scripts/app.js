const searchForm = document.getElementById("searchForm");
const movieList = document.getElementById("movieList");
const apiKey = "d618021a";
const base = `http://www.omdbapi.com/?apikey=${apiKey}&plot=full&`;

//function to close details
const closeDetails = (el) => {
  el.innerHTML = "See More...";
};

//function to update movie details
const setMovieDetails = (element, data) => {
  console.log(element, data.imdbID);
  let html = `
    <span class="results__list__item__details__heading">Genre</span>
    <span class="results__list__item__genre">${data.Genre}</span>
    <span class="results__list__item__details__heading">Director</span>
    <span class="results__list__item__director">${data.Director}</span>
    <span class="results__list__item__details__heading">Actors</span>
    <span class="results__list__item__actors">${data.Actors}</span>
    <span class="results__list__item__details__heading">Imdb Rating</span>
    <span class="results__list__item__rating">${data.Ratings[0].Value}</span>
    <span class="results__list__item__details__heading">Duration</span>
    <span class="results__list__item__duration">${data.Runtime}</span>
    <span class="results__list__item__plot">${data.Plot}</span>
  `;
  
  //create element to close details
  const closeDetailsElement = document.createElement("div");
  closeDetailsElement.classList.add("results__list__item__close");
  closeDetailsElement.textContent = "Show Less...";
  closeDetailsElement.addEventListener("click", () => {
    closeDetails(element);
  });

  element.innerHTML = html;
  element.appendChild(closeDetailsElement);
};

//function to get movie details
const getMovieDetails = async id => {
  const query = "i=";
  const element = document.querySelector(`[imdb-id=${id}]`);

  //fetch data
  const response = await fetch(base + query + id);
  const data = await response.json();

  //get data
  setMovieDetails(element, data);
};

//function to update Movie list
const setMovieResult = result => {
  //create elements
  const liElement = document.createElement("li");
  const titleElement = document.createElement("span");
  const yearElement = document.createElement("span");
  const imgElement = new Image();
  const detailsElement = document.createElement("div");

  //save id
  const id = result.imdbID;

  //give classes and attributes
  liElement.classList.add("results__list__item");
  titleElement.classList.add("results__list__item__title");
  yearElement.classList.add("results__list__item__year");
  imgElement.classList.add("results__list__item__image");
  detailsElement.classList.add("results__list__item__details");
  detailsElement.setAttribute("imdb-id", id);
  
  //give content
  titleElement.textContent = result.Title;
  yearElement.textContent = result.Year;
  imgElement.src = result.Poster;
  detailsElement.textContent = "See More...";
  
  //append elements
  liElement.appendChild(titleElement);
  liElement.appendChild(yearElement);
  
  //add event listener to detailsElement
  detailsElement.addEventListener("click", () => getMovieDetails(id));
  
  //set img async
  imgElement.onload = function() {
    liElement.appendChild(imgElement);
    liElement.appendChild(detailsElement);
  }
  
  //append to the DOM
  movieList.appendChild(liElement);
};

//function to search movies
const searchMovies = async(e) => {
  //clear previous results
  movieList.innerHTML = "";

  e.preventDefault();
  const query = "type=movie&s=";
  const searchValue = e.target.search.value;

  const response = await fetch(base + query + searchValue);
  const data = await response.json();

  //reset
  e.target.reset();

  //get the data to the function
  data.Search.forEach(result => setMovieResult(result));

  
};

//events
searchForm.addEventListener("submit", searchMovies);