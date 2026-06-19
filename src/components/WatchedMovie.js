export default function WatchedMovie({ movie, onDeleteWatched, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        onError={(e) => {
          e.target.onerror = null
          e.target.src =
            'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&auto=format&fit=crop'
        }}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={(e) => {
            // stopPropagation is used to prevent the onSelectMovie function from being called when the delete button is clicked, and the onDeleteWatched function is called with the movie's imdbID to delete the movie from the watched list
            e.stopPropagation()
            onDeleteWatched(movie.imdbID)
          }}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  )
}
