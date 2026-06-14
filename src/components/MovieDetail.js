import { useEffect, useState } from 'react'
import StarRating from '../StarRating'
import Loader from './Loader'

export default function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie
  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(' ').at(0)) || 0,
      userRating,
    }
    onAddWatched(newMovie)
    onCloseMovie()
  }
  const key = '365a9c6a'
  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true)
          const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)

          if (!res.ok) throw new Error('we have some problem with fetching data')

          const data = await res.json()
          setMovie(data)
        } catch (err) {
          setError(err.message)
        } finally {
          setIsLoading(false)
        }
      }
      getMovieDetails()
    },
    [selectedId]
  )
  useEffect(
    function () {
      if (!title) return

      document.title = `movie | ${title}`
      return function () {
        document.title = 'usePopcorn'
      }
    },
    [title]
  )

  useEffect(
    function () {
      function callBack(e) {
        if (e.key === 'Escape') {
          onCloseMovie()
        }
      }
      document.addEventListener('keydown', callBack)
      return function () {
        document.removeEventListener('keydown', callBack)
      }
    },
    [onCloseMovie]
  )

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img
              src={poster}
              alt={`${title} poster`}
              onError={(e) => {
                e.target.onerror = null
                e.target.src =
                  'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&auto=format&fit=crop'
              }}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
