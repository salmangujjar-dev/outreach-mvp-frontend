"use client";

import React from "react";

import Loader from "@components/Loader";

import Targeting from "../components/Targeting";
import Enrichment from "../components/Leads";
import Emails from "../components/Emails";

import { CampaignProvider, useCampaignProvider } from "../provider";
import { CAMPAIGN_STEP } from "../constants";

import { clsxm } from "@utils/clsxm";

const CampaignContent = () => {
  const { campaign, currentStep, nextStep } = useCampaignProvider();
  return (
    <div className="flex flex-col gap-y-10 items-center mt-10">
      <h1 className="text-4xl">CAMPAIGN NAME: {campaign?.name}</h1>{" "}
      <div className="flex gap-x-2">
        {Object.entries(CAMPAIGN_STEP).map(([_, value], index) => (
          <div
            key={index}
            className={clsxm("border-white px-4 py-2 rounded-md select-none", {
              "bg-white text-black font-semibold": currentStep === value,
            })}
          >
            {value}
          </div>
        ))}
      </div>
      {(() => {
        switch (currentStep) {
          case CAMPAIGN_STEP.TARGET:
            return (
              <Targeting campaignId={campaign?._id!} nextStep={nextStep} />
            );
          case CAMPAIGN_STEP.LEADS:
            return <Enrichment />;
          case CAMPAIGN_STEP.EMAILS:
            return <Emails />;
          default:
            return <Loader />;
        }
      })()}
    </div>
  );
};

const CampaignFlow = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-white">
      <CampaignProvider>
        <CampaignContent />
      </CampaignProvider>
    </div>
  );
};

export default CampaignFlow;
