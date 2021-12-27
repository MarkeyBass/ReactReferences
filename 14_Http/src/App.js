import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://swapi.dev/api/films");
      
      // First we are cheching errors and only then parsing the json data
      // to avoid shoing unexpected error messeges.
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Can't get the data - 404 status code")
        } else {
          throw new Error('Something went wrong')
        } 
      }
      
      const data = await res.json();

      const filmsDataModified = data.results.map((filmData) => {
        return {
          id: filmData.episode_id,
          title: filmData.title,
          releaseDate: filmData.release_date,
          openingText: filmData.opening_crawl,
        };
      });
      setMovies(filmsDataModified);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
    // fetch("https://swapi.dev/api/films/")
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     setMovies(data.results)
    //   })
    //   .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
    // empty array of dependencies will execute the useEffect function on first component evaluation.
    // with addind a dependency to the array it will be reexecuted also on the denendency change
  }, [fetchMoviesHandler])

  let content = <p>No movies to show. pleas click the fetch button!</p>;
  if (movies.length > 0 ) content = <MoviesList movies={movies} />;
  if(error) content = <p>ERROR: {error}</p>;
  if (isLoading) content = <p>Page Is Loading...</p>

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* <MoviesList movies={dummyMovies} /> */}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!error && !isLoading && movies.length === 0 && <p>No movies to show. pleas click the fetch button!</p>}
        {!isLoading && error && <p>ERROR: {error}</p>}
        {isLoading && <p>Page Is Loading...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
