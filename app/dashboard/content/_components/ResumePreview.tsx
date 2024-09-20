import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GiCoffeeCup } from "react-icons/gi";
import { FaFileDownload } from "react-icons/fa";

interface Experience {
  id?: number;
  title?: string;
  company?: string;
  city?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  workSummary?: string;
}

interface Skills {
  codeConcepts: string[];
  technologiesFrameworks: string[];
}

interface Education {
  id?: number;
  universityName?: string;
  degree?: string;
  major?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface Project {
  id?: number;
  title?: string;
  description?: string;
}

interface Skill {
  id?: number;
  name?: string;
  rating?: number;
}

interface ResumeData {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  summary?: string;
  themeColor?: string;
  experience?: Experience[];
  education?: Education[];
  projects?: Project[];
  skills?: Skills;
}

interface ResumePreviewProps {
  resumeInfo: ResumeData;
  onResumeInfoChange: (newData: Partial<ResumeData>) => void;
  selectedTemplate: string;
}

function ResumePreview({
  resumeInfo,
  onResumeInfoChange,
  selectedTemplate,
}: ResumePreviewProps) {
  const [themeColor, setThemeColor] = useState(
    resumeInfo.themeColor || "#000000"
  );

  useEffect(() => {
    setThemeColor(resumeInfo.themeColor || "#000000");
  }, [resumeInfo.themeColor]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setThemeColor(newColor);
    onResumeInfoChange({ themeColor: newColor });
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  const handleDownloadPDF = async () => {
    const printContents = document.getElementById("resume")?.innerHTML;
    const originalContents = document.body.innerHTML;
    if (printContents) {
      try {
        // Download as PDF
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
      } catch (error) {
        console.error("Error saving resume:", error);
      }
    } else {
      console.error("Resume element not found");
    }
  };

  const handleSaveResumeToDatabase = async () => {
    const printContents = document.getElementById("resume")?.innerHTML;
    const originalContents = document.body.innerHTML;

    const userName = `${resumeInfo.firstName}${resumeInfo.lastName}`
      .toLowerCase()
      .replace(/\s+/g, "");
    const uniqueId = `${userName}-${Date.now()}`;

    if (printContents) {
      try {
        // Save the resume content to the database
        const response = await fetch("/api/resumes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uniqueId,
            content: printContents,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save resume");
        }

        // Open the resume in a new tab
        window.open(`/roast/${uniqueId}`, "_blank");
      } catch (error) {
        console.error("Error saving resume:", error);
      }
    } else {
      console.error("Resume element not found");
    }
  };

  const isExperienceEmpty = (exp: Experience) => {
    return (
      !exp?.title &&
      !exp?.company &&
      !exp?.city &&
      !exp?.state &&
      !exp?.workSummary
    );
  };

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

  return (
    <div>
      <div className="flex grid-cols-2 gap-3">
        <div className="flex justify-center my-4">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            <span className="flex grid-cols-2 items-center">
              Download as PDF
              <FaFileDownload className="text-xl" />
            </span>
          </button>
        </div>
        <div className="flex justify-center my-4">
          <button
            onClick={handleSaveResumeToDatabase}
            className="px-4 py-2 bg-amber-600 text-white rounded"
          >
            <span className="flex grid-cols-2 items-center">
              Let Others Roast It
              <GiCoffeeCup className="text-xl" />
            </span>
          </button>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <label className="mr-2 mt-5">Change Theme Color:</label>
        <input
          type="color"
          value={themeColor}
          onChange={handleColorChange}
          className="border rounded mt-5"
        />
      </div>
      <div
        id="resume"
        className="mt-8 shadow-lg p-14 border-t-[20px]"
        style={{
          borderColor: themeColor,
        }}
      >
        {/* Personal Details */}
        <div>
          <h2
            className="font-bold text-xl text-center"
            style={{
              color: themeColor,
            }}
          >
            {resumeInfo.firstName} {resumeInfo.lastName}
          </h2>
          <h2 className="text-center text-sm font-medium">
            {resumeInfo.jobTitle}
          </h2>
          <h2
            className="text-center font-normal text-xs"
            style={{
              color: themeColor,
            }}
          >
            {resumeInfo.address}
          </h2>
          <div className="flex justify-between">
            <h2
              className="font-normal text-xs"
              style={{
                color: themeColor,
              }}
            >
              {resumeInfo.phone}
            </h2>
            <h2
              className="font-normal text-xs"
              style={{
                color: themeColor,
              }}
            >
              {resumeInfo.email}
            </h2>
          </div>
          <hr
            className="border-[1.5px] my-2"
            style={{
              borderColor: themeColor,
            }}
          />
        </div>

        {/* Summary */}
        <div className="my-4">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: themeColor }}
          >
            Summary
          </h2>
          <div
            className="text-xs"
            dangerouslySetInnerHTML={{
              __html: formatText(resumeInfo.summary || ""),
            }}
          />
        </div>

        {/* Professional Experience */}
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: themeColor,
            }}
          >
            Experience
          </h2>
          <hr
            style={{
              borderColor: themeColor,
            }}
          />
          {resumeInfo.experience
            ?.filter((exp) => !isExperienceEmpty(exp))
            .map((experience, index) => (
              <div key={index} className="my-5">
                <h2
                  className="text-sm font-bold"
                  style={{
                    color: themeColor,
                  }}
                >
                  {experience?.title || "Position"}
                </h2>
                <h2 className="text-xs flex justify-between">
                  {experience?.company || "Company"},{" "}
                  {experience?.city || "City"}, {experience?.state || "State"}{" "}
                  <span>
                    {experience?.startDate || "Start Date"} -{" "}
                    {experience?.currentlyWorking
                      ? "Present"
                      : experience?.endDate || "End Date"}
                  </span>
                </h2>
                <div
                  className="text-xs my-2"
                  dangerouslySetInnerHTML={{
                    __html: formatText(experience?.workSummary || ""),
                  }}
                />
              </div>
            ))}
        </div>

        {/* Education */}
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: themeColor,
            }}
          >
            Education
          </h2>
          <hr
            style={{
              borderColor: themeColor,
            }}
          />
          {resumeInfo.education?.map((education, index) => (
            <div key={index} className="my-5">
              <h2
                className="text-sm font-bold"
                style={{
                  color: themeColor,
                }}
              >
                {education?.universityName}
              </h2>
              <h2 className="text-xs flex justify-between">
                {education?.degree}
                {education?.major && `in ${education.major}`}
                <span>
                  {education?.startDate || ""}
                  {education?.endDate || ""}
                </span>
              </h2>
              <div
                className="text-xs my-2"
                dangerouslySetInnerHTML={{
                  __html: formatText(education?.description || ""),
                }}
              />
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: themeColor,
            }}
          >
            Projects
          </h2>
          <hr
            style={{
              borderColor: themeColor,
            }}
          />
          {resumeInfo.projects?.map((project, index) => (
            <div key={index} className="my-5">
              <h2
                className="text-sm font-bold"
                style={{
                  color: themeColor,
                }}
              >
                {project?.title}
              </h2>
              <div
                className="text-xs my-2"
                dangerouslySetInnerHTML={{
                  __html: formatText(project?.description || ""),
                }}
              />
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: resumeInfo.themeColor,
            }}
          >
            Skills
          </h2>
          <hr
            style={{
              borderColor: resumeInfo.themeColor,
            }}
          />
          {resumeInfo.skills && (
            <div className="my-5">
              <h3
                className="text-xs font-bold"
                style={{ color: resumeInfo.themeColor }}
              >
                Code/Concepts
              </h3>
              <p className="text-xs">
                {resumeInfo.skills.codeConcepts.join(", ") || "N/A"}
              </p>
              <h3
                className="text-xs font-bold mt-3"
                style={{ color: resumeInfo.themeColor }}
              >
                Technologies/Frameworks
              </h3>
              <p className="text-xs">
                {resumeInfo.skills.technologiesFrameworks.join(", ") || "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
