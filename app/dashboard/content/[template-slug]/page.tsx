"use client";
import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AIModel";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import ResumePreview from "../_components/ResumePreview";
import dummyResume from "@/app/(data)/dummyResume";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

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
  startDate?: string;
  endDate?: string;
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
  skills?: string;
  projects?: Project[]; // Add this line
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const [loadingFields, setLoadingFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...dummyResume,
    experience: dummyResume.experience || [{}],
    projects: dummyResume.projects || [{}],
    skills: "",
  });

  const { user } = useUser();

  const GenerateAIContent = async (
    formData: any,
    prompt: string,
    field: string
  ) => {
    setLoadingFields((prev) => ({ ...prev, [field]: true }));
    const FinalAIPrompt = JSON.stringify(formData) + ", " + prompt;
    const result = await chatSession.sendMessage(FinalAIPrompt);
    const aiResponse = result.response.text();
    console.log(aiResponse);

    setResumeData((prevData) => {
      if (field.startsWith("experience")) {
        const index = parseInt(field.split("-")[1], 10);
        const newExperience = [...(prevData.experience || [])];
        newExperience[index] = {
          ...newExperience[index],
          workSummary: aiResponse,
        };
        return { ...prevData, experience: newExperience };
      } else if (field.startsWith("education")) {
        const index = parseInt(field.split("-")[1], 10);
        const newEducation = [...(prevData.education || [])];
        newEducation[index] = {
          ...newEducation[index],
          description: aiResponse,
        };
        return { ...prevData, education: newEducation };
      } else if (field.startsWith("project")) {
        const index = parseInt(field.split("-")[1], 10);
        const newProjects = [...(prevData.projects || [])];
        newProjects[index] = {
          ...newProjects[index],
          description: aiResponse,
        };
        return { ...prevData, projects: newProjects };
      } else {
        return { ...prevData, [field]: aiResponse };
      }
    });

    setLoadingFields((prev) => ({ ...prev, [field]: false }));
    await SaveInDb(formData, selectedTemplate?.slug, aiResponse);
  };

  const handleFormChange = (newData: Partial<ResumeData>) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD/MM/yyyy"),
    });
    console.log(result);
  };

  return (
    <div className="p-10">
      <div className="mb-10">
        <Link href={"/dashboard"}>
          <Button className="text-white bg-red-500">
            <ArrowLeft /> Back
          </Button>
        </Link>
        <p className="text-m text-gray-600 mt-5 mb-5">
          You can view all the resumes you have created in the Roast section😀🍵{" "}
          <br /> You can even see other people's resumes and roast them😎
        </p>

        <p className="text-gray-500 italic">
          POV: Your latest changes are shown here. Due to high database costs
          you can't seperately save multiple resumes, but you can download the
          current resume as a pdf and upload it again to start a new resume.
        </p>
        <br />

        <div className="flex flex-col gap-2 bg-gray-100 rounded-sm border-2 border-gray-300 p-5">
          <h2 className="text-lg font-semibold">Instructions📃</h2>
          <p>Add keywords and then click on AI Assist to generate content</p>
          <p>
            Use **text** to make text <span className="font-bold">bold</span>{" "}
            and *text* to make text <span className="italic">italic</span>
          </p>

          <p>Use * at the beginning of a line to create a new bullet point</p>
          <p>
            Delete extra 'education' or 'experience' sections to format the
            spacing correctly
          </p>
          <p>
            Click on the <span className="text-green-500">Download as PDF</span>{" "}
            button to download a pdf version of exactly what you see and click
            on the <span className="text-orange-800">Let Others Roast It</span>{" "}
            button to host it online and make it public
          </p>
          <p>
            <span className="font-bold text-red-500">5 credits</span> are
            deducted for each AI assist and{" "}
            <span className="font-bold text-red-500">10 credits</span> are
            deducted for each upload
          </p>
          <p className="text-gray-500 italic">
            If you have any other{" "}
            <span className="font-bold text-black">questions</span> or have a{" "}
            <span className="font-bold text-black">feature</span> request feel
            free to post on our{" "}
            <a
              href="https://www.reddit.com/r/resume_roasts/"
              target="_blank"
              className="text-orange-600 underline"
            >
              Reddit Community (r/resume_roasts)
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-2">
        <div>
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: any, prompt: string, field: string) =>
              GenerateAIContent(v, prompt, field)
            }
            loadingFields={loadingFields}
            onFormChange={handleFormChange}
            resumeData={resumeData}
          />
        </div>
        <div className="resume-preview-container">
          <ResumePreview
            resumeInfo={resumeData}
            onResumeInfoChange={handleFormChange}
            selectedTemplate={selectedTemplate?.slug || ""} // Provide a default value
          />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
