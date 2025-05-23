export default [
  {
    name: "AI Editor🤖",
    desc: "Create your entire resume with just a few keywords and AI will do the rest. No need to write long paragraphs or worry about formatting and templating",
    category: "Basic Resume",
    icon: "/airesume.png",
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
        label: "Skills✨",
        field: "textarea",
        name: "Skills",
        aiButton: true, // Assuming no AI assist for skills
        required: true,
        placeholder:
          "Input your skills separated by commas, e.g., Python, Java, JavaScript, HTML, CSS, Node.js",
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
    name: "Cover Letter📃",
    desc: "Craft a fantastic cover letter for your dream job",
    category: "Basic Resume",
    icon: "/designresume.png",
    aiPrompt:
      "Write me a cover letter for a given job description and my resume keywords and give me result in rich text editor format",
    slug: "coverletter",
    form: [
      {
        label: "Paste Job Description",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        label: "Enter a few keywords of your resume",
        field: "textarea",
        name: " outline",
      },
    ],
  },
];
