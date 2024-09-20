import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { chatSession } from "@/utils/AIModel";

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

  const handleGenerate = async () => {
    if (!jobDescription) {
      alert("Please enter the job description.");
      return;
    }

    setIsGenerating(true);
    try {
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
      onCoverLetterGenerated(aiResponse);
    } catch (error) {
      console.error("Error generating cover letter:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Cover Letter Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Job Description</label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={5}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Education Summary</label>
          <Textarea
            value={educationSummary}
            onChange={(e) => setEducationSummary(e.target.value)}
            placeholder="Briefly describe your education..."
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Projects Summary</label>
          <Textarea
            value={projectsSummary}
            onChange={(e) => setProjectsSummary(e.target.value)}
            placeholder="Briefly describe your projects..."
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Experience Summary</label>
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
        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
          {isGenerating ? "Generating..." : "Generate Cover Letter"}
        </Button>
      </div>
    </div>
  );
}

export default CoverLetterSection;