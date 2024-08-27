'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/utils/db';
import { Resumes } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

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
        const result = await db.select().from(Resumes).where(eq(Resumes.uniqueId, id));
        if (result.length > 0) {
          setResumeContent(result[0].content);
          // Parse the roasts JSON if it's a string, or use an empty array if it's null/undefined
          const parsedRoasts = Array.isArray(result[0].roasts) ? result[0].roasts : [];
          setRoasts(parsedRoasts);
          const userRoastObj = parsedRoasts.find((roast: Roast) => roast.userId === user?.id);
          setUserRoast(userRoastObj ? userRoastObj.score : null);
        } else {
          setResumeContent(null);
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
        setResumeContent(null);
      }
    };

    fetchResume();
  }, [id, user]);

  const handleRoast = async (score: number) => {
    if (!id) return;

    try {
      const response = await fetch(`/api/resumes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uniqueId: id, roastScore: score }),
      });

      if (response.ok) {
        setUserRoast(score);
        // Refresh roasts
        const result = await db.select().from(Resumes).where(eq(Resumes.uniqueId, id));
        if (result.length > 0) {
          const parsedRoasts = Array.isArray(result[0].roasts) ? result[0].roasts : [];
          setRoasts(parsedRoasts);
        }
      } else {
        console.error('Failed to add roast');
      }
    } catch (error) {
      console.error('Error adding roast:', error);
    }
  };

  if (!resumeContent) {
    return <div className="text-center text-lg text-gray-600 mt-8">Resume not found or loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Resume Roast</h1>
      <div 
        className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-base leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: resumeContent }} 
      />
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Roast this Resume</h2>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <button
              key={score}
              onClick={() => handleRoast(score)}
              className={`px-3 py-1 rounded ${
                userRoast === score ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {score}
            </button>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Roasts</h3>
          {roasts.map((roast, index) => (
            <div key={index} className="mb-2">
              <span className="font-medium">{roast.email}: </span>
              <span>{roast.score}/10</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}