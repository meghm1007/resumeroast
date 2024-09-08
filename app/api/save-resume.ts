import { NextApiRequest, NextApiResponse } from 'next';
import { userResume } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const resumeData = req.body;

    // Check if a resume already exists for this user
    const existingResume = await db.select().from(userResume).where(eq(userResume.createdBy, userId)).limit(1);

    if (existingResume.length > 0) {
      // Update existing resume
      await db.update(userResume)
        .set(resumeData)
        .where(eq(userResume.createdBy, userId));
    } else {
      // Insert new resume
      await db.insert(userResume).values({ ...resumeData, createdBy: userId });
    }

    res.status(200).json({ message: 'Resume saved successfully' });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Error saving resume' });
  }
}