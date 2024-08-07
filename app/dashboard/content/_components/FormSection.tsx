import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (formData: any, prompt: string, field: string) => void;
  loadingFields: { [key: string]: boolean };
  onFormChange: (newData: any) => void;
  resumeData: any;
}

function FormSection({ selectedTemplate, userFormInput, loadingFields, onFormChange, resumeData }: PROPS) {
  const [experienceCount, setExperienceCount] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = event.target;
    if (name.startsWith('experience-') && index !== undefined) {
      const field = name.split('-')[2];
      const newExperience = [...(resumeData.experience || [])];
      newExperience[index] = { ...newExperience[index], [field]: value };
      
      // Remove any empty experience entries
      const filteredExperience = newExperience.filter(exp => 
        exp.title || exp.company || exp.city || exp.state || exp.startDate || exp.endDate || exp.workSummary
      );
      
      onFormChange({ experience: filteredExperience });
      setExperienceCount(filteredExperience.length);
    } else {
      onFormChange({ [name]: value });
    }
  };

  const handleAIButtonClick = (fieldName: string, prompt?: string) => {
    let fieldData = resumeData[fieldName];
    if (fieldName.startsWith('experience-')) {
      const index = parseInt(fieldName.split('-')[1], 10);
      fieldData = resumeData.experience?.[index] || {};
    }
    
    const keywords = Object.values(fieldData).filter(Boolean).join(', ');
    
    if (prompt) {
      userFormInput({ keywords }, prompt, fieldName);
    } else {
      userFormInput({ keywords }, selectedTemplate?.aiPrompt || "", fieldName);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput(resumeData, selectedTemplate?.aiPrompt || "", "fullResume");
  };

  const addExperience = () => {
    setExperienceCount(prev => prev + 1);
    onFormChange({ 
      experience: [...(resumeData.experience || []), {}]
    });
  };

  return (
    <div className="my-5">
      <hr className="mt-5 mb-5" />
      <div className="p-5 shadow-md border rounded-lg bg-white">
        {/*@ts-ignore*/}
        <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
        <h2 className="font-bold text-2xl mb-2 text-primary">
          {selectedTemplate?.name}
        </h2>
        <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>
        <form className="mt-6" onSubmit={onSubmit}>
          {selectedTemplate?.form?.map((item, index) => {
            if (item.name === "experience") {
              return Array.from({ length: experienceCount }).map((_, expIndex) => (
                <div key={expIndex} className="my-2 flex flex-col gap-2 mb-7">
                  <label className="font-bold">{`Experience ${expIndex + 1}`}</label>
                  <Input
                    name={`experience-${expIndex}-title`}
                    required={item.required}
                    onChange={(e) => handleInputChange(e, expIndex)}
                    placeholder="Job Title"
                    value={resumeData.experience?.[expIndex]?.title || ''}
                  />
                  <Input
                    name={`experience-${expIndex}-company`}
                    required={item.required}
                    onChange={(e) => handleInputChange(e, expIndex)}
                    placeholder="Company Name"
                    value={resumeData.experience?.[expIndex]?.company || ''}
                  />
                  <Input
                    name={`experience-${expIndex}-city`}
                    required={item.required}
                    onChange={(e) => handleInputChange(e, expIndex)}
                    placeholder="City"
                    value={resumeData.experience?.[expIndex]?.city || ''}
                  />
                  <Input
                    name={`experience-${expIndex}-state`}
                    required={item.required}
                    onChange={(e) => handleInputChange(e, expIndex)}
                    placeholder="State"
                    value={resumeData.experience?.[expIndex]?.state || ''}
                  />
                  <Input
                    name={`experience-${expIndex}-startDate`}
                    required={item.required}
                    onChange={(e) => handleInputChange(e, expIndex)}
                    placeholder="Start Date"
                    value={resumeData.experience?.[expIndex]?.startDate || ''}
                  />
                  <Input
                    name={`experience-${expIndex}-endDate`}
                    required={item.required}
                    onChange={(e) => handleInputChange(e, expIndex)}
                    placeholder="End Date"
                    value={resumeData.experience?.[expIndex]?.endDate || ''}
                  />
                  <Textarea
                    className="mb-2"
                    maxLength={500}
                    rows={item.placeholder ? 5 : 0.5}
                    placeholder="Work Summary"
                    name={`experience-${expIndex}-workSummary`}
                    required={item.required}
                    onChange={(e) => handleInputChange(e, expIndex)}
                    value={resumeData.experience?.[expIndex]?.workSummary || ''}
                  />
                  <Button
                    disabled={loadingFields[`experience-${expIndex}`]}
                    type="button"
                    className="py-6"
                    onClick={() =>
                      handleAIButtonClick(
                        `experience-${expIndex}`,
                        selectedTemplate?.experiencePrompt
                      )
                    }
                  >
                    {loadingFields[`experience-${expIndex}`] && <Loader2Icon className="animate-spin mr-2" />}
                    AI Assist💫
                  </Button>
                </div>
              ));
            } else {
              return (
                <div key={index} className="my-2 flex flex-col gap-2 mb-7">
                  <label className="font-bold">{item.label}</label>
                  {item.field == "input" ? (
                    <Input
                      name={item.name}
                      required={item?.required}
                      onChange={handleInputChange}
                      placeholder={item.placeholder?.toString()}
                      value={resumeData[item.name] || ''}
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
                        value={resumeData[item.name] || ''}
                      />
                      <Button
                        disabled={loadingFields[item.name]}
                        type="button"
                        className="py-6"
                        onClick={() =>
                          handleAIButtonClick(
                            item.name,
                            item.name === "summary"
                              ? selectedTemplate?.summaryPrompt
                              : item.name === "education"
                              ? selectedTemplate?.educationPrompt
                              : undefined
                          )
                        }
                      >
                        {loadingFields[item.name] && <Loader2Icon className="animate-spin mr-2" />}
                        AI Assist💫
                      </Button>
                    </div>
                  ) : null}
                </div>
              );
            }
          })}
          <Button type="button" onClick={addExperience} className="mb-4">
            Add Experience
          </Button>
          <Button
            disabled={Object.values(loadingFields).some(Boolean)}
            type="submit"
            className="w-full font-bold bg-amber-600 py-6"
          >
            {Object.values(loadingFields).some(Boolean) && <Loader2Icon className="animate-spin mr-2" />}
            GENERATE RESUME🤖
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormSection;