export const popularMovies = `${import.meta.env.VITE_TMDB_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`
export const topRatedMovies = `${import.meta.env.VITE_TMDB_URL}/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`
export const nowPlayingMovies = `${import.meta.env.VITE_TMDB_URL}/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`
export const actionMovies = `${import.meta.env.VITE_TMDB_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=28`
export const adventureMovies = `${import.meta.env.VITE_TMDB_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=12`
export const animationMovies = `${import.meta.env.VITE_TMDB_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=16`
export const comedyMovies = `${import.meta.env.VITE_TMDB_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=35`
export const crimeMovies = `${import.meta.env.VITE_TMDB_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=80`
export const fantasyMovies = `${import.meta.env.VITE_TMDB_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=14`
export const newlyAddedMovies = '/api/v1/admin/movies'

export const imageUrl = 'https://image.tmdb.org/t/p/original'