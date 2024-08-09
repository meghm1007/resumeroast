import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  skills?: Skill[];
}

interface ResumePreviewProps {
  resumeInfo: ResumeData;
  onResumeInfoChange: (newData: Partial<ResumeData>) => void;
}

function ResumePreview({ resumeInfo, onResumeInfoChange }: ResumePreviewProps) {
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

  const handleDownloadPDF = () => {
    const input = document.getElementById("resume");
    if (!input) {
      console.error("Resume element not found");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("my_resume.pdf");
    });
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
      <div className="flex justify-center my-4">
        <label className="mr-2 mt-5">Change Theme Color:</label>
        <input
          type="color"
          value={themeColor}
          onChange={handleColorChange}
          className="border rounded mt-5"
        />
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download as PDF
        </button>
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
          <div className="text-xs">{resumeInfo.summary}</div>
        </div>

        {/* Professional Experience */}
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: themeColor,
            }}
          >
            Professional Experience
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
                {education?.degree}{" "}
                {education?.major && `in ${education.major}`}{" "}
                <span>
                  {education?.startDate || "Start Date"} -{" "}
                  {education?.endDate || "End Date"}
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
              color: themeColor,
            }}
          >
            Skills
          </h2>
          <hr
            style={{
              borderColor: themeColor,
            }}
          />
          <div className="grid grid-cols-2 gap-3 my-4">
            {resumeInfo.skills?.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <h2 className="text-xs">{skill?.name}</h2>
                <div className="h-2 bg-gray-200 w-[120px]">
                  <div
                    className="h-2"
                    style={{
                      backgroundColor: themeColor,
                      width: `${skill?.rating || 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
