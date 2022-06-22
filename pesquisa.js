let popularMovies = [];

(async function bootstrap() {
  try {
    popularMovies = await getSearchedMovies()

    console.log(popularMovies);

    setMovieListMovies();
  } catch {
    console.log('Um erro ocorreu ao iniciar a aplicação');
  }
})();

function getSearchedMovies() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/search/movie?language=pt-BR&query=${queryStringParams.query}&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => {
        const movies = res.results.map(el => {
          return createMovieObject(el);
        })

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

function setMovieListMovies() {
  const movieListContainer = document.querySelector('#lista-filmes');

  popularMovies.forEach(movieObject => {

    const movieHtml =
      `<div class="col-xl-3 col-md-6 col-lg-4" id="movie${movieObject.id}">
        <a href="/detalhes.html?movieId=${movieObject.id}" target="_blank">
          <img src="${API_IMAGE_URL}/w780/${movieObject.posterPath}" onerror="document.querySelector('#movie${movieObject.id}').remove();" class="fotos-filmes">
        </a>
        <p>${movieObject.title}</p>
      </div>`;

      movieListContainer.innerHTML += movieHtml;
  });
}