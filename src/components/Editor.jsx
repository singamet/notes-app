import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ColorPicker from "./ColorPicker";
import PropTypes from "prop-types";

const Editor = ({ value, setValue, color, setColor }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }],
      [{ align: [] }],
      ["link"],
      [{ background: [] }],
    ],
  };

  return (
    <div className="editor" style={{ backgroundColor: color }}>
      <ColorPicker selectedColor={color} onColorSelect={setColor} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder="Write your note here..."
      />
    </div>
  );
};

export default Editor;
Editor.propTypes = {
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
