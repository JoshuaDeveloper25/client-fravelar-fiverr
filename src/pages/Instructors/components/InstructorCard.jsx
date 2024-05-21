import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const InstructorCard = ({ description, image, instructorName, _id }) => {
  return (
    <div
      className="w-[15rem] border shadow-lg overflow-hidden"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <Link to={`/instructores/${_id}`} className="shrink block">
        <img
          className="w-full h-80 object-cover"
          src={image[0]?.cloudinary_url}
          decoding="async"
          loading="lazy"
        />
      </Link>
      <div className="px-3 pb-3">
        <h4 className="text-gray-800 text-center uppercase font-medium py-2">
          {instructorName}
        </h4>
        <Link to={'/calendario'} className="btn w-full text-center">
          Ver Horarios
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard;
