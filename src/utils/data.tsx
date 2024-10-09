import { CAMPAIGN_STATUS } from "../app/campaign/constants";
import { TGetCampaign } from "../app/campaign/types";
import { TPersona } from "../app/persona/types";

export const PERSONA_DATA: TPersona[] = [
  {
    _id: "1",
    name: "Joe Doe",
    icpQuestions: {
      usp: "Streamlined solutions for small businesses",
      industry: "Technology",
      customerSupport: "24/7 support with average response time of 1 hour",
    },
  },
  {
    _id: "2",
    name: "Jane Smith",
    icpQuestions: {
      usp: "Tailored healthcare solutions for m_id-size companies",
      industry: "Healthcare",
      customerSupport: "Dedicated support team with HIPAA compliance expertise",
    },
  },
  {
    _id: "3",
    name: "Bob Johnson",
    icpQuestions: {
      usp: "Comprehensive risk management tools for large corporations",
      industry: "Finance",
      customerSupport: "Priority support with personal account managers",
    },
  },
  {
    _id: "4",
    name: "Alice Brown",
    icpQuestions: {
      usp: "Agile e-commerce solutions for startups",
      industry: "E-commerce",
      customerSupport:
        "Live chat support during business hours with email follow-up",
    },
  },
  {
    _id: "5",
    name: "Charlie Davis",
    icpQuestions: {
      usp: "Efficient digital services for government agencies",
      industry: "Public sector",
      customerSupport:
        "Dedicated government liaison team with security clearance",
    },
  },
  {
    _id: "6",
    name: "Eva Wilson",
    icpQuestions: {
      usp: "Innovative fundraising platforms for non-profit organizations",
      industry: "Education",
      customerSupport: "Community-based support forum with expert moderators",
    },
  },
  {
    _id: "7",
    name: "Frank Miller",
    icpQuestions: {
      usp: "Creative management tools for freelancers",
      industry: "Creative arts",
      customerSupport:
        "Peer-to-peer support network with weekly expert Q&A sessions",
    },
  },
  {
    _id: "8",
    name: "Grace Lee",
    icpQuestions: {
      usp: "Integrated online and offline solutions for small retailers",
      industry: "Retail",
      customerSupport:
        "Omnichannel support including in-store, phone, and online chat",
    },
  },
  {
    _id: "9",
    name: "Henry Taylor",
    icpQuestions: {
      usp: "Cutting-edge AI and ML solutions for tech startups",
      industry: "AI and Machine Learning",
      customerSupport:
        "Technical support team with AI/ML expertise available 24/7",
    },
  },
  {
    _id: "10",
    name: "Ivy Clark",
    icpQuestions: {
      usp: "Advanced supply chain optimization for manufacturing companies",
      industry: "Automotive",
      customerSupport:
        "On-site support options with remote troubleshooting capabilities",
    },
  },
];

export const CAMPAIGN_DATA: TGetCampaign[] = [
  {
    _id: "1",
    name: "Tech Innovators Outreach",
    totalLeads: 500,
    totalEmails: 1500,
    totalSent: 1200,
    totalPending: 300,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "2",
    name: "Healthcare Solutions Campaign",
    totalLeads: 300,
    totalEmails: 900,
    totalSent: 750,
    totalPending: 150,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "3",
    name: "Financial Services Expansion",
    totalLeads: 400,
    totalEmails: 1200,
    totalSent: 1000,
    totalPending: 200,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "4",
    name: "E-commerce Growth Initiative",
    totalLeads: 600,
    totalEmails: 1800,
    totalSent: 1500,
    totalPending: 300,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "5",
    name: "Education Sector Engagement",
    totalLeads: 250,
    totalEmails: 750,
    totalSent: 600,
    totalPending: 150,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "6",
    name: "Non-Profit Fundraising Drive",
    totalLeads: 200,
    totalEmails: 600,
    totalSent: 500,
    totalPending: 100,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "7",
    name: "Freelancer Tools Promotion",
    totalLeads: 350,
    totalEmails: 1050,
    totalSent: 900,
    totalPending: 150,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "8",
    name: "Retail Solutions Showcase",
    totalLeads: 450,
    totalEmails: 1350,
    totalSent: 1100,
    totalPending: 250,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "9",
    name: "AI/ML Startups Connect",
    totalLeads: 300,
    totalEmails: 900,
    totalSent: 750,
    totalPending: 150,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
  {
    _id: "10",
    name: "Manufacturing Optimization Push",
    totalLeads: 400,
    totalEmails: 1200,
    totalSent: 1000,
    totalPending: 200,
    status: CAMPAIGN_STATUS.ACTIVE,
  },
];
