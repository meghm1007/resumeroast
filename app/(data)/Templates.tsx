export default [
  {
    name: "Basic Editor",
    desc: "Input each section of your resume and we handle the entire ATS friendly template for you",
    category: "Basic Resume",
    icon: "/airesume.png",
    aiPrompt:
      "Give me 5 resume ideas in bullet wise format only based on a given niche and outline and give me result in rich text editor format",
    slug: "basic-editor",
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        label: "Enter blog outline",
        field: "textarea",
        name: " outline",
      },
    ],
  },

  {
    name: "AI Editor",
    desc: "An AI Tool that generates each section of your resume based on your inputs taken as keywords",
    category: "Basic Resume",
    icon: "/resume.png",
    slug: "ai-editor",
    form: [
      {
        label: "First Name",
        field: "input",
        name: "firstName",
        aiButton: false,
        required: true,
        placeholder: "John",
      },
      {
        label: "Last Name",
        field: "input",
        name: "lastName",
        aiButton: false,
        required: true,
        placeholder: "Doe",
      },
      {
        label: "Job Title",
        field: "input",
        name: "jobTitle",
        aiButton: false,
        required: true,
        placeholder: "Software Developer",
      },
      {
        label: "Address (optional)",
        field: "input",
        name: "address",
        aiButton: false,
        required: true,
        placeholder: "123, Main Street, New York",
      },
      {
        label: "Phone",
        field: "input",
        name: "phone",
        aiButton: false,
        required: true,
        placeholder: "1234567890",
      },
      {
        label: "Email",
        field: "input",
        name: "email",
        aiButton: false,
        required: true,
        placeholder: "name@gmail.com",
      },
      {
        label: "Summary✨",
        field: "textarea",
        name: "summary",
        aiButton: true,
        required: true,
        placeholder:
          "Input in this format: {problem solver, 5 years experience, ReactJS, Machine Learning}",
      },
      {
        label: "Experience 1✨",
        field: "textarea",
        name: "experience",
        aiButton: true,
        required: true,
        placeholder:
          "Input in this format: {Software Developer, Google, Feb 2019- May 2021, increased refresh rate, doodle team}",
      },
      {
        label: "Experience 2✨(optional)",
        field: "textarea",
        aiButton: true,
        name: "experience",
      },
      {
        label: "Experience 3✨(optional)",
        field: "textarea",
        aiButton: true,
        name: "experience",
      },
      {
        label: "Experience 4✨(optional)",
        field: "textarea",
        aiButton: true,
        name: "experience",
      },
      {
        label: "Education 1✨",
        field: "textarea",
        name: " education",
        aiButton: true,
        required: true,
        placeholder:
          "Input in this format: {Computer Science, Stanford University, 2015-2019, GPA: 3.9, robotics club, machine learning}",
      },
      {
        label: "Education 2✨ (optional)",
        field: "textarea",
        aiButton: true,
        name: " education",
      },
      {
        label: "Education 3✨ (optional)",
        field: "textarea",
        aiButton: true,
        name: "education",
      },
      {
        label: "Skills (optional)",
        field: "input",
        aiButton: false,
        name: " outline",
      },
    ],
    aiPrompt:
      "This is the resume info given by the user in a form. It contains keywords of education experience and the time period. Generate me an entire resume based on the keywords given in the experience, education, and skills section provided by the user. Structure the resume with clear sections: Summary, Experience, Education, and Skills. Ensure the content is detailed and achievement-oriented, using industry-specific keywords and action verbs. Make it ATS-friendly and present the result in rich text editor format, emphasizing quantifiable achievements and relevant skills.",

    experiencePrompt:
      "These are the experience keywords given by the user for one of their experiences. Generate me a description for this experience in bullet points (not more than 3 points) including key responsibilities and achievements. Include specific, quantifiable results (e.g., percentage improvements, revenue generated) and use strong action verbs. Ensure the description is ATS-friendly and present the result in rich text editor format, making it impressive for top-tier employers.",

    educationPrompt:
      "These are the education keywords given by the user for one of their educations. Generate me a description for this education in bullet points, showcasing academic achievements, relevant coursework, and extracurricular activities. Highlight any leadership roles, research projects, or special recognitions. Include relevant technical skills or certifications, and mention any clubs or volunteer work. Ensure the description is ATS-friendly and present the result in rich text editor format, appealing to top employers.",

    summaryPrompt:
      "This is the summary given by the user. Generate me a 2-3 line description for this summary about the person. Include the user's top 2-3 skills or areas of expertise relevant to their target role or industry, and mention their most impressive career achievement or unique value proposition. Use industry-specific keywords and phrases to align with the user's target job descriptions. Ensure the summary is in First person perspective and ATS-friendly and present the result in rich text editor format, making it suitable for a big company role.",

    projectPrompt:
      "These are the keywords of their projects given by the user. Generate me a 2-3 line description in bullet points of the project including the technologies used to make it, the problem it solved, and the impact it had. Include specific, quantifiable results (e.g., percentage improvements, revenue generated) and use strong action verbs. Ensure the description is ATS-friendly and present the result in rich text editor format, making it impressive for top-tier employers.",
  },

  {
    name: "Resume Designer",
    desc: "A tool that enables you to create resumes to look like the company you're applying to",
    category: "Basic Resume",
    icon: "/designresume.png",
    aiPrompt:
      "Give me 5 resume ideas in bullet wise format only based on a given niche and outline and give me result in rich text editor format",
    slug: "resume-designer",
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        label: "Enter blog outline",
        field: "textarea",
        name: " outline",
      },
    ],
  },
];
