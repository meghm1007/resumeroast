'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { Resumes } from '@/utils/schema';
import Link from 'next/link';

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
    if (!roasts || roasts.length === 0) return 'No roasts yet';
    const totalScore = roasts.reduce((sum, roast) => sum + roast.score, 0);
    return (totalScore / roasts.length).toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recently Created Resumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <Link href={`/roast/${resume.uniqueId}`} key={resume.uniqueId}>
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Resume {resume.uniqueId.slice(0, 8)}</h2>
              <p className="text-sm text-gray-600 mb-2">Created by: {resume.createdBy || 'Unknown'}</p>
              <p className="text-sm text-gray-600 mb-2">
                Created at: {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
              <p className="text-lg font-bold text-blue-600">
                Average Roast Score: {calculateAverageScore(resume.roasts)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RoastResume;