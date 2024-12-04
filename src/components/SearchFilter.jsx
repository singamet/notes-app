import PropTypes from "prop-types";

export default function SearchFilter({ searchFilter, setSearchFilter }) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      <button onClick={() => setSearchFilter("")}>X</button>
    </div>
  );
}

SearchFilter.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  setSearchFilter: PropTypes.func.isRequired,
};
