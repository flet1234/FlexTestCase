
const apiKey = import.meta.env.VITE_API_KEY;

export const getPopularMovies = async () => {
    const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.results
    } catch (error) {
        console.error("Error fetching popular movies: ", error);
        throw error;
    }
}

export const getNowPlayingMovies = async () => {
  const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching now playing movies: ", error);
    throw error;
  }
};

export const getFilmDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error movie details: ", error);
        throw error;
    }
}

export const getFavorites = async (arrayOfFavoriteMovieIds) => {
    
    const result = await Promise.all(arrayOfFavoriteMovieIds.map(getFilmDetails))
    
    return result;
    
};
