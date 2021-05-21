const searchForm = document.getElementById("searchForm");
const apiKey = "d618021a";
const base = `http://www.omdbapi.com/?apikey=${apiKey}&`;

//function to search movies
const searchMovies = async(e) => {
  e.preventDefault();
  const query = "s=";
  const searchValue = e.target.search.value;

  const response = await fetch(base + query + searchValue + "&page=3");
  const data = await response.json();
  console.log(data);

  //reset
  e.target.reset();
};

//events
searchForm.addEventListener("submit", searchMovies);