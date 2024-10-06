export type TICPQuestions = {
  usp: string;
  industry: string;
  customerSupport: string;
};

export type TPersona = {
  id: string;
  name: string;
  icpQuestions: TICPQuestions;
};
