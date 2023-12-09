import React from "react";

function SearchItem({ search, setSearch }) {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="seacrh">Search</label>
      <input
        type="text"
        placeholder="Search"
        id="searchBox"
        role="searchbox"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchItem;
