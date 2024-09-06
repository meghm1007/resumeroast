"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { Resumes } from "@/utils/schema";
import Link from "next/link";
import { GiCoffeeCup } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

import { FaArrowCircleLeft } from "react-icons/fa";

interface Roast {
  userId: string;
  email: string;
  score: number;
  date: string;
}

interface Resume {
  id: number;
  uniqueId: string;
  content: string;
  createdBy: string | null;
  createdAt: string | null;
  roasts: Roast[] | null;
}

function RoastResume() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { user } = useUser();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const result = await db.select().from(Resumes);
        setResumes(result);
        setFilteredResumes(result);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  const getResumeStatus = (roasts: Roast[] | null) => {
    if (!roasts || roasts.length === 0) return "Not reviewed😐";
    const avgScore =
      roasts.reduce((sum, roast) => sum + roast.score, 0) / roasts.length;
    if (avgScore < 4) return "Terrible☹️";
    if (avgScore < 7) return "Good🙂";
    return "Excellent😃";
  };

  const getAverageScore = (roasts: Roast[] | null) => {
    if (!roasts || roasts.length === 0) return 0;
    return roasts.reduce((sum, roast) => sum + roast.score, 0) / roasts.length;
  };

  const getBorderColor = (roasts: Roast[] | null) => {
    const avgScore = getAverageScore(roasts);
    if (avgScore === 0) return "border-gray-200"; // No reviews yet
    if (avgScore < 4) return "border-red-400";
    if (avgScore < 7) return "border-amber-400";
    return "border-green-400";
  };

  const filterResumes = (filter: string) => {
    setActiveFilter(filter);
    switch (filter) {
      case "my":
        setFilteredResumes(
          resumes.filter(
            (resume) =>
              resume.createdBy === user?.primaryEmailAddress?.emailAddress
          )
        );
        break;
      case "best":
        setFilteredResumes(
          [...resumes]
            .sort(
              (a, b) => getAverageScore(b.roasts) - getAverageScore(a.roasts)
            )
            .slice(0, 10)
        );
        break;
      case "worst":
        setFilteredResumes(
          [...resumes]
            .sort(
              (a, b) => getAverageScore(a.roasts) - getAverageScore(b.roasts)
            )
            .slice(0, 10)
        );
        break;
      default:
        setFilteredResumes(resumes);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex grid-cols-2 gap-5">
          <Link href="/dashboard">
            <Button>
              <FaArrowCircleLeft />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-brown-700 mb-6 flex items-center">
            <GiCoffeeCup className="text-brown-500" />
            Resume Review Hub
            <GiCoffeeCup className="text-brown-500" />
          </h1>
        </div>
        <div className="mb-6">
          <p>
            All your resumes will show here publicly🌐. People would be able to
            roast your resume and give you feedback😃. You can roast other
            people's resumes too🗣️! <br />
            If you're an employer, you can also use this platform to find
            potential candidates👨‍💼
          </p>
        </div>
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => filterResumes("all")}
            variant={activeFilter === "all" ? "default" : "outline"}
          >
            All Resumes
          </Button>
          <Button
            onClick={() => filterResumes("my")}
            variant={activeFilter === "my" ? "default" : "outline"}
          >
            My Resumes👨‍💻
          </Button>
          <Button
            onClick={() => filterResumes("best")}
            variant={activeFilter === "best" ? "default" : "outline"}
          >
            Best Resumes🔥
          </Button>
          <Button
            onClick={() => filterResumes("worst")}
            variant={activeFilter === "worst" ? "default" : "outline"}
          >
            Worst Resumes💩
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <Link href={`/roast/${resume.uniqueId}`} key={resume.uniqueId}>
              <div
                className={`bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 ease-in-out border-2 ${getBorderColor(
                  resume.roasts
                )}`}
              >
                <h2 className="text-xl font-semibold mb-2 text-brown-600">
                  {resume.createdBy?.split("@")[0] || "Anonymous"}📄
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Created by: {resume.createdBy || "Anonymous"}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Date:{" "}
                  {resume.createdAt
                    ? new Date(resume.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
                <div className="bg-amber-100 rounded-md p-2">
                  <p className="text-lg font-bold text-brown-700">
                    Roast: {getResumeStatus(resume.roasts)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {resume.roasts
                      ? `${resume.roasts.length} review${
                          resume.roasts.length !== 1 ? "s" : ""
                        }`
                      : "No reviews yet"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoastResume;
