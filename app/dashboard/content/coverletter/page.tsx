"use client";
import React, { useState } from "react";
import CoverLetterSection from "../_components/CoverLetterSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

function CoverLetterPage() {
  const [coverLetterContent, setCoverLetterContent] = useState("");

  const handleCoverLetterGenerated = (content: string) => {
    setCoverLetterContent(content);
  };

  const handleCoverLetterEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetterContent(e.target.value);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generate Cover Letter</h1>
      <p className="text-sm text-gray-500 mb-4">
        Generate a cover letter based on the job description and your resume.
        Either input keywords about your work or directly export it from your
        resume. Each cover letter will cost{" "}
        <span className="font-bold">5 credits</span>.
      </p>

      {/* Cover Letter Generation Section */}
      <CoverLetterSection onCoverLetterGenerated={handleCoverLetterGenerated} />

      {/* Display and Edit Generated Cover Letter */}
      {coverLetterContent && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Cover Letter</h2>
          <Textarea
            value={coverLetterContent}
            onChange={handleCoverLetterEdit}
            className="w-full p-4 border rounded bg-white min-h-[300px] text-sm font-mono"
            placeholder="Your generated cover letter will appear here. You can edit it directly."
          />
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
        {coverLetterContent && (
          <Button onClick={() => alert("Cover letter saved!")}>
            Save Cover Letter
          </Button>
        )}
      </div>
    </div>
  );
}

export default CoverLetterPage;
