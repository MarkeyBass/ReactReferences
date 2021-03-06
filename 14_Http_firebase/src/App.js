import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // in order to speak with firebase we need '.json' ending to our files.
      const response = await fetch(
        "https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );

      if (!response.ok) {
        throw new Error("Error: Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      console.log(data);

      for (let key in data) {
        console.log(key);
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    // console.log(movie);
    const response = await fetch(
      "https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

// OLD CODE FOR THE STAR WORS API:

// const response = await fetch('https://swapi.dev/api/films/');

// const transformedMovies = data.results.map((movieData) => {
//   return {
//     id: movieData.episode_id,
//     title: movieData.title,
//     openingText: movieData.opening_crawl,
//     releaseDate: movieData.release_date,
//   };
// });

// const transformedMovies = loadedMovies.map((movieData) => {
//   return {
//     id: movieData.id,
//     title: movieData.title,
//     openingText: movieData.openingText,
//     releaseDate: movieData.releaseDate,
//   };
// });

// setMovies(transformedMovies);
