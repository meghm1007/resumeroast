import React, { useContext, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { chatSession } from "@/utils/AIModel";
import { User } from "@/utils/schema";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/utils/db";
import { CoverLetters } from "@/utils/schema";
import toast from "react-hot-toast";
import { eq } from "drizzle-orm";

interface CoverLetterProps {
  onCoverLetterGenerated: (content: string) => void;
}

function CoverLetterSection({ onCoverLetterGenerated }: CoverLetterProps) {
  const { user } = useUser();
  const [jobDescription, setJobDescription] = useState("");
  const [educationSummary, setEducationSummary] = useState("");
  const [projectsSummary, setProjectsSummary] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    if (userDetail?.credits && userDetail.credits <= 5) {
      toast.custom(
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="w-6 h-6 mr-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="font-bold">Low Credits Warning</p>
              <p>You have {userDetail.credits} credits remaining. Consider purchasing more credits to continue using our services.</p>
            </div>
          </div>
        </div>,
        {
          duration: 5000,
          position: 'top-center',
        }
      );
    }
  }, [userDetail?.credits]);

  const updateUserCredit = async () => {
    if (!userDetail?.credits) {
      return;
    }

    const result = await db
      .update(User)
      .set({
        credits: userDetail.credits - 1,
      })
      .where(eq(User.id, userDetail.id))
      .returning({ id: User.id });

    if (result) {
      setUserDetail({ ...userDetail, credits: userDetail.credits - 1 });
      return result[0].id;
    }
  };

  const handleGenerate = async () => {
    if (!jobDescription) {
      toast.error("Please enter the job description.");
      return;
    }

    if (!userDetail?.credits || userDetail.credits <= 0) {
      toast.error("Not enough credits! Please purchase more credits.");
      return;
    }

    setIsGenerating(true);
    try {
      const updated = await updateUserCredit();
      if (!updated) {
        toast.error("Failed to update credits");
        return;
      }

      const prompt = `
        Based on the following job description and my summaries, generate a professional cover letter.

        Job Description:
        ${jobDescription}

        Education Summary:
        ${educationSummary}

        Projects Summary:
        ${projectsSummary}

        Experience Summary:
        ${experienceSummary}
      `;
      const result = await chatSession.sendMessage(prompt);
      const aiResponse = await result.response.text();

      const savedCoverLetter = await db
        .insert(CoverLetters)
        .values({
          jobDescription,
          educationSummary,
          projectsSummary,
          experienceSummary,
          content: aiResponse,
          createdBy: userDetail.id,
          createdAt: new Date().toISOString(),
        })
        .returning();

      if (savedCoverLetter) {
        onCoverLetterGenerated(aiResponse);
        toast.success("Cover letter generated and saved successfully!");
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast.error("Error generating cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Cover Letter Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Job Description
          </label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={5}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Education Summary
          </label>
          <Textarea
            value={educationSummary}
            onChange={(e) => setEducationSummary(e.target.value)}
            placeholder="Briefly describe your education..."
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Projects Summary
          </label>
          <Textarea
            value={projectsSummary}
            onChange={(e) => setProjectsSummary(e.target.value)}
            placeholder="Briefly describe your projects..."
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Experience Summary
          </label>
          <Textarea
            value={experienceSummary}
            onChange={(e) => setExperienceSummary(e.target.value)}
            placeholder="Briefly describe your experience..."
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="mt-6">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !userDetail?.credits || userDetail.credits < 5}
          className="w-full"
        >
          {isGenerating ? (
            "Generating..."
          ) : !userDetail?.credits || userDetail.credits < 5 ? (
            "Insufficient Credits (5 Required)"
          ) : (
            `Generate Cover Letter (${userDetail.credits} credits remaining)`
          )}
        </Button>
      </div>
    </div>
  );
}

export default CoverLetterSection;
