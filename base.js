const API_KEY = '6e701dcd117604a5345116c17f7af695';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_IMAGE_URL = 'http://image.tmdb.org/t/p/';

const movieGenres = {
  28: "Ação",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Terror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção científica",
  10770: "Cinema TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Faroeste",
};

const queryStringParams = Object.fromEntries((new URLSearchParams(window.location.search)).entries());