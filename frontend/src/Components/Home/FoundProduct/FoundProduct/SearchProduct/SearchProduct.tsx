import React, { useState } from "react";
import "./SearchProduct.css";

interface SearchComponentProps {
  onSearch: (query: string) => void;
  viewMode?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, viewMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={`search-component-${viewMode}`}>
      <form onSubmit={handleSearch}>
        <div className={`form-group-${viewMode}`}>
          <label htmlFor={`searchInput-${viewMode}`}>Критерии поиска</label>
          <input
            type="text"
            id={`searchInput-${viewMode}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-input-form-${viewMode}`}
            placeholder="Введите запрос..."
          />
        </div>
        <button type="submit" className={`search-button-${viewMode}`}>
          Поиск
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
