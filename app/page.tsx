"use client";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { SiGooglegemini } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState } from "react";

// FAQ data
const faqs = [
  {
    question: "How does Resume Roast work?",
    answer:
      "Resume Roast uses AI-powered tools to help you create, customize, and optimize your resume. Simply choose a template, input your information, and let our AI assist you in crafting the perfect resume.",
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
        <h1 className="text-8xl font-bold mb-6 text-[#965f14] font-serif">
          Craft Your Perfect Resume In Seconds
        </h1>
        <p className="text-2xl mb-8 text-[#704c18] font-serif">
          Resume Templates, Custom AI Resume, ATS optimization
        </p>
        <p className="flex justify-center items-center font-extrabold text-lg mb-8">
          Powered by Google Gemini <FcGoogle className="ml-2 mr-1" />{" "}
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
              Resume Templates
            </h2>
            <p className="text-gray-700">
              Choose from a variety of professionally designed resume templates
              to make your resume stand out.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#965f14] mb-4">
              Prompt To Fill
            </h2>
            <p className="text-gray-700">
              Create custom resumes tailored to your career goals and job
              applications using AI. Just prompt keywords and let the AI make
              your resume
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#965f14] mb-4">ATS</h2>
            <p className="text-gray-700">
              Utilize AI-powered tools to optimize your resume for Applicant
              Tracking Systems (ATS)
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
