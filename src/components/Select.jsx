/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Select = ({
  defaultValue,
  className = 'block mb-10',
  endpoint,
  onhandleChange,
  required = false,
  inputSelected = [],
  value,
  optionName,
  name,
  labelTitle,
  disabled,
  defaultValueId,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [endpoint],
    queryFn: () => axios(`${import.meta.env.VITE_BASE_URL}${endpoint}`),
  });

  return (
    <label className={className}>
      <span className="block text-lg font-semibold">
        {labelTitle} {required && '*'}
      </span>

      <select
        className="input"
        disabled={disabled || isLoading}
        onChange={onhandleChange}
        name={name}
        required={required}
        value={value}
        defaultValue={defaultValueId}
      >
        <option value="">{defaultValue}</option>

        {data?.data.map((item) => {
          return (
            <option
              value={item._id}
              key={item._id}
              // hidden={inputSelected.find((option) => option === item._id)}
            >
              {item[optionName]}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default Select;
