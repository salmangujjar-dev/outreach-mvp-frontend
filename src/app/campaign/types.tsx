import { CAMPAIGN_STEP, LEAD_PROBABILITY } from "./constants";

export type TGetCampaign = {
  id: string;
  name: string;
  totalLeads: number;
  totalEmails: number;
  totalSent: number;
  totalPending: number;
};

export type TCreateCampaign = {
  name: string;
  persona: string;
  leadProbability: LEAD_PROBABILITY;
};

export type TCampaignContext = {
  campaign: TGetCampaign | null;
  currentStep: CAMPAIGN_STEP;
  setCampaign: React.Dispatch<React.SetStateAction<TGetCampaign | null>>;
  nextStep: () => void;
  previousStep: () => void;
};

export type TTargetingFilters = {
  location: string[];
  personTitle: string[];
};
