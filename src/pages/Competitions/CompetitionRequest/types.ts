export interface CompetitionRequestData1 {
  role: 'PARTICIPANT' | 'JUDGE' | 'SPECTATOR' | 'SPONSOR';
  type: string;
  direction: string;
  country: string;
  region?: string;
  city: string;
}

export interface CompetitionRequestData2 {
  secondName: string;
  firstName: string;
  thirdName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
}

export interface CompetitionRequestData3 {
  file: string;
  socialLink: string;
  about: string;
}

export type CompetitionRequestData = CompetitionRequestData1 & CompetitionRequestData2 & CompetitionRequestData3;
