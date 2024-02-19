import "./SearchBar.css";

function SearchBar({ searchHandler }) {
  return (
    <div className="search-bar">
       <input
        type="text"
        placeholder="Busca un ejercicio..."
        name="searchKeyword"
        onChange={(e) => searchHandler(e)}
      />
    </div>
  );
}

export default SearchBar;
