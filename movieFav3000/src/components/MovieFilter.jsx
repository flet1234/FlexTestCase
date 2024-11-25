function MovieFilter({filter, setFilter}) {
  const handleSelect = (event) => {
    setFilter(event.target.value);
  };

  return (
    <select value={filter} onChange={handleSelect}>
      <option value="popular">Popular</option>
      <option value="now_playing">Now Playing</option>
      <option value="favorites">Favorites</option>
    </select>
  )
}

export default MovieFilter;
