import { useEffect, useRef } from 'react'

export default function SearchBar({ query, setQuery }) {
  //inputEl is a ref to the input element, useEffect is used to add an event listener to the document that listens for the 'Enter' key, when the 'Enter' key is pressed, the input element is focused and the query is cleared, the event listener is removed when the component unmounts
  const inputEl = useRef(null)
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return //if the input element is already focused, do nothing
        if (e.key === 'Enter') {
          inputEl.current.focus() //focus the input element
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
