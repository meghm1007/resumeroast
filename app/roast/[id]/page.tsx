"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/db";
import { Resumes } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { GiCoffeeBeans, GiCoffeeCup } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

interface Roast {
  userId: string;
  email: string;
  score: number;
  date: string;
}

export default function RoastResume() {
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const [roasts, setRoasts] = useState<Roast[]>([]);
  const [userRoast, setUserRoast] = useState<number | null>(null);
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { user } = useUser();

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;

      try {
        const result = await db
          .select()
          .from(Resumes)
          .where(eq(Resumes.uniqueId, id));
        if (result.length > 0) {
          setResumeContent(result[0].content);
          // Parse the roasts JSON if it's a string, or use an empty array if it's null/undefined
          const parsedRoasts = Array.isArray(result[0].roasts)
            ? result[0].roasts
            : [];
          setRoasts(parsedRoasts);
          const userRoastObj = parsedRoasts.find(
            (roast: Roast) => roast.userId === user?.id
          );
          setUserRoast(userRoastObj ? userRoastObj.score : null);
        } else {
          setResumeContent(null);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
        setResumeContent(null);
      }
    };

    fetchResume();
  }, [id, user]);

  const handleRoast = async (score: number) => {
    if (!id) return;

    try {
      const response = await fetch(`/api/resumes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId: id, roastScore: score }),
      });

      if (response.ok) {
        setUserRoast(score);
        // Refresh roasts
        const result = await db
          .select()
          .from(Resumes)
          .where(eq(Resumes.uniqueId, id));
        if (result.length > 0) {
          const parsedRoasts = Array.isArray(result[0].roasts)
            ? result[0].roasts
            : [];
          setRoasts(parsedRoasts);
        }
      } else {
        console.error("Failed to add roast");
      }
    } catch (error) {
      console.error("Error adding roast:", error);
    }
  };

  if (!resumeContent) {
    return (
      <div className="text-center text-lg text-coffee-text mt-8">
        Brewing resume... Please wait.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-light">
      <div className="max-w-3xl mx-auto p-8">
        <div className="flex grid-cols-2 gap-5">
          <Link href={"/roast"}>
            {" "}
            <Button>
              <span className="flex grid-cols-2 items-center gap-2">
                <FaArrowCircleLeft className="text-xl"/> Roast Others' Resumes
              </span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-coffee-text mb-6 flex items-center">
            <GiCoffeeCup className="mr-2 text-coffee-accent" /> Resume Roast
          </h1>
        </div>
        <div
          className="bg-white border border-coffee-dark rounded-lg p-6 text-base leading-relaxed mb-6 shadow-md"
          dangerouslySetInnerHTML={{ __html: resumeContent }}
        />
        <div className="mt-6 bg-cream-light p-6 rounded-lg shadow-md border border-coffee">
          <h2 className="text-2xl font-bold mb-4 text-coffee-text">
            Roast this Resume
          </h2>
          <p className="mb-4 text-coffee-text">
            How would you rate this resume's roast? (1 = 👎🏻🍵, 10 =👍🏻🍵)
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handleRoast(score)}
                className={`px-4 py-2 rounded-full ${
                  userRoast === score
                    ? "bg-coffee-accent text-white"
                    : "bg-cream text-coffee-text hover:bg-coffee hover:text-white"
                } transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-coffee-dark`}
              >
                {score}
              </button>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-coffee-text">
              Roast Flavors
            </h3>
            {roasts.map((roast, index) => (
              <div
                key={index}
                className="mb-2 flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <GiCoffeeBeans className="mr-2 text-coffee-accent" />
                <span className="font-medium text-coffee-text">
                  {roast.email}:{" "}
                </span>
                <span className="text-coffee-text ml-auto">
                  {roast.score}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
