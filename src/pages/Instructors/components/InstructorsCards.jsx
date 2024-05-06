import InstructorCard from "./InstructorCard";

const InstructorsCards = ({ instructors }) => {
  return (
    <>
      <h2 className="uppercase text-4xl text-center py-6">Instructores</h2>

      <article className="flex flex-wrap gap-y-6 justify-center gap-6 p-6">
        {instructors?.map((instructor) => {
          return <InstructorCard key={instructor?._id} {...instructor} />;
        })}
      </article>
    </>
  );
};

export default InstructorsCards;
