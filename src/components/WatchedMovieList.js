import WatchedMovie from './WatchedMovie'

export default function WatchedMoviesList({ watched, onDeleteWatched, onSelectMovie }) {
  return (
    <ul className="list list-watched list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  )
}
