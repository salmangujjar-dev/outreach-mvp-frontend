import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useCampaignProvider } from "../provider";
import { CAMPAIGN_STATUS } from "../constants";
import { TGetCampaign, TLeadsWithEmails } from "../types";
import Loader from "@components/Loader";
import LinkedIn from "@icons/LinkedIn";
import Twitter from "@icons/Twitter";
import { clsxm } from "@utils/clsxm";
import EmailModal from "./EmailModal";

const Emails = () => {
  const { campaign, setCampaign } = useCampaignProvider();
  const [loading, setLoading] = useState(false);

  const [leadsWithEmails, setLeadWithEmails] = useState<TLeadsWithEmails[]>([]);

  const initiateCampaign = async () => {
    const campaignId = campaign?._id;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${campaignId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: CAMPAIGN_STATUS.ACTIVE }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to initiate campaign");
      }

      setCampaign((prevCampaign: Partial<TGetCampaign> | null) => ({
        ...prevCampaign,
        status: CAMPAIGN_STATUS.ACTIVE,
      }));
      toast.success("Campaign Initiated!");
    } catch (error) {
      console.error("Error initiating campaign:", error);
      toast.error("Failed to initiate campaign.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmails = async () => {
      if (campaign?._id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${campaign._id}/emails`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch leads");
          }
          const data = await response.json();
          setLeadWithEmails(data);
        } catch (error) {
          console.error("Error fetching leads:", error);
        }
      }
    };

    fetchEmails();
    const intervalId = setInterval(fetchEmails, 30000);

    return () => clearInterval(intervalId);
  }, [campaign?._id]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {leadsWithEmails.map(({ lead, email }, index) => (
          <div
            key={index}
            className={clsxm(
              "flex px-1 py-2 flex-col justify-between bg-gray-500 items-center text-center rounded-md  shadow-md w-64 h-44 text-black font-semibold",
              { "cursor-pointer bg-white ": email }
            )}
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
            {email ? (
              <EmailModal subject={email.subject} body={email.body}>
                <span className="text-sm cursor-pointer underline font-extrabold">
                  View Email
                </span>
              </EmailModal>
            ) : (
              <span className="text-sm">Email Not Generated Yet.</span>
            )}

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
      {campaign?.status === CAMPAIGN_STATUS.DRAFT ? (
        <Button
          color="primary"
          className="w-full"
          onClick={async () => {
            await initiateCampaign();
          }}
          disabled={loading}
        >
          {loading ? <Loader /> : "Initiate Campaign"}
        </Button>
      ) : (
        <h1 className="text-3xl">Campaign Status: {campaign?.status}</h1>
      )}
    </div>
  );
};

export default Emails;
