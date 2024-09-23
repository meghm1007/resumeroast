import React, { createContext, useState } from "react";
import { Skills } from "../types/types";
export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: string;
  }>;
  skills: string;
}

const initialResumeData: ResumeData = {
  personalInfo: { firstName: "", lastName: "", email: "", phone: "", address: "" },
  summary: "",
  experience: [{ title: "", company: "", location: "", startDate: "", endDate: "", description: "" }],
  education: [{ school: "", degree: "", fieldOfStudy: "", graduationDate: "" }],
  skills: "",
};

export const ResumeContext = createContext<{
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}>({
  resumeData: initialResumeData,
  setResumeData: () => {},
});

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};