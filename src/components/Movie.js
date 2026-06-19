export default function Movie({ movie, onSelectMovie }) {
  //movie is looks like: {Title: 'movie1', Year: '2020', imdbID: 'id1', Type: 'movie', Poster: 'url1'}
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        onError={(e) => {
          e.target.onerror = null
          e.target.src =
            'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&auto=format&fit=crop'
        }}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}
