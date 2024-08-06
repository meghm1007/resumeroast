export default [
  {
    name: "Basic Editor",
    desc: "A Resume Editor that allows you to create your resume from scratch without you worrying about any formatting and editing",
    category: "Basic Resume",
    icon: "/resume.png",
    aiPrompt:
      "Generate me an entire resume based on the keyowrds given in the experience, education and skills section given by the user. This should be ATS friendly and give me result in rich text editor format",
    slug: "generate-blog-title",
    form: [
      {
        label: "First Name",
        field: "input",
        name: "firstName",
        required: true,
      },
      {
        label: "Last Name",
        field: "input",
        name: "lastName",
        required: true,
      },
      {
        label: "Job Title",
        field: "input",
        name: "jobTitle",
        required: true,
      },
      {
        label: "Address",
        field: "input",
        name: "address",
        required: true,
      },
      {
        label: "Phone",
        field: "input",
        name: "phone",
        required: true,
      },
      {
        label: "Email",
        field: "input",
        name: "email",
        required: true,
      },
      {
        label: "Summary",
        field: "textarea",
        name: "summary",
        required: true,
      },
      {
        label: "Experience 1",
        field: "textarea",
        name: "niche",
        required: true,
      },
      {
        label: "Experience 2",
        field: "textarea",
        name: "niche",
      },
      {
        label: "Experience 3",
        field: "textarea",
        name: "niche",
      },
      {
        label: "Education 1",
        field: "textarea",
        name: " outline",
        required: true,
      },
      {
        label: "Education 2",
        field: "textarea",
        name: " outline",
      },
      {
        label: "Education 3",
        field: "textarea",
        name: " outline",
      },
      {
        label: "Skills",
        field: "textarea",
        name: " outline",
      },
    ],
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
