import React, { createContext, Dispatch, SetStateAction } from "react";

interface ResumeInfo {
  // Define your resume info structure here
  // For example:
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  // ... other fields
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo;
  setResumeInfo: Dispatch<SetStateAction<ResumeInfo>>;
}

export const ResumeInfoContext = createContext<ResumeInfoContextType | null>(
  null
);
