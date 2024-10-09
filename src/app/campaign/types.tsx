import { TLinkedInCookies } from "@utils/types";
import {
  CAMPAIGN_STATUS,
  CAMPAIGN_STEP,
  COMPANY_SIZE,
  LEAD_PROBABILITY,
  REVENUE_STAGES,
} from "./constants";

export type TCampaignLeads = {
  uniqueIdentifier: string;
  firstName: string;
  lastName: string;
  fullName: string;
  linkedinUrl: string;
  linkedinUsername: string;
  linkedinId: string;
  twitterUrl: string;
  twitterUsername: string;
  workEmail: string;
  industry: string;
  jobTitle: string;
  jobCompanyName: string;
  jobCompanyWebsite: string;
  jobCompanyIndustry: string;
  jobCompany12moEmployeeGrowthRate: number;
  jobCompanyTotalFundingRaised: number;
  jobCompanyInferredRevenue: REVENUE_STAGES | null;
  jobCompanyEmployeeCount: number;
  jobLastChanged: string;
  jobLastVerified: string;
  jobStartDate: string;
  jobCompanySize: COMPANY_SIZE | null;
  jobCompanyFounded: number;
  jobCompanyLocationRegion: string;
  locationName: string;
  locationCountry: string;
  skills: string[];
  education: {
    school: string;
    linkedinUrl: string;
    startDate: string | null;
    endDate: string | null;
    degreeName: string | null;
    raw: string[];
    summary: string;
  };
  gender: string;
  companyEmployees: string;
  dataProvider: string;
};

export type TEmails = {
  _id: string;
  body: string;
  subject: string;
  sent: boolean;
  sentOn: Date | null;
  bounced: boolean;
};

export type TLeadsWithEmails = {
  _id: string;
  lead: TCampaignLeads;
  email: TEmails;
};

export type TGetCampaign = {
  _id: string;
  name: string;
  status: CAMPAIGN_STATUS;
  totalLeads?: number;
  totalEmails?: number;
  totalSent?: number;
  totalPending?: number;
};

export type TCreateCampaign = {
  name: string;
  persona: string;
  leadProbability: LEAD_PROBABILITY;
  sendLimit: number;
  startDate: string;
  stepper: CAMPAIGN_STEP;
  linkedin?: TLinkedInCookies;
};

export type TCampaignContext = {
  campaign: Partial<TGetCampaign> | null;
  currentStep: CAMPAIGN_STEP | null;
  setCampaign: React.Dispatch<
    React.SetStateAction<Partial<TGetCampaign> | null>
  >;
  nextStep: () => void;
  previousStep: () => void;
  updateStepper: (campaignId: string, campaignStep: CAMPAIGN_STEP) => void;
};

export type TTargetingFilters = {
  locations: string[];
  industries: string[];
  companySizes: string[];
};
