import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextRich = ({ setValue, value, readOnly = false }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      readOnly={readOnly}
    />
  );
};

export default TextRich;
