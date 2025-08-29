export type Header = {
  name: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  phone: string;
  email: string;
  socials?: string[];
  summary?: string;
};

export type Education = {
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
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  bullets?: string[];
};

export type Projects = {
  title: string;
  link?: string;
  stack?: string[];
  bullets?: string[];
};

export type Certificates = {
  title: string;
  organization: string;
  endDate: string;
};

export type Skills = {
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



