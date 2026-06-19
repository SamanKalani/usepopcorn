import { useEffect, useState } from 'react'
import Logo from './Logo'
import NavBar from './NavBar'
import NumResults from './NumResults'
import SearchBar from './SearchBar'
import Main from './Main'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import Box from './Box'
import MovieList from './MovieList'
import MovieDetail from './MovieDetail'
import WatchedSummary from './WatchedSummary'
import WatchedMoviesList from './WatchedMovieList'

export default function App() {
  //query is the search term, movies is the list of movies returned from the API, isLoading is a boolean to show the loading state, error is a string to show any error messages, selectedId is the id of the selected movie, watched is the list of movies that have been watched
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [showWatched, setShowWatched] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [previousScreen, setPreviousScreen] = useState('watched')
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem('watched')
    return storedValue ? JSON.parse(storedValue) : []
  })

  function handleSelectMovie(imdbID) {
    //when a movie is selected, we check if the selected movie is the same as the currently selected movie, if it is, we set selectedId to null to close the movie details, otherwise we set selectedId to the new imdbID to show the new movie details, and we also set showWatched to false to hide the watched movies list, and we set previousScreen to 'watched' if the current screen is showing watched movies, otherwise we set it to 'search' to keep track of which screen was shown before the movie details was opened, this way when the movie details are closed, we can show the correct screen based on the previous screen
    if (selectedId !== imdbID) {
      setPreviousScreen(showWatched ? 'watched' : 'search')
    }

    setSelectedId((lastId) => (imdbID === lastId ? null : imdbID))
    setShowWatched(false)
  }
  function handleCloseMovie() {
    setSelectedId(null)
    //when the movie details are closed, we check the previous screen and set showWatched to true if the previous screen was 'watched', otherwise we set it to false to show the search results
    if (previousScreen === 'watched') {
      setShowWatched(true)
    } else {
      setShowWatched(false)
    }
  }
  function handleAddWatched(movie) {
    setWatched((movies) => [...movies, movie])
    setShowWatched(true)
    setSelectedId(null)
    setPreviousScreen('watched')
    setQuery('')
  }
  function handleDeleteWatched(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id))
  }
  function handleToggleToWatched() {
    setShowWatched(true)
    setPreviousScreen('watched')
    setQuery('')
  }
  const key = '365a9c6a'

  useEffect(
    function () {
      const controller = new AbortController()
      async function fetchMovies() {
        try {
          setIsLoading(true)
          setError('')
          const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`, {
            signal: controller.signal,
          })

          if (!res.ok) throw new Error('something went wrong with fetching movies') //error handling for the fetch request, if the response is not ok, an error is thrown with a message
          const data = await res.json()
          if (data.Response === 'False') throw new Error('Movie not found')
          setMovies(data.Search) //data is looks like: {Search: [{Title: 'movie1', Year: '2020', imdbID: 'id1', Type: 'movie', Poster: 'url1'}, {Title: 'movie2', Year: '2021', imdbID: 'id2', Type: 'movie', Poster: 'url2'}], totalResults: '2', Response: 'True'}
          setError('')
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message)
          }
        } finally {
          setIsLoading(false)
        }
      }
      if (query.length < 2) {
        setMovies([])
        setError('')
        return
      }
      setSelectedId(null)
      setShowWatched(false)
      fetchMovies()
      return function () {
        controller.abort()
      }
    },
    [query]
  )

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched))
    },
    [watched]
  )

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main className={`main ${selectedId || showWatched ? 'has-selected' : ''}`}>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList onSelectMovie={handleSelectMovie} movies={movies} />}
        </Box>

        <Box
          onCustomToggle={selectedId && !showWatched ? handleToggleToWatched : null}
          isCustomActive={selectedId && !showWatched}
        >
          {selectedId && !showWatched ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
                onSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}
