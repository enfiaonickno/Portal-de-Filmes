let movieDetails = [];

(async function bootstrap() {
  try {
    const movieDetails = await getMovieDetails()

    console.log(movieDetails);

    setHighlightedMovie(movieDetails);
  } catch {
    console.log('Um erro ocorreu ao iniciar a aplicação');
  }
})();

function getMovieDetails() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movie/${queryStringParams.movieId}?language=pt-BR&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => {
        const movie = createMovieObject(res);
        resolve(movie)
      })
      .catch(err => {
        console.log(err)
        reject();
      });
  })
}

function createMovieObject(rawData) {
  const movie = {
    id: rawData.id,
    title: rawData.title,
    overview: rawData.overview,
    genreIds: rawData.genres.map(el => el.id),
    genreNames: rawData.genres.map(el => el.name),
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