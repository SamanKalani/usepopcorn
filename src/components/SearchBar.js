import { useEffect, useRef } from 'react'

export default function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null)
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return
        if (e.key === 'Enter') {
          inputEl.current.focus()
          setQuery('')
        }
      }
      document.addEventListener('keydown', callback)
      return function () {
        document.removeEventListener('keydown', callback)
      }
    },
    [setQuery]
  )
  return (
    <input
      className="search"
      type="text"
      placeholder="Search..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
