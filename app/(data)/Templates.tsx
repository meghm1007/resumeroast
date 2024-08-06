export default [
  {
    name: "Basic Editor",
    desc: "A Resume Editor that allows you to create your resume from scratch without you worrying about any formatting and editing",
    category: "Basic Resume",
    icon: "/resume.png",
    slug: "generate-blog-title",
    form: [
      {
        label: "First Name",
        field: "input",
        name: "firstName",
        aiButton: false,
        required: true,
      },
      {
        label: "Last Name",
        field: "input",
        name: "lastName",
        aiButton: false,
        required: true,
      },
      {
        label: "Job Title",
        field: "input",
        name: "jobTitle",
        aiButton: false,
        required: true,
      },
      {
        label: "Address (optional)",
        field: "input",
        name: "address",
        aiButton: false,
        required: true,
      },
      {
        label: "Phone",
        field: "input",
        name: "phone",
        aiButton: false,
        required: true,
      },
      {
        label: "Email",
        field: "input",
        name: "email",
        aiButton: false,
        required: true,
      },
      {
        label: "Summary✨",
        field: "textarea",
        name: "summary",
        aiButton: true,
        required: true,
      },
      {
        label: "Experience 1✨",
        field: "textarea",
        name: "experience",
        aiButton: true,
        required: true,
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
      "This is the resume info given by the user in a form. It contains keywords of education experience and the time period. Generate me an entire resume based on the keyowrds given in the experience, education and skills section given by the user. Give the header for each section and the desciprtion in bullet points. This should be ATS friendly and give me result in rich text editor format",
    experiencePrompt:
      "These are the experience keywords given by the user for one of their experiences. Generate me a description for this experience in bullet points (not more than 3 points) including the details and include % growth revenue generated factors making it look good and ATS friendly. Give me result in rich text editor format",
    educationPrompt:
      "These are the education keywords given by the user for one of their educations. Generate me a description for this education in bullet points including the details and the clubs, etc. the person was involved in making it look good for a big company interview and make it ATS friendly. Give me result in rich text editor format",
    summaryPrompt:
      "This is the summary given by the user. Generate me a 2-3 line description for this summary about person. Include the technical and social skills required for. Use from the keywords the user inputted and you may add your own points as well. Make it suitable for a big company role and make it ATS friendly. Give me result in rich text editor format",
  },
  {
    name: "AI Resume Maker",
    desc: "An AI Tool that generates each section of your resume based on your inputs taken as keywords",
    category: "Basic Resume",
    icon: "/resume.png",
    aiPrompt:
      "Give me 5 resume ideas in bullet wise format only based on a given niche and outline and give me result in rich text editor format",
    slug: "generate-blog-title",
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
    name: "AI Generator",
    desc: "AI tools which generated an entire reusme in just one click based on your inputs",
    category: "Basic Resume",
    icon: "/resume.png",
    aiPrompt:
      "Give me 5 resume ideas in bullet wise format only based on a given niche and outline and give me result in rich text editor format",
    slug: "generate-blog-title",
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
    name: "Resume Designer",
    desc: "A tool that enables you to create resumes to look like the company you're applying to",
    category: "Basic Resume",
    icon: "/resume.png",
    aiPrompt:
      "Give me 5 resume ideas in bullet wise format only based on a given niche and outline and give me result in rich text editor format",
    slug: "generate-blog-title",
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
