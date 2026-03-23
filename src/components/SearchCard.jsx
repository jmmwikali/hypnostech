import { useState } from "react";

function SearchCard({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-card">
      <input
        type="text"
        placeholder="Search for a sleep device…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>
        <span>
          <img src="/images/search.png" alt="" width="18px" />
        </span>
        Search
      </button>
    </div>
  );
}

export default SearchCard;
