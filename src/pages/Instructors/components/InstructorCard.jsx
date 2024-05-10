import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const InstructorCard = ({ description, image, instructorName, _id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-[15rem]  border shadow-lg overflow-hidden"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <Link to={`/instructores/${_id}`} className="shrink block">
        <img
          className="w-full h-80 object-cover"
          src={image[0]?.cloudinary_url}
        />
      </Link>
      <div className="px-3 pb-3">
        <h4 className="text-gray-800 text-center uppercase font-medium py-2">
          {instructorName}
        </h4>
        <button className="btn w-full">Ver Horarios</button>
      </div>
    </div>
  );
};

export default InstructorCard;
