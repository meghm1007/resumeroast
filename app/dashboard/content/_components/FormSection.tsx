"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import AIResumeInfo from "./AIResumeInfo";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>({});
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAIButtonClick = (fieldName: string, prompt?: string) => {
    if (prompt) {
      userFormInput({ [fieldName]: formData[fieldName] }, prompt);
    } else {
      // Fallback to default prompt if no specific prompt is provided
      userFormInput(
        { [fieldName]: formData[fieldName] },
        selectedTemplate?.aiPrompt
      );
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData, selectedTemplate?.aiPrompt);
  };

  return (
    <div className="my-5">
      {/* <AIResumeInfo /> */}
      <hr className="mt-5 mb-5" />
      <div className="p-5 shadow-md border rounded-lg bg-white">
        {/*@ts-ignore*/}
        <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
        <h2 className="font-bold text-2xl mb-2 text-primary">
          {selectedTemplate?.name}
        </h2>
        <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>
        <form className="mt-6" onSubmit={onSubmit}>
          {selectedTemplate?.form?.map((item, index) => (
            <div key={index} className="my-2 flex flex-col gap-2 mb-7">
              <label className="font-bold">{item.label}</label>
              {item.field == "input" ? (
                <Input
                  name={item.name}
                  required={item?.required}
                  onChange={handleInputChange}
                  placeholder={item.placeholder?.toString()}
                />
              ) : item.field == "textarea" && item.aiButton ? (
                <div>
                  <Textarea
                    className="mb-2"
                    maxLength={500}
                    rows={item.placeholder ? 5 : 0.5}
                    placeholder={item.placeholder?.toString()}
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                  />
                  <Button
                    disabled={loading}
                    type="button"
                    className="py-6"
                    onClick={() =>
                      handleAIButtonClick(
                        item.name,
                        item.name === "experience"
                          ? selectedTemplate?.experiencePrompt
                          : item.name === "education"
                          ? selectedTemplate?.educationPrompt
                          : item.name === "summary"
                          ? selectedTemplate?.summaryPrompt
                          : undefined
                      )
                    }
                  >
                    {loading && <Loader2Icon className="animate-spin" />}
                    AI Assist💫
                  </Button>
                </div>
              ) : null}
            </div>
          ))}
          <Button
            disabled={loading}
            type="submit"
            className="w-full font-bold bg-amber-600 py-6"
          >
            {loading && <Loader2Icon className="animate-spin" />}
            GENERATE RESUME🤖
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormSection;
