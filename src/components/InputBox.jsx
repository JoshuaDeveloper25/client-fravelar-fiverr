/* eslint-disable react/prop-types */
const InputBox = ({ labelClassname, labelTitle, propInput, type = "text" }) => {
  return (
    <label className={`mb-4 ${labelClassname} block`}>
      <span className="block text-lg font-semibold">
        {labelTitle} {propInput.required && "*"}
      </span>

      <input className="input" type={type} {...propInput} />
    </label>
  );
};

export default InputBox;
