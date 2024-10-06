"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import GoBack from "@components/GoBack";
import Table from "@components/Table";
import Loader from "@components/Loader";

import CampaignForm from "./components/CampaignForm";

import useCampaign from "../hooks/useCampaign";

import { COLUMN } from "@utils/types";
import { TGetCampaign } from "./types";

const columns: COLUMN[] = [
  {
    key: "_id",
    title: "ID",
  },
  {
    key: "name",
    title: "Name",
  },
  {
    key: "status",
    title: "Status",
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
  const {
    data: campaignData,
    isLoading,
    createCampaign,
    deleteCampaign,
  } = useCampaign();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setData(campaignData);
  }, [campaignData]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-y-4 px-10">
      <GoBack />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CampaignForm handleSubmit={createCampaign}>
            <Button color="primary" className="">
              Create Campaign
            </Button>
          </CampaignForm>
          <Table
            columns={columns}
            data={data}
            isRowClickable={true}
            href={"/campaign"}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleDelete={deleteCampaign}
          />
        </>
      )}
    </div>
  );
};

export default Campaign;
