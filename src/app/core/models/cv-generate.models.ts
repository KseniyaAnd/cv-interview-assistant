export interface Experience {
  company: string;
  title: string;
  start: string;
  end?: string;
  achievements?: string[];
}

export interface Profile {
  fullName?: string;
  location?: string;
  desiredTitle?: string;
  skills?: string[];
  experience?: Experience[];
  education?: string[];
  languages?: string[];
}

export interface CvGenerateRequest {
  targetCompany: string;
  vacancyTitle?: string;
  vacancyDescription?: string;
  locale?: string;
  profile?: Profile;
}

export interface CvGenerateResponse {
  cvMarkdown?: string;
  coverLetterMarkdown?: string;
  interviewTips?: string[];
}
