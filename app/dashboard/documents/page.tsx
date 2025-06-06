"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { CoverLetters, userResume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

// Define the type for our cover letter
interface CoverLetter {
  id: number;
  content: string | null;
  jobDescription: string;
  educationSummary: string | null;
  projectsSummary: string | null;
  experienceSummary: string | null;
  createdBy: string | null;
  createdAt: string | null;
}

// Add Resume interface based on the schema
interface Resume {
  id: number;
  uniqueId: string;
  createdBy: string | null;
  createdAt: string | null;
  firstName: string | null;
  lastName: string | null;
  designation: string | null;
  // Add other fields as needed for display
}

async function getCoverLetters(userEmail: string) {
  try {
    const coverLetters = await db
      .select()
      .from(CoverLetters)
      .where(eq(CoverLetters.createdBy, userEmail));

    return coverLetters;
  } catch (error) {
    console.error("Error fetching cover letters:", error);
    return [];
  }
}

async function getResumes(userEmail: string) {
  try {
    const resumes = await db
      .select()
      .from(userResume)
      .where(eq(userResume.createdBy, userEmail));

    return resumes;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }
}

export default function MyDocuments() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [coverLetters, setCoverLetters] = React.useState<CoverLetter[]>([]);
  const [resumes, setResumes] = React.useState<Resume[]>([]);

  React.useEffect(() => {
    if (userEmail) {
      getCoverLetters(userEmail).then(setCoverLetters);
      getResumes(userEmail).then(setResumes);
    }
  }, [userEmail]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">My Documents</h1>
      <p className="text-gray-500 mb-6">
        Your latest cover letters and resumes are shown here. Changes in your
        cover letter and resume replace the previous version. Be sure to save
        your resume by clicking on{" "}
        <span className="font-bold">Let Others Roast It!</span> which stores
        your resume on the cloud and makes it visible to everyone on the
        internet
      </p>
      <h1 className="text-2xl font-bold mb-6">My Cover Letters</h1>

      {coverLetters.length === 0 ? (
        <p>No cover letters found. Create your first one!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coverLetters.map((letter) => (
            <Link
              href={`/dashboard/view?type=coverletter&id=${letter.id}`}
              key={letter.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="font-semibold mb-2">Job Description:</h2>
              <p className="text-sm text-gray-600 mb-4">
                {letter.jobDescription.substring(0, 150)}...
              </p>
              <div className="text-sm text-gray-500">
                Created: {new Date(letter.createdAt || "").toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-6">My Resumes</h1>
        {resumes.length === 0 ? (
          <p>No resumes found. Create your first one!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Link
                href={`/dashboard/view?type=resume&id=${resume.uniqueId}`}
                key={resume.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="font-semibold mb-2">
                  {resume.firstName} {resume.lastName}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {resume.designation || "No designation"}
                </p>
                <div className="text-sm text-gray-500">
                  Created:{" "}
                  {new Date(resume.createdAt || "").toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
