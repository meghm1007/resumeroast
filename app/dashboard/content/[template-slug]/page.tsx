"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
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
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import ResumePreview from "../_components/ResumePreview";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { user } = useUser();

  const GenerateAIContent = async (formData: any, prompt: string) => {
    setLoading(true);
    const FinalAIPrompt = JSON.stringify(formData) + ", " + prompt;
    const result = await chatSession.sendMessage(FinalAIPrompt);
    console.log(result.response.text());
    setAiOutput(result?.response.text());
    setLoading(false);
    await SaveInDb(formData, selectedTemplate?.slug, result?.response.text());
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
      <Link href={"/dashboard"}>
        <Button className="">
          {" "}
          <ArrowLeft /> Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-2">
        {/* FormSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any, prompt: string) => GenerateAIContent(v, prompt)}
          loading={loading}
        />
        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;