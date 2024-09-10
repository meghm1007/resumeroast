import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText } from "lucide-react";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  experiencePrompt?: string;
  educationPrompt?: string;
  summaryPrompt?: string;
  projectPrompt?: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  placeholder?: string;
  aiButton?: boolean;
  required?: boolean;
}

function TemplateListSection({ userSearchInput }: any) {
  const [templateList, setTemplateList] = useState(Templates);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (userSearchInput) {
      const filterData = Templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput]);

  const handleTemplateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      (e.target as HTMLElement).click();
    }, 3000);
  };

  return (
    <div className="m-10 mb-20 flex relative">
      {templateList.map((item: TEMPLATE, index: number) => (
        <Link key={index} href={`/template/${item.slug}`} onClick={handleTemplateClick}>
          <TemplateCard {...item} />
        </Link>
      ))}
      <div>
        
      </div>
      {isLoading && (
        <div className="fixed bottom-4 right-4 w-64">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>Loading Template</AlertTitle>
            <AlertDescription>
              Preparing your template...
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default TemplateListSection;