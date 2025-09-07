export type Header = {
  name: string;
  city?: string;
  state?: string;
  zip?: string;
  phone: string;
  email: string;
  socials?: string[];
  summary?: string;
};

export type Education = {
  _id?: string;
  active?: boolean;
  school: string;
  degree: string;
  gradDate: string;
  location: string;
  gpa?: number;
  coursework?: string[];
  involvement?: string[];
  leadership?: string[];
};

export type Experience = {
  _id?: string;  
  active?: boolean;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  bullets?: string[];
};

export type Projects = {
  _id?: string;
  active?: boolean;
  title: string;
  link?: string;
  stack?: string[];
  bullets?: string[];
};

export type Certificates = {
  _id?: string;
  active?: boolean;
  title: string;
  organization: string;
  endDate: string;
};

export type Skills = {
  _id?: string;
  languages?: string[];
  technical?: string[];
  web?: string[];
  other?: string[];
  interests?: string[];
};

export type Letter = {
  manager?: string;
  company: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  position?: string;
  salutation?: string;
  body?: string[];
  closingText?: string;
};

export type PDFData = {
  resumeName?: string;
  letterName?: string;
  header: Header;
  education?: Education[];
  experience?: Experience[];
  projects?: Projects[];
  certificates?: Certificates[];
  skills?: Skills;
  letter?: Letter;
};

type SocialList = {
  title: string;
  link: string;
  active: boolean
}



