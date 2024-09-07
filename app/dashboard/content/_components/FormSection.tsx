import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon, Trash2 } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (formData: any, prompt: string, field: string) => void;
  loadingFields: { [key: string]: boolean };
  onFormChange: (newData: any) => void;
  resumeData: any;
}

const sections = ["PersonalInfo", "Experience", "Education", "Projects"];

function FormSection({
  selectedTemplate,
  userFormInput,
  loadingFields,
  onFormChange,
  resumeData,
}: PROPS) {
  const [currentSection, setCurrentSection] = useState(0);
  const [experienceCount, setExperienceCount] = useState(1);
  const [educationCount, setEducationCount] = useState(1);
  const [projectCount, setProjectCount] = useState(1);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    section?: string
  ) => {
    const { name, value } = event.target;
    if (section === "experience" && index !== undefined) {
      const field = name.split("-")[2];
      const newExperience = [
        ...(resumeData.experience || Array(experienceCount).fill({})),
      ];
      newExperience[index] = { ...newExperience[index], [field]: value };
      onFormChange({ experience: newExperience });
    } else if (section === "education" && index !== undefined) {
      const field = name.split("-")[2];
      const newEducation = [
        ...(resumeData.education || Array(educationCount).fill({})),
      ];
      newEducation[index] = { ...newEducation[index], [field]: value };
      onFormChange({ education: newEducation });
    } else if (section === "project" && index !== undefined) {
      const field = name.split("-")[2];
      const newProjects = [
        ...(resumeData.projects || Array(projectCount).fill({})),
      ];
      newProjects[index] = { ...newProjects[index], [field]: value };
      onFormChange({ projects: newProjects });
    } else {
      onFormChange({ [name]: value });
    }
  };

  const handleAIButtonClick = (fieldName: string, prompt?: string) => {
    let fieldData = resumeData[fieldName];
    if (fieldName.startsWith("experience-")) {
      const index = parseInt(fieldName.split("-")[1], 10);
      fieldData = resumeData.experience?.[index] || {};
    } else if (fieldName.startsWith("education-")) {
      const index = parseInt(fieldName.split("-")[1], 10);
      fieldData = resumeData.education?.[index] || {};
    } else if (fieldName.startsWith("project-")) {
      const index = parseInt(fieldName.split("-")[1], 10);
      fieldData = resumeData.projects?.[index] || {};
    }

    const keywords = Object.values(fieldData).filter(Boolean).join(", ");

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
    if (experienceCount < 4) {
      setExperienceCount((prev) => prev + 1);
      onFormChange({
        experience: [...(resumeData.experience || []), {}],
      });
    }
  };

  const addEducation = () => {
    if (educationCount < 4) {
      setEducationCount((prev) => prev + 1);
      onFormChange({
        education: [...(resumeData.education || []), {}],
      });
    }
  };

  const addProject = () => {
    if (projectCount < 4) {
      setProjectCount((prev) => prev + 1);
      onFormChange({
        projects: [...(resumeData.projects || []), {}],
      });
    }
  };

  const removeSection = (index: number, section: string) => {
    if (section === "experience") {
      const newExperience = [...(resumeData.experience || [])];
      newExperience.splice(index, 1);
      setExperienceCount((prev) => prev - 1);
      onFormChange({ experience: newExperience });
    } else if (section === "education") {
      const newEducation = [...(resumeData.education || [])];
      newEducation.splice(index, 1);
      setEducationCount((prev) => prev - 1);
      onFormChange({ education: newEducation });
    } else if (section === "projects") {
      const newProjects = [...(resumeData.projects || [])];
      newProjects.splice(index, 1);
      setProjectCount((prev) => prev - 1);
      onFormChange({ projects: newProjects });
    }
  };

  const renderSection = () => {
    switch (sections[currentSection]) {
      case "PersonalInfo":
        return (
          <div>
            <h2 className="font-bold text-2xl mb-2 text-primary">
              Personal Information
            </h2>
            <Input
              name="firstName"
              onChange={handleInputChange}
              placeholder="First Name"
              value={resumeData.firstName || ""}
            />
            <Input
              name="lastName"
              onChange={handleInputChange}
              placeholder="Last Name"
              value={resumeData.lastName || ""}
            />
            <Input
              name="jobTitle"
              onChange={handleInputChange}
              placeholder="Job Title"
              value={resumeData.jobTitle || ""}
            />
            <Input
              name="address"
              onChange={handleInputChange}
              placeholder="Address"
              value={resumeData.address || ""}
            />
            <Input
              name="phone"
              onChange={handleInputChange}
              placeholder="Phone"
              value={resumeData.phone || ""}
            />
            <Input
              name="email"
              onChange={handleInputChange}
              placeholder="Email"
              value={resumeData.email || ""}
            />
            <Textarea
              className="mb-2"
              maxLength={500}
              rows={3}
              placeholder="Summary"
              name="summary"
              onChange={handleInputChange}
              value={resumeData.summary || ""}
            />
            <Button
              disabled={loadingFields["summary"]}
              type="button"
              className="py-6"
              onClick={() =>
                handleAIButtonClick("summary", selectedTemplate?.summaryPrompt)
              }
            >
              {loadingFields["summary"] && (
                <Loader2Icon className="animate-spin mr-2" />
              )}
              AI Assist💫
            </Button>
          </div>
        );
      case "Experience":
        return (
          <div>
            <h2 className="font-bold text-2xl mb-2 text-primary">Experience</h2>
            <p className="text-sm text-gray-500 mb-4">(Add upto 4 experiences)</p>
            {Array.from({ length: experienceCount }).map((_, expIndex) => (
              <div key={expIndex} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold">{`Experience ${
                  expIndex + 1
                }`}</label>
                <Input
                  name={`experience-${expIndex}-title`}
                  onChange={(e) => handleInputChange(e, expIndex, "experience")}
                  placeholder="Job Title"
                  value={resumeData.experience?.[expIndex]?.title || ""}
                />
                <Input
                  name={`experience-${expIndex}-company`}
                  onChange={(e) => handleInputChange(e, expIndex, "experience")}
                  placeholder="Company Name"
                  value={resumeData.experience?.[expIndex]?.company || ""}
                />
                <Input
                  name={`experience-${expIndex}-city`}
                  onChange={(e) => handleInputChange(e, expIndex, "experience")}
                  placeholder="City"
                  value={resumeData.experience?.[expIndex]?.city || ""}
                />
                <Input
                  name={`experience-${expIndex}-state`}
                  onChange={(e) => handleInputChange(e, expIndex, "experience")}
                  placeholder="State"
                  value={resumeData.experience?.[expIndex]?.state || ""}
                />
                <Input
                  name={`experience-${expIndex}-startDate`}
                  onChange={(e) => handleInputChange(e, expIndex, "experience")}
                  placeholder="Start Date"
                  value={resumeData.experience?.[expIndex]?.startDate || ""}
                />
                <Input
                  name={`experience-${expIndex}-endDate`}
                  onChange={(e) => handleInputChange(e, expIndex, "experience")}
                  placeholder="End Date"
                  value={resumeData.experience?.[expIndex]?.endDate || ""}
                />
                <Textarea
                  className="mb-2"
                  maxLength={500}
                  rows={3}
                  placeholder="Work Summary"
                  name={`experience-${expIndex}-workSummary`}
                  onChange={(e) => handleInputChange(e, expIndex, "experience")}
                  value={resumeData.experience?.[expIndex]?.workSummary || ""}
                />
                <Button
                  disabled={loadingFields[`experience-${expIndex}-description`]}
                  type="button"
                  className="py-6"
                  onClick={() =>
                    handleAIButtonClick(
                      `experience-${expIndex}-description`,
                      selectedTemplate?.experiencePrompt
                    )
                  }
                >
                  {loadingFields[`experience-${expIndex}-description`] && (
                    <Loader2Icon className="animate-spin mr-2" />
                  )}
                  AI Assist💫
                </Button>
                <Button
                  className="text-white bg-red-600"
                  type="button"
                  onClick={() => removeSection(expIndex, "experience")}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remove Experience
                </Button>
              </div>
            ))}
            {experienceCount < 4 && (
              <Button
                type="button"
                className="py-6 text-white bg-green-600"
                onClick={addExperience}
              >
                + Add Another Experience
              </Button>
            )}
          </div>
        );
      case "Education":
        return (
          <div>
            <h2 className="font-bold text-2xl mb-2 text-primary">Education</h2>
            {Array.from({ length: educationCount }).map((_, eduIndex) => (
              <div key={eduIndex} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold">{`Education ${
                  eduIndex + 1
                }`}</label>
                <Input
                  name={`education-${eduIndex}-universityName`}
                  onChange={(e) => handleInputChange(e, eduIndex, "education")}
                  placeholder="University Name"
                  value={resumeData.education?.[eduIndex]?.universityName || ""}
                />
                <Input
                  name={`education-${eduIndex}-degree`}
                  onChange={(e) => handleInputChange(e, eduIndex, "education")}
                  placeholder="Degree"
                  value={resumeData.education?.[eduIndex]?.degree || ""}
                />
                <Input
                  name={`education-${eduIndex}-startDate`}
                  onChange={(e) => handleInputChange(e, eduIndex, "education")}
                  placeholder="Start Date"
                  value={resumeData.education?.[eduIndex]?.startDate || ""}
                />
                <Input
                  name={`education-${eduIndex}-endDate`}
                  onChange={(e) => handleInputChange(e, eduIndex, "education")}
                  placeholder="End Date"
                  value={resumeData.education?.[eduIndex]?.endDate || ""}
                />
                <Textarea
                  className="mb-2"
                  maxLength={500}
                  rows={3}
                  placeholder="Description"
                  name={`education-${eduIndex}-description`}
                  onChange={(e) => handleInputChange(e, eduIndex, "education")}
                  value={resumeData.education?.[eduIndex]?.description || ""}
                />
                <Button
                  disabled={loadingFields[`education-${eduIndex}-description`]}
                  type="button"
                  className="py-6"
                  onClick={() =>
                    handleAIButtonClick(
                      `education-${eduIndex}-description`,
                      selectedTemplate?.educationPrompt
                    )
                  }
                >
                  {loadingFields[`education-${eduIndex}-description`] && (
                    <Loader2Icon className="animate-spin mr-2" />
                  )}
                  AI Assist💫
                </Button>
                <Button
                  type="button"
                  onClick={() => removeSection(eduIndex, "education")}
                >
                  <Trash2 className="mr-2 h-4 w-4 text-white bg-red-600" />{" "}
                  Remove Education
                </Button>
              </div>
            ))}
            {educationCount < 4 && (
              <Button
                type="button"
                className="py-6 text-white bg-green-600"
                onClick={addEducation}
              >
                + Add Another Education
              </Button>
            )}
          </div>
        );
      case "Projects":
        return (
          <div>
            <h2 className="font-bold text-2xl mb-2 text-primary">Projects</h2>
            {Array.from({ length: projectCount }).map((_, projIndex) => (
              <div key={projIndex} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold">{`Project ${
                  projIndex + 1
                }`}</label>
                <Input
                  name={`project-${projIndex}-title`}
                  onChange={(e) => handleInputChange(e, projIndex, "project")}
                  placeholder="Project Title"
                  value={resumeData.projects?.[projIndex]?.title || ""}
                />

                <Textarea
                  className="mb-2"
                  maxLength={500}
                  rows={3}
                  placeholder="Description"
                  name={`project-${projIndex}-description`}
                  onChange={(e) => handleInputChange(e, projIndex, "project")}
                  value={resumeData.projects?.[projIndex]?.description || ""}
                />
                <Button
                  disabled={loadingFields[`project-${projIndex}-description`]}
                  type="button"
                  className="py-6"
                  onClick={() =>
                    handleAIButtonClick(
                      `project-${projIndex}-description`,
                      selectedTemplate?.projectPrompt
                    )
                  }
                >
                  {loadingFields[`project-${projIndex}-description`] && (
                    <Loader2Icon className="animate-spin mr-2" />
                  )}
                  AI Assist💫
                </Button>
                <Button className="bg-red-600"
                  type="button"
                  onClick={() => removeSection(projIndex, "projects")}
                >
                  <Trash2 className="mr-2 h-4 w-4 text-white" />{" "}
                  Remove Project
                </Button>
              </div>
            ))}
            {projectCount < 4 && (
              <Button
                type="button"
                className="py-6 text-white bg-green-600"
                onClick={addProject}
              >
                + Add Another Project
              </Button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const goToNextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const goToPreviousSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <form onSubmit={onSubmit}>
      {renderSection()}

      <div className="flex justify-between mt-6">
        <Button
          className="text-white bg-black"
          type="button"
          onClick={goToPreviousSection}
          disabled={currentSection === 0}
        >
          <ArrowLeft />
          Previous
        </Button>
        <Button
          className="text-white bg-black"
          type="button"
          onClick={goToNextSection}
          disabled={currentSection === sections.length - 1}
        >
          Next
          <ArrowRight />
        </Button>
      </div>

      {currentSection === sections.length - 1 && (
        <Button type="submit" className="mt-6 py-6">
          Generate Resume
        </Button>
      )}
    </form>
  );
}

export default FormSection;
