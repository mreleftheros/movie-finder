const searchForm = document.getElementById("searchForm");
const movieList = document.getElementById("movieList");
const apiKey = "d618021a";
const base = `http://www.omdbapi.com/?apikey=${apiKey}&`;

//function to update Movie list
const setMovieResult = result => {
  console.log(result)
  //create elements
  const liElement = document.createElement("li");
  const titleElement = document.createElement("span");
  const yearElement = document.createElement("span");
  const imgElement = new Image();

  //give classes and attributes
  liElement.setAttribute("imdb-id", result.imdbID);
  liElement.classList.add("results__list__item");
  titleElement.classList.add("results__list__item__title");
  yearElement.classList.add("results__list__item__year");
  imgElement.classList.add("results__list__item__image");
  
  //give content
  titleElement.textContent = result.Title;
  yearElement.textContent = result.Year;
  imgElement.src = result.Poster;
  
  //append elements
  liElement.appendChild(titleElement);
  liElement.appendChild(yearElement);
  
  
  //set img async
  imgElement.onload = function() {
    liElement.appendChild(imgElement);
  }
  
  //append to the DOM
  movieList.appendChild(liElement);
};

//function to search movies
const searchMovies = async(e) => {
  //clear previous result
  movieList.innerHTML = "";

  e.preventDefault();
  const query = "plot=full&type=movie&s=";
  const searchValue = e.target.search.value;

  const response = await fetch(base + query + searchValue + "&page=3");
  const data = await response.json();

  //reset
  e.target.reset();

  //get the data to the function
  data.Search.forEach(result => setMovieResult(result));

  
};

//events
searchForm.addEventListener("submit", searchMovies);