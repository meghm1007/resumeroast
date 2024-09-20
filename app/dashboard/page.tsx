"use client";
import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<String>();
  const [coverLetterContent, setCoverLetterContent] = useState("");

  const handleCoverLetterGenerated = (content: string) => {
    setCoverLetterContent(content);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Search Section  */}
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      
      {/* Template List Section */}
      <TemplateListSection userSearchInput={userSearchInput} />


      
    </div>
  );
}

export default Dashboard;