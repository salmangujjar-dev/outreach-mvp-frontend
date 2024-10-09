export type COLUMN = { key: string; title: string };

export type TLinkedInCookies = {
  li_at: string;
  JSESSIONID: string;
  messageTemplate: string;
};

export type TLinkedInProfile = {
  plainId: number;
  miniProfile: {
    memorialized: boolean;
    firstName: string;
    lastName: string;
    dashEntityUrn: string;
    occupation: string;
    objectUrn: string;
    entityUrn: string;
    backgroundImage: {
      "com.linkedin.common.VectorImage": {
        artifacts: {
          width: number;
          fileIdentifyingUrlPathSegment: string;
          expiresAt: number;
          height: number;
        }[];
        rootUrl: string;
      };
    };
    publicIdentifier: string;
    picture: {
      "com.linkedin.common.VectorImage": {
        artifacts: {
          width: number;
          fileIdentifyingUrlPathSegment: string;
          expiresAt: number;
          height: number;
        }[];
        rootUrl: string;
      };
    };
    trackingId: string;
  };
  publicContactInfo: Record<string, unknown>;
  premiumSubscriber: boolean;
};
