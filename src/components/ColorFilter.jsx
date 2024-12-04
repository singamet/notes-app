// Ensure you have styles for this component

import PropTypes from "prop-types";

export default function ColorFilter({ colorFilter, setColorFilter }) {
  const colors = ["#F3D964", "#53F4FF", "#e1f8e1", "#e1e1f8", "#f8e1f8"];

  const handleClearFilter = () => {
    setColorFilter("");
  };

  return (
    <div className="color-filter">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-swatch ${colorFilter === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => setColorFilter(color)}
        >
          {colorFilter === color && <span className="checkmark">✓</span>}
        </div>
      ))}
      <button onClick={handleClearFilter} className="clear-filter">
        X
      </button>
    </div>
  );
}

ColorFilter.propTypes = {
  colorFilter: PropTypes.string.isRequired,
  setColorFilter: PropTypes.func.isRequired,
};
