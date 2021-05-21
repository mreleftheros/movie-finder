const searchForm = document.getElementById("searchForm");
const apiKey = "d618021a";
const base = `http://www.omdbapi.com/?apikey=${apiKey}&`;

//function to update Movie list
const setMovieResult = result => {
  console.log(result);
};

//function to search movies
const searchMovies = async(e) => {
  e.preventDefault();
  const query = "s=";
  const searchValue = e.target.search.value;

  const response = await fetch(base + query + searchValue + "&page=3");
  const data = await response.json();

  //reset
  e.target.reset();

  //get the data to the function
  // data.Search.forEach(result => setMovieResult(result));
  setMovieResult(data.Search[0]);
};

//events
searchForm.addEventListener("submit", searchMovies);