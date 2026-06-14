export default function NumResults({ movies }) {
  return (
    <p className="num-results">
      found <strong>{movies.length}</strong> results
    </p>
  )
}
