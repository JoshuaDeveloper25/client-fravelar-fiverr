import { ImSpinner2 } from 'react-icons/im';

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 min-h-svh w-full bg-red-50/65 grid place-items-center z-50">
      <ImSpinner2 className="text-7xl animate-spin" />
    </div>
  );
};

export default Spinner;
