"use client";

import React from "react";

import Targeting from "../components/Targeting";
import Enrichment from "../components/Enrichment";
import EmailCreation from "../components/EmailCreation";

import { CampaignProvider, useCampaignProvider } from "../provider";
import { CAMPAIGN_STEP } from "../constants";

import { clsxm } from "@utils/clsxm";

const CampaignContent = () => {
  const { currentStep, nextStep } = useCampaignProvider();
  return (
    <div className="flex flex-col gap-y-10 items-center">
      <div className="flex gap-x-2 mt-10">
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
            return <Targeting nextStep={nextStep} />;
          case CAMPAIGN_STEP.ENRICHMENT:
            return <Enrichment />;
          case CAMPAIGN_STEP.EMAIL_CREATION:
            return <EmailCreation />;
          default:
            return <div>Nothing to Show here</div>;
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
