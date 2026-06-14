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
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem('watched')
    return storedValue ? JSON.parse(storedValue) : []
  })

  function handleSelectMovie(imdbID) {
    setSelectedId((lastId) => (imdbID === lastId ? null : imdbID))
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    setWatched((movies) => [...movies, movie])
  }
  function handleDeleteWatched(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id))
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
          if (!res.ok) throw new Error('something went wrong with fetching movies')
          const data = await res.json()
          if (data.Response === 'False') throw new Error('Movie not found')
          setMovies(data.Search)
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

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList onSelectMovie={handleSelectMovie} movies={movies} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}
