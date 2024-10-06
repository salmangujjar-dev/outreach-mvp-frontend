"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import GoBack from "@components/GoBack";
import Table from "@components/Table";

import CampaignForm from "./components/CampaignForm";

import { CAMPAIGN_DATA } from "@utils/data";
import { COLUMN } from "@utils/types";
import { TCreateCampaign, TGetCampaign } from "./types";

const columns: COLUMN[] = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "name",
    title: "Name",
  },
  {
    key: "totalLeads",
    title: "Total Leads",
  },
  {
    key: "totalEmails",
    title: "Total Emails",
  },
  {
    key: "totalSent",
    title: "Total Sent",
  },
  {
    key: "totalPending",
    title: "Total Pending",
  },
];

const Campaign = () => {
  const [data, setData] = useState<TGetCampaign[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCreate = (values: TCreateCampaign) => {
    console.log(`Create Name: ${values.name}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete Id: ${id}`);
  };

  useEffect(() => {
    setData(CAMPAIGN_DATA);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-y-4 px-10">
      <GoBack />
      <CampaignForm handleSubmit={handleCreate}>
        <Button color="primary" className="">
          Create Campaign
        </Button>
      </CampaignForm>
      <Table
        columns={columns}
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        FormComponent={CampaignForm}
        handlePageChange={handlePageChange}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Campaign;
