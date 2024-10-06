export type TICPQuestions = {
  usp: string;
  industry: string;
  customerSupport: string;
};

export type TPersona = {
  _id: string;
  name: string;
  icpQuestions: TICPQuestions;
};
