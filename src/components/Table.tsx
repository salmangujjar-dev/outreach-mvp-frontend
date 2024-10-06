import React from "react";

import { COLUMN } from "@utils/types";

import Pencil from "@icons/Pencil";
import Trash from "@icons/Trash";
import { TGetCampaign } from "../app/campaign/types";
import { TPersona } from "../app/persona/types";

type Props = {
  columns: COLUMN[];
  data: TPersona[] | TGetCampaign[];
  currentPage: number;
  totalPages: number;
  isRowClickable?: boolean;
  href?: string;
  FormComponent?: any;
  handlePageChange: (pageNumber: number) => void;
  handleEdit?: (values: TPersona) => void;
  handleDelete: (id: string) => void;
};

const Table: React.FC<Props> = ({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  isRowClickable = false,
  href = "/",
  FormComponent,
  handlePageChange,
  handleEdit,
  handleDelete,
}) => {
  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mx-10 text-white">
        <h1 className="text-5xl">Nothing to show here</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center font-bold w-full">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr className="text-xs text-gray-500 uppercase tracking-wider font-extrabold">
            {columns.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left">
                {header.title}
              </th>
            ))}
            <th scope="col" className="py-3 text-left">
              Options
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="align-middle cursor-pointer"
              onClick={() =>
                isRowClickable && (window.location.href = `${href}/${row._id}`)
              }
            >
              {columns.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {cell.key in row ? String((row as any)[cell.key]) : ""}
                </td>
              ))}

              <td className="flex gap-x-4 pl-1 items-center px-6 py-4">
                {handleEdit && (
                  <FormComponent
                    data={row}
                    handleSubmit={handleEdit}
                    isEditable={true}
                  >
                    <button>
                      <Pencil className="text-gray-500 focus:outline-none" />
                    </button>
                  </FormComponent>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete?.(row?._id);
                  }}
                >
                  <Trash className="text-red-500 focus:outline-none" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }).map((page, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
