"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import GoBack from "@components/GoBack";
import Table from "@components/Table";
import Loader from "@components/Loader";

import PersonaForm from "./components/PersonaForm";
import { TPersona } from "./types";

import usePersona from "../hooks/usePersona";

import { COLUMN } from "@utils/types";

const columns: COLUMN[] = [
  {
    key: "_id",
    title: "ID",
  },
  {
    key: "name",
    title: "Name",
  },
];

const Persona = () => {
  const {
    data: personaData,
    isLoading,
    createPersona,
    editPersona,
    deletePersona,
  } = usePersona();
  const [data, setData] = useState<TPersona[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setData(personaData);
  }, [personaData]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-y-4 px-10">
      <GoBack />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PersonaForm handleSubmit={createPersona}>
            <Button color="primary">Create Persona</Button>
          </PersonaForm>
          <Table
            columns={columns}
            data={data}
            currentPage={currentPage}
            totalPages={totalPages}
            FormComponent={PersonaForm}
            handlePageChange={handlePageChange}
            handleEdit={editPersona}
            handleDelete={deletePersona}
          />
        </>
      )}
    </div>
  );
};

export default Persona;
