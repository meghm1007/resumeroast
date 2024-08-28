'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { Resumes } from '@/utils/schema';
import Link from 'next/link';
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi';

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

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const result = await db.select().from(Resumes);
        setResumes(result);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  const calculateAverageScore = (roasts: Roast[] | null) => {
    if (!roasts || roasts.length === 0) return 'Not roasted yet';
    const totalScore = roasts.reduce((sum, roast) => sum + roast.score, 0);
    return (totalScore / roasts.length).toFixed(1);
  };

  const getRoastLevel = (score: number) => {
    if (score < 3) return 'Light Roast';
    if (score < 6) return 'Medium Roast';
    if (score < 8) return 'Medium-Dark Roast';
    return 'Dark Roast';
  };

  return (
    <div className="min-h-screen bg-coffee-light">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-coffee-text mb-6 flex items-center">
          <GiCoffeeCup className="mr-2 text-coffee-accent" /> Resume Roastery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Link href={`/roast/${resume.uniqueId}`} key={resume.uniqueId}>
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 ease-in-out border border-coffee">
                <h2 className="text-xl font-semibold mb-2 text-coffee-text">Resume Blend #{resume.uniqueId.slice(0, 8)}</h2>
                <p className="text-sm text-coffee-text mb-2">Roasted by: {resume.createdBy || 'Anonymous Barista'}</p>
                <p className="text-sm text-coffee-text mb-2">
                  Roasted on: {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
                <div className="flex items-center">
                  <GiCoffeeBeans className="mr-2 text-coffee-accent" />
                  <p className="text-lg font-bold text-coffee-text">
                    Roast Level: {calculateAverageScore(resume.roasts)}
                  </p>
                </div>
                <p className="text-sm text-coffee-text mt-1">
                  ({getRoastLevel(parseFloat(calculateAverageScore(resume.roasts)))})
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoastResume;