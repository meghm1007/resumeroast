"use client";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { SiGooglegemini } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import "./DynamicHeading.css"; // Import the CSS file

// FAQ data
const faqs = [
  {
    question: "How does Resume Roast work?",
    answer:
      "Resume Roast uses AI-powered tools to help you create, customize, and optimize your resume with AI. Simply input your information, and let our AI assist you in crafting the perfect resume. You can also create Resume Designs tailored to your company. For example, your experience and education in movie like format and a red-black theme if you are applying to Netflix",
  },
  {
    question: "Is Resume Roast ATS-friendly?",
    answer:
      "Yes, all resumes created with Resume Roast are optimized for Applicant Tracking Systems (ATS). Our AI tools ensure that your resume is formatted correctly and includes relevant keywords for your industry.",
  },
  {
    question: "Can I use Resume Roast for free?",
    answer:
      "We offer a free tier with basic features. For access to advanced AI tools and premium templates, we have affordable subscription plans available.",
  },
  // Add more FAQs as needed
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const words = [
    "Engineering",
    "Software Engineering",
    "Internship",
    "Machine Learning",
    "Artificial Intelligence",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeClass("fade-in");
      }, 500); // Duration of the fade-out effect
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md py-6 px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={"/logo.svg"}
            alt="Resume Roast Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-[#965f14]">
            Resume Roast
          </span>
        </Link>
        <nav className="space-x-6">
          <Link
            href="/blog"
            className="text-gray-700 hover:text-[#965f14] transition"
          >
            Blog
          </Link>
          <Link
            href="/dashboard"
            className="bg-[#965f14] text-white hover:bg-[#7a4b12] px-4 py-2 rounded-md transition"
          >
            Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-8 py-24 text-center">
        <h1 className="text-7xl font-extrabold mb-6 font-sans text-[#3e2c1c]">
          Craft Your Perfect <br />
          <a className={`text-highlight ${fadeClass}`}>
            {words[currentWordIndex]}
          </a>{" "}
          <br />
          Resume In Seconds
        </h1>
        <p className="text-2xl mb-8 text-[#704c18] font-serif">
          Resume Templates, Custom AI Resume, ATS optimization
        </p>
        <p className="flex justify-center items-center text-gray-700 font-bold text-lg mb-8">
          Powered by Google Gemini <FcGoogle className="ml-2 mr-1 " />{" "}
          <SiGooglegemini />
        </p>
        <div className="space-x-4 mb-12">
          <Link
            href="/dashboard"
            className="bg-[#965f14] text-white hover:bg-[#7a4b12] px-8 py-4 rounded-md text-lg font-semibold transition"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="bg-gray-300 hover:bg-gray-400 px-8 py-4 rounded-md text-lg font-semibold transition"
          >
            Learn More
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#965f14] mb-4">
              Resume Editor📝
            </h2>
            <p className="text-gray-700">
              Input your experience, projects, education, skills, etc. and we
              handle the ATS optimized resume template for you
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#965f14] mb-4">
              Prompt To Fill With AI🤖
            </h2>
            <p className="text-gray-700">
              Prompt Keywords and short phrases for specific sections of your
              resume and AI crafts your resume for you
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#965f14] mb-4">
              Company Specific Designs🎨
            </h2>
            <p className="text-gray-700">
              Choose from a variety of templates that are tailored to specific
              companies and industries. Stand out from the crowd! Great for cold
              emailing
            </p>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="container mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#965f14]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className="text-2xl">
                  {openFaq === index ? "−" : "+"}
                </span>
              </button>
              {openFaq === index && (
                <div className="p-4 bg-gray-50">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#965f14] text-white py-8 text-center">
        <div className="flex justify-center items-center">
          <p className="mr-1">&copy; Made With 🤎 By </p>
          <a
            className="font-bold flex items-center"
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/itsthemeg"
          >
            Megh
            <FaSquareXTwitter className="ml-1" />
          </a>
        </div>
      </footer>
    </div>
  );
}
