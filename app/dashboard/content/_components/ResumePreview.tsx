import dummyResume from "@/app/(data)/dummyResume";
import React, { useState } from "react";

function ResumePreview() {
  const [resumeInfo, setResumeInfo] = useState(dummyResume);
  return (
    <div
      className="mt-8 shadow-lg p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Details */}
      <div>
        <h2
          className="font-bold text-xl text-center"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h2>
        <h2 className="text-center text-sm font-medium">
          {resumeInfo?.jobTitle}
        </h2>
        <h2
          className="text-center font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.address}
        </h2>
        <div className="flex justify-between">
          <h2
            className="font-normal text-xs"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {resumeInfo?.phone}
          </h2>
          <h2
            className="font-normal text-xs"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {resumeInfo?.email}
          </h2>
        </div>
        <hr
          className="border-[1.5px] my-2"
          style={{
            borderColor: resumeInfo?.themeColor,
          }}
        />
      </div>

      {/* Summary */}
      <p className="text-xs">{resumeInfo.summary}</p>
      {/* Professional Experience */}
      <div className="my-6">
        <h2
          className="text-center font-bold text-sm mb-2"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          Professional Experience
        </h2>
        <hr
          style={{
            borderColor: resumeInfo?.themeColor,
          }}
        />
        {resumeInfo?.experience.map((experience, index) => (
          <div key={index} className="my-5">
            <h2
              className="text-sm font-bold"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              {experience?.title}
            </h2>
            <h2 className="text-xs flex justify-between">
              {experience?.company}, {experience.city}, {experience.state}{" "}
              <span>
                {experience?.startDate}{" "}
                {experience?.currentlyWorking
                  ? " - Present"
                  : ` - ${experience?.endDate}`}
              </span>
            </h2>
            <p className="text-xs my-2">{experience.workSummary}</p>
          </div>
        ))}
      </div>
      {/*Educational */}
      <div className="my-6">
        <h2
          className="text-center font-bold text-sm mb-2"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          Education
        </h2>
        <hr
          style={{
            borderColor: resumeInfo?.themeColor,
          }}
        />
        {resumeInfo?.education.map((education, index) => (
          <div key={index} className="my-5">
            <h2
              className="text-sm font-bold"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              {education.universityName}
            </h2>
            <h2 className="text-xs flex justify-between">
              {education?.degree} in {education?.major}{" "}
              <span>
                {education?.startDate} - {education?.endDate}
              </span>
            </h2>
            <p className="text-xs my-2">{education?.description}</p>
          </div>
        ))}
      </div>
      {/* Skills */}
      <div className="my-6">
        <h2
          className="text-center font-bold text-sm mb-2"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          Skills
        </h2>
        <hr
          style={{
            borderColor: resumeInfo?.themeColor,
          }}
        />
        <div className="grid grid-cols-2 gap-3 my-4">
          {resumeInfo?.skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <h2 className="text-xs">{skill.name}</h2>
              <div className="h-2 bg-gray-200 w-[120px]">
                <div
                  className="h-2"
                  style={{
                    backgroundColor: resumeInfo?.themeColor,
                    width: skill?.rating + "%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
