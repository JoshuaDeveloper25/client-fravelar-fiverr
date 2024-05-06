import InstructorsCards from "./components/InstructorsCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Instructors = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () =>
      await axios?.get(`${import.meta.env.VITE_BASE_URL}/instructors/`),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container-page my-10">
      <InstructorsCards instructors={data?.data} />
    </section>
  );
};

export default Instructors;
