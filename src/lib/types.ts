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
      linkType:string;
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
        auth2: string;
        description: string;
        email: string;
        nickName: string;
        language: string;
        privacyDate: string;
        phone: string;
        phone2: string;
        phoneCell: string;
        darkLight: string;
      }
    ];
  };
  status: string;
} | null;
