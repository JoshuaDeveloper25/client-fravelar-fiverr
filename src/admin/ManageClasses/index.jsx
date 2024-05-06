import { Table } from "../../components/Table";
import axios from "axios";

const ManageClasses = () => {
  const columns = [
    {
      header: "Title",
      accessorKey: "title",
    },

    {
      header: "Category",
      accessorKey: "category",
    },

    // {
    //   header: "Upload Image",
    //   accessorKey: "uploadImages",
    // },

    {
      header: "Actions",
      cell: (info) => (
        <CellCustomNew
          setTextInfo={setTextInfo}
          setInfoRow={setInfoRow}
          info={info.cell.row.original}
        />
      ),
    },
  ];

  // const { data, isLoading } = useQuery({
  //   queryKey: ["news"],
  //   queryFn: async () =>
  //     await axios?.get("/news/get-news").then((res) => res.data),
  // });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      // uploadImages: formData.get("uploadImages"),
      textInfo,
    };

    mutate(data);
  };

  return (
    <div className="container-page my-5">
      <h2>Aqui va la logica de gestionar clases</h2>

      {/* --> Table */}
      <Table columns={columns} />
    </div>
  );
};

export default ManageClasses;