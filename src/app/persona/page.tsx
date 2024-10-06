"use client";

import React, { useEffect, useState } from "react";

import GoBack from "@components/GoBack";
import Table from "@components/Table";

import { PERSONA_DATA } from "@utils/data";
import { COLUMN } from "@utils/types";
import PersonaForm from "./components/PersonaForm";
import { Button } from "@nextui-org/react";
import { TPersona } from "./types";

const columns: COLUMN[] = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "name",
    title: "Name",
  },
];

const Persona = () => {
  const [data, setData] = useState<TPersona[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCreate = (values: TPersona) => {
    console.log(`Create Name: ${values.name}`);
  };

  const handleEdit = (values: TPersona) => {
    console.log(`Edit Id: ${values.id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete Id: ${id}`);
  };

  useEffect(() => {
    setData(PERSONA_DATA);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-y-4 px-10">
      <GoBack />
      <PersonaForm handleSubmit={handleCreate}>
        <Button color="primary" className="">
          Create Persona
        </Button>
      </PersonaForm>
      <Table
        columns={columns}
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        FormComponent={PersonaForm}
        handlePageChange={handlePageChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Persona;
