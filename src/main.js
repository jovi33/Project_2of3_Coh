// Titles: https://omdbapi.com/?s=thor&page=1&apikey=b7bfe3cc
// details: http://www.omdbapi.com/?i=tt3896198&apikey=b7bfe3cc

const movieSearchBox = document.getElementById('movie-search-box');

const searchList = document.getElementById('search-list');

const resultGrid = document.getElementById('result-grid');

// load movies from API
// eslint-disable-next-line valid-jsdoc
/** */
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=b7bfe3cc`;

  const res = await fetch(`${URL}`);

  const data = await res.json();

  // console.log(data.Search);

  if (data.Response == 'True') displayMovieList(data.Search);
}
/**
 *
 */
function findMovies() {
  const searchTerm = movieSearchBox.value.trim();

  if (searchTerm.length > 0) {
    searchList.classList.remove('hide-search-list');

    loadMovies(searchTerm);
  } else {
    searchList.classList.add('hide-search-list');
  }
}
/**
 *
 */
function displayMovieList(movies) {
  searchList.innerHTML = '';

  for (let idx = 0; idx < movies.length; idx++) {
    const movieListItem = document.createElement('div');

    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id

    movieListItem.classList.add('search-list-item');

    if (movies[idx].Poster != 'N/A') moviePoster = movies[idx].Poster;

    else moviePoster = 'image_not_found.png';


    movieListItem.innerHTML = `

        <div class = "search-item-thumbnail">

            <img src = "${moviePoster}">

        </div>

        <div class = "search-item-info">

            <h3>${movies[idx].Title}</h3>

            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

async function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll('.search-list-item');

  searchListMovies.forEach((movie) => {
    movie.addEventListener('click', async () => {
      // console.log(movie.dataset.id);

      searchList.classList.add('hide-search-list');

      movieSearchBox.value = '';

      const result = await fetch(

          `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=b7bfe3cc`,

      );

      const movieDetails = await result.json();

      // console.log(movieDetails);

      displayMovieDetails(movieDetails);
    });
  });
}


/** */
function displayMovieDetails(details) {
  resultGrid.innerHTML = `

    <div class = "movie-poster">

        <img src = "${

          details.Poster != 'N/A' ? details.Poster : 'image_not_found.png'

}" alt = "movie poster">

    </div>

    <div class = "movie-info">

        <h3 class = "movie-title">${details.Title}</h3>

        <ul class = "movie-misc-info">

            <li class = "year">Year: ${details.Year}</li>

            <li class = "rated">Ratings: ${details.Rated}</li>

            <li class = "released">Released: ${details.Released}</li>

        </ul>

        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>

        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>

        <p class = "actors"><b>Actors: </b>${details.Actors}</p>

        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>

        <p class = "language"><b>Language:</b> ${details.Language}</p>

        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
  details.Awards }</p> </div>
        
             <div class="comment">
        <input type="text" id="comment-box" placeholder="Enter comment">
        <button id="post" class="button-generic">Post</button>
        <ul id="unordered"></ul>
    </div>
    <div class="like-content">
      <span>
        Did you like this movie? Press like to make it easier for others to see
      </span>
      <button class="btn-secondary like-movie">
        <i class="fa fa-heart" aria-hidden="true"></i> Like
      </button>
     
    </div>
    `;
  wireEventHandlers();
}

window.addEventListener('click', (event) => {
  if (event.target.className != 'form-control') {
    searchList.classList.add('hide-search-list');
  }
});
const resetButton= document.querySelector('button#reset');
resetButton?.addEventListener('click', ()=> {
  if (movieSearchBox) {
    movieSearchBox.value='';
  }
});
/**
 *
 */
function wireEventHandlers() {
  const post= document.getElementById('post');
  post?.addEventListener('click', function() {
    const commentBox= document.getElementById('comment-box');
    const li = document.createElement('li');
    const text = document.createTextNode(commentBox.value);

    li?.appendChild(text);
    document.getElementById('unordered')?.appendChild(li);
    if (commentBox) {
      commentBox.value= '';
    }
  });
  const likeButton= document.querySelector('button.like-movie');

  likeButton?.addEventListener('click', () =>{
  // eslint-disable-next-line max-len
    likeButton.innerHTML= '<i class="fa fa-heart animate-like" aria-hidden="true"></i> You liked this';
  });
}
