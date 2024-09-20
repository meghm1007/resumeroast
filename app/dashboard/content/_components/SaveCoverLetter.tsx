import { db } from "@/utils/db";
import { CoverLetters } from "@/utils/schema";


export const saveCoverLetter = async (coverLetter: {
  jobDescription: string;
  educationSummary: string;
  projectsSummary: string;
  experienceSummary: string;
  content: string;
  createdBy: string;
  createdAt: string;
}) => {
  const result = await db.insert(CoverLetters).values(coverLetter);
  return result;
};