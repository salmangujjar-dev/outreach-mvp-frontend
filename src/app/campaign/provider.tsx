"use client";

import React, { createContext, useState, ReactNode } from "react";

import { TCampaignContext, TGetCampaign } from "./types";
import { CAMPAIGN_STEP } from "./constants";

const CampaignContext = createContext<TCampaignContext | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const CampaignProvider: React.FC<Props> = ({ children }) => {
  const [campaign, setCampaign] = useState<TGetCampaign | null>(null);
  const [currentStep, setCurrentStep] = useState<CAMPAIGN_STEP>(
    CAMPAIGN_STEP.TARGET
  );

  const nextStep = () => {
    setCurrentStep((prevStep) => {
      switch (prevStep) {
        case CAMPAIGN_STEP.TARGET:
          return CAMPAIGN_STEP.ENRICHMENT;
        case CAMPAIGN_STEP.ENRICHMENT:
          return CAMPAIGN_STEP.EMAIL_CREATION;
        default:
          return prevStep;
      }
    });
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => {
      switch (prevStep) {
        case CAMPAIGN_STEP.EMAIL_CREATION:
          return CAMPAIGN_STEP.ENRICHMENT;
        case CAMPAIGN_STEP.ENRICHMENT:
          return CAMPAIGN_STEP.TARGET;
        default:
          return prevStep;
      }
    });
  };

  return (
    <CampaignContext.Provider
      value={{ campaign, setCampaign, currentStep, nextStep, previousStep }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

const useCampaignProvider = () => {
  const context = React.useContext(CampaignContext);
  if (context === undefined) {
    throw new Error(
      "useCampaignProvider must be used within a CampaignProvider"
    );
  }
  return context;
};

export { CampaignProvider, useCampaignProvider };
