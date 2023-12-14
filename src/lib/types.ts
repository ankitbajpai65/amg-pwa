export type userDetailsType = {
  error: string;
  startList: {
    baseData: {
      code: string;
      company: string;
      description: string;
      itemValue: string;
    }[];
    branches: string;
    cards: {
      backcolor: string;
      code: string;
      description: string;
      forecolor: string;
      html: string;
      rif1: string;
      rif2: string;
      rif3: string;
      title: string;
    }[];
    companies: string;
    groups: string;
    roles: string;
    tables: string;
    users: [
      {
        email: string;
        nickName: string;
        language: string;
        privacyDate: string;
      }
    ];
  };
  status: string;
} | null;
