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

interface Skill {
  id?: number;
  name?: string;
  rating?: number;
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
      <div className="">
        <Link href={"/dashboard"}>
          <Button className="text-white bg-red-500">
            <ArrowLeft /> Back
          </Button>
        </Link>
        <p className="text-m text-gray-600 mt-5 mb-5">
          You can view all the resumes you have created in the Roast section😀🍵{" "}
          <br /> You can even see other people's resumes and roast them😎
        </p>
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
