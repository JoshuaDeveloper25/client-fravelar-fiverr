import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const InstructorCard = ({ description, image, instructorName, _id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-[15rem]  border shadow-lg"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div className="shrink">
        <img
          onClick={() =>
            navigate(`/instructores/${_id}`)
          }
          className="w-full h-80 object-cover"
          src={image[0]?.cloudinary_url}
        />
      </div>
      <div className="px-3 py-3">
        <h4 className="text-gray-800 text-center uppercase font-medium pb-2">
          {instructorName}
        </h4>
        <button className="w-full border border-primary-color text-primary-color hover:bg-primary-color hover:text-white animation-fade uppercase text-xs font-bold px-2 py-2">
          Ver Horarios
        </button>
      </div>
    </div>
  );
};

export default InstructorCard;
