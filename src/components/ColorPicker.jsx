import PropTypes from "prop-types";

const ColorPicker = ({ selectedColor, onColorSelect }) => {
  const colors = ["#F3D964", "#53F4FF", "#e1f8e1", "#e1e1f8", "#f8e1f8"];

  return (
    <div className="color-picker-container">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-swatch ${
            selectedColor === color ? "selected" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        >
          {selectedColor === color && <span className="checkmark">✓</span>}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
ColorPicker.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  onColorSelect: PropTypes.func.isRequired,
};
