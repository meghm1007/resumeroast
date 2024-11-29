"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/utils/db";
import { CoverLetters, Resumes, userResume } from "@/utils/schema";
import { eq } from "drizzle-orm";

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

interface Resume {
  id: number;
  uniqueId: string;
  createdBy: string | null;
  createdAt: string | null;
  firstName: string | null;
  lastName: string | null;
  designation: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  summary: string | null;
  designation1: string | null;
  companyName1: string | null;
  city1: string | null;
  state1: string | null;
  startDate1: string | null;
  endDate1: string | null;
  description1: string | null;
  designation2: string | null;
  companyName2: string | null;
  city2: string | null;
  state2: string | null;
  startDate2: string | null;
  endDate2: string | null;
  description2: string | null;
  designation3: string | null;
  companyName3: string | null;
  city3: string | null;
  state3: string | null;
  startDate3: string | null;
  endDate3: string | null;
  description3: string | null;
  designation4: string | null;
  companyName4: string | null;
  city4: string | null;
  state4: string | null;
  startDate4: string | null;
  endDate4: string | null;
  description4: string | null;
  schoolName1: string | null;
  degree1: string | null;
  startDateEdu1: string | null;
  endDateEdu1: string | null;
  descriptionEdu1: string | null;
  schoolName2: string | null;
  degree2: string | null;
  startDateEdu2: string | null;
  endDateEdu2: string | null;
  descriptionEdu2: string | null;
  schoolName3: string | null;
  degree3: string | null;
  startDateEdu3: string | null;
  endDateEdu3: string | null;
  descriptionEdu3: string | null;
  schoolName4: string | null;
  degree4: string | null;
  startDateEdu4: string | null;
  endDateEdu4: string | null;
  descriptionEdu4: string | null;
  projectName1: string | null;
  projectDescription1: string | null;
  projectName2: string | null;
  projectDescription2: string | null;
  projectName3: string | null;
  projectDescription3: string | null;
  projectName4: string | null;
  projectDescription4: string | null;
  skills: string | null;
}

interface Experience {
  title?: string;
  company?: string;
  city?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  workSummary?: string;
}

interface Education {
  universityName?: string;
  degree?: string;
  major?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface Project {
  title?: string;
  description?: string;
}

const formatText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .split("\n")
    .map((line, index) =>
      line.startsWith("* ")
        ? `<li key=${index}>${line.slice(2)}</li>`
        : `<p key=${index}>${line}</p>`
    )
    .join("");
};

export default function ViewContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "resume" or "coverletter"
  const id = searchParams.get("id");

  const [document, setDocument] = useState<CoverLetter | Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id || !type) {
        setLoading(false);
        return;
      }

      try {
        if (type === "coverletter") {
          const result = await db
            .select()
            .from(CoverLetters)
            .where(eq(CoverLetters.id, parseInt(id)));

          if (result.length > 0) {
            setDocument(result[0]);
          }
        } else if (type === "resume") {
          const result = await db
            .select()
            .from(userResume)
            .where(eq(userResume.uniqueId, id));

          if (result.length > 0) {
            setDocument(result[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id, type]);

  if (loading) {
    return (
      <div className="p-6">
        <h3 className="text-xl">Loading preview...</h3>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="p-6">
        <h3 className="text-xl text-red-500">Document not found</h3>
      </div>
    );
  }

  if (type === "coverletter") {
    const coverLetter = document as CoverLetter;
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Cover Letter Preview</h1>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {coverLetter.jobDescription}
            </p>
          </div>

          {coverLetter.content && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Generated Content</h2>
              <div className="prose max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: coverLetter.content }}
                  className="text-gray-700 whitespace-pre-wrap"
                />
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 mt-4">
            Created:{" "}
            {new Date(coverLetter.createdAt || "").toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  }

  // Resume preview
  const resume = document as Resume;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div id="resume" className="mt-8 border-t-[20px] border-black">
          {/* Personal Details */}
          <div>
            <h2 className="font-bold text-xl text-center">
              {resume.firstName} {resume.lastName}
            </h2>
            <h2 className="text-center text-sm font-medium">
              {resume.designation}
            </h2>
            <h2 className="text-center font-normal text-xs">
              {resume.address}
            </h2>
            <div className="flex justify-between">
              <h2 className="font-normal text-xs">{resume.phone}</h2>
              <h2 className="font-normal text-xs">{resume.email}</h2>
            </div>
            <hr className="border-[1.5px] my-2 border-black" />
          </div>

          {/* Summary */}
          {resume.summary && (
            <div className="my-4">
              <h2 className="text-center font-bold text-sm mb-2">Summary</h2>
              <div
                className="text-xs"
                dangerouslySetInnerHTML={{
                  __html: formatText(resume.summary),
                }}
              />
            </div>
          )}

          {/* Experience */}
          <div className="my-6">
            <h2 className="text-center font-bold text-sm mb-2">Experience</h2>
            <hr className="border-black" />
            {[1, 2, 3, 4].map((i) => {
              const designation = resume[`designation${i}` as keyof Resume];
              const company = resume[`companyName${i}` as keyof Resume];
              const city = resume[`city${i}` as keyof Resume];
              const state = resume[`state${i}` as keyof Resume];
              const startDate = resume[`startDate${i}` as keyof Resume];
              const endDate = resume[`endDate${i}` as keyof Resume];
              const description = resume[`description${i}` as keyof Resume];

              if (!designation && !company) return null;

              return (
                <div key={i} className="my-5">
                  <h2 className="text-sm font-bold">{designation}</h2>
                  <h2 className="text-xs flex justify-between">
                    {company}, {city}, {state}
                    <span>
                      {startDate} - {endDate}
                    </span>
                  </h2>
                  {description && (
                    <div
                      className="text-xs my-2"
                      dangerouslySetInnerHTML={{
                        __html: formatText(description as string),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Education */}
          <div className="my-6">
            <h2 className="text-center font-bold text-sm mb-2">Education</h2>
            <hr className="border-black" />
            {[1, 2, 3, 4].map((i) => {
              const school = resume[`schoolName${i}` as keyof Resume];
              const degree = resume[`degree${i}` as keyof Resume];
              const startDate = resume[`startDateEdu${i}` as keyof Resume];
              const endDate = resume[`endDateEdu${i}` as keyof Resume];
              const description = resume[`descriptionEdu${i}` as keyof Resume];

              if (!school && !degree) return null;

              return (
                <div key={i} className="my-5">
                  <h2 className="text-sm font-bold">{school}</h2>
                  <div className="text-xs flex justify-between">
                    <span>{degree}</span>
                    <span>
                      {startDate} - {endDate}
                    </span>
                  </div>
                  {description && (
                    <div
                      className="text-xs my-2"
                      dangerouslySetInnerHTML={{
                        __html: formatText(description as string),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Projects */}
          <div className="my-6">
            <h2 className="text-center font-bold text-sm mb-2">Projects</h2>
            <hr className="border-black" />
            {[1, 2, 3, 4].map((i) => {
              const name = resume[`projectName${i}` as keyof Resume];
              const description =
                resume[`projectDescription${i}` as keyof Resume];

              if (!name) return null;

              return (
                <div key={i} className="my-5">
                  <h2 className="text-sm font-bold">{name}</h2>
                  {description && (
                    <div
                      className="text-xs my-2"
                      dangerouslySetInnerHTML={{
                        __html: formatText(description as string),
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Skills */}
          {resume.skills && (
            <div className="my-6">
              <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
              <hr className="border-black" />
              <div className="my-5">
                <p className="text-xs">{resume.skills}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500 mt-4">
          Created: {new Date(resume.createdAt || "").toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
