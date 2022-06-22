let popularMovies = [];

(async function bootstrap() {
  try {
    popularMovies = await getPopularMovies()

    setHighlightedMovie(popularMovies[0]);
    setMovieListMovies();
  } catch {
    console.log('Um erro ocorreu ao iniciar a aplicação');
  }
})();

function getPopularMovies() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movie/popular?language=pt-BR&sort_by=release_date.desc&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => {
        const movies = res.results.map(el => {
          return createMovieObject(el);
        })

        console.log(movies);

        resolve(movies)
      })
      .catch(err => {
        reject();
      });
  })
}

function createMovieObject(rawData) {
  const movie = {
    id: rawData.id,
    title: rawData.title,
    overview: rawData.overview,
    genreIds: rawData.genre_ids,
    genreNames: rawData.genre_ids.map(el => movieGenres[el]),
    releaseDate: rawData.release_date,
    posterPath: rawData.poster_path
  }

  return movie;
}

function setHighlightedMovie(movieObject) {
  const movieHtml =
    `<div class="movie-sinopse">
      <h2>${movieObject.title}</h2>
      <p><b>Sinopse: </b>${movieObject.overview}</p>
      <div>
        <p><b>Data de lançamento:</b> ${movieObject.releaseDate}</p>
        <p><b>Gênero: </b>${ movieObject.genreNames.join(', ') }</p>
      </div>
    </div>
    `;

  const elHighlightedMovieContainer = document.querySelector('#highlightedMovieContainer');
  elHighlightedMovieContainer.innerHTML = movieHtml;

  const movieImageHtml =
    `<img src="${API_IMAGE_URL}/w780/${movieObject.posterPath}" alt="Pôster do filme" />`;

  const highlightedMovieImageContainer = document.querySelector('#highlightedMovieImageContainer');
  highlightedMovieImageContainer.innerHTML = movieImageHtml;
}

function setMovieListMovies() {
  const movieListContainer = document.querySelector('#lista-filmes');

  popularMovies.forEach(movieObject => {

    const movieHtml =
      `<div class="col-xl-3 col-md-6 col-lg-4">
        <a href="/detalhes.html?movieId=${movieObject.id}" target="_blank">
          <img src="${API_IMAGE_URL}/w780/${movieObject.posterPath}" class="fotos-filmes">
        </a>
      </div>`;

      movieListContainer.innerHTML += movieHtml;
  });
}