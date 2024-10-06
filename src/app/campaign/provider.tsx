import React, { createContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

import { TCampaignContext, TGetCampaign } from "./types";
import { CAMPAIGN_STEP } from "./constants";

const CampaignContext = createContext<TCampaignContext | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const CampaignProvider: React.FC<Props> = ({ children }) => {
  const [campaign, setCampaign] = useState<Partial<TGetCampaign> | null>(null);
  const [currentStep, setCurrentStep] = useState<CAMPAIGN_STEP | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCampaign = async () => {
      const campaignId = pathname.split("/").at(-1);

      if (campaignId) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${campaignId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch campaign");
          }
          const campaignData = await response.json();
          setCampaign(campaignData);
          setCurrentStep(campaignData?.stepper);
        } catch (error) {
          console.error("Error fetching campaign:", error);
        }
      }
    };

    fetchCampaign();
  }, [pathname]);

  const nextStep = () => {
    setCurrentStep((prevStep) => {
      switch (prevStep) {
        case CAMPAIGN_STEP.TARGET:
          return CAMPAIGN_STEP.LEADS;
        case CAMPAIGN_STEP.LEADS:
          return CAMPAIGN_STEP.EMAILS;
        default:
          return prevStep;
      }
    });
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => {
      switch (prevStep) {
        case CAMPAIGN_STEP.EMAILS:
          return CAMPAIGN_STEP.LEADS;
        case CAMPAIGN_STEP.LEADS:
          return CAMPAIGN_STEP.TARGET;
        default:
          return prevStep;
      }
    });
  };

  const updateStepper = async (
    campaignId: string,
    campaignStep: CAMPAIGN_STEP
  ) => {
    if (campaignId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${campaignId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stepper: campaignStep }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update stepper");
        }
      } catch (error) {
        console.error("Error updating stepper:", error);
      }
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaign,
        setCampaign,
        currentStep,
        nextStep,
        previousStep,
        updateStepper,
      }}
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
