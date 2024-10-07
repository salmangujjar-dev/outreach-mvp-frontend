import React, { useEffect, useState } from "react";
import LinkedIn from "@icons/LinkedIn";
import Twitter from "@icons/Twitter";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

import { useCampaignProvider } from "../provider";
import { TCampaignLeads } from "../types";
import { CAMPAIGN_STEP } from "../constants";

const Enrichment = () => {
  const { campaign, nextStep, updateStepper } = useCampaignProvider();

  const [leads, setLeads] = useState<TCampaignLeads[]>([]);

  const initiateEmailGeneration = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${campaign?._id}/generate-emails`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate emails");
      }
      await response.json();
      toast.success("Emails Generation Started.");
    } catch (error) {
      console.error("Error generating emails:", error);
      toast.error("Failed to generate emails.");
    }
  };

  useEffect(() => {
    (async () => {
      if (campaign?._id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${campaign._id}/leads`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch leads");
          }
          const leadsData = await response.json();
          setLeads(leadsData);
        } catch (error) {
          console.error("Error fetching leads:", error);
        }
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {leads.map((lead, index) => (
          <div
            key={index}
            className="flex px-1 py-2 flex-col justify-between items-center text-center rounded-md bg-white shadow-md w-64 h-44 text-black font-semibold"
          >
            <span title={lead.fullName}>
              {lead.firstName + " " + lead?.lastName?.[0]}.
            </span>
            <span
              title={lead.jobTitle}
              className="text-xs line-clamp-1 bg-blue-400 px-1.5 py-0.5 rounded-full text-white shadow-md"
            >
              {lead.jobTitle}
            </span>
            <div className="flex gap-x-2 justify-center">
              <a
                href={lead.linkedinUrl}
                target="_blank"
                className="cursor-pointer"
              >
                <LinkedIn className="w-7 h-7 text-[#0a66c2]" />
              </a>
              <a
                href={lead.twitterUrl}
                target="_blank"
                className="cursor-pointer"
              >
                <Twitter className="w-7 h-7 " />
              </a>
            </div>
          </div>
        ))}
      </div>
      <Button
        color="primary"
        className="w-full"
        onClick={async () => {
          await updateStepper(campaign?._id!, CAMPAIGN_STEP.EMAILS);
          await initiateEmailGeneration();
          toast.success(
            "Leads Enrichment Started. This is will take a few minutes."
          );
          nextStep();
        }}
      >
        Start Personalized Email Generation
      </Button>
    </div>
  );
};

export default Enrichment;
