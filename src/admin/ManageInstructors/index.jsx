import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "../../components/Table";
import Header from "./components/Header";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const ManageInstructors = () => {
  const [infoRow, setInfoRow] = useState(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      await axios
        .put(`/users/edit-user/${infoRow._id}`, data)
        .then((res) => res.data),
    onSuccess: () => {
      setInfoRow(null);
      toast.success(`User Edited Successfully!`);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },

    {
      header: "Surname",
      accessorKey: "surname",
    },

    {
      header: "Company",
      accessorKey: "company",
    },

    {
      header: "Email",
      accessorKey: "email",
    },

    {
      header: "Role",
      accessorKey: "role",
    },

    {
      header: "Actions",
      cell: (info) => (
        <CellCustomUser setInfoRow={setInfoRow} info={info.cell.row.original} />
      ),
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get("/users/get-users").then((res) => res.data),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      company: formData.get("company"),
      email: formData.get("email"),
      // password: formData.get("password"),
    };

    mutate(data);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-page md:px-3 px-0 my-5">
      <Header />
      
      {/* --> Table */}
      <Table columns={columns} />
    </div>
  );
};

export default ManageInstructors;
