const API_URL = 'http://localhost:3000/api/v1';

const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  return response.json();
}

const getMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  return response.json();
}

const createMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });
  return response.json();
}

const updateMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movies/${movie.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });
  return response.json();
}

export {
  getMovies,
  createMovie,
  updateMovie,
  getMovie
}

