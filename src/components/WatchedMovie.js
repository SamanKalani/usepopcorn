export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
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
        <button onClick={() => onDeleteWatched(movie.imdbID)} className="btn-delete">
          X
        </button>
      </div>
    </li>
  )
}
