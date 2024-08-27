'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function RoastResume() {
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const content = localStorage.getItem(`resume_${id}`);
    if (content) {
      setResumeContent(content);
    }
  }, [id]);

  if (!resumeContent) {
    return <div>Loading resume...</div>;
  }

  return (
    <div>
      <h1>Resume Roast</h1>
      <div dangerouslySetInnerHTML={{ __html: resumeContent }} />
    </div>
  );
}