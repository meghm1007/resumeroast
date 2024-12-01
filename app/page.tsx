"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiCoffeeCup, GiExplosiveMaterials } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { SiGooglegemini } from "react-icons/si";
import {
  FaSquareXTwitter,
  FaFire,
  FaCloud,
  FaLink,
  FaLetterboxd,
} from "react-icons/fa6";
import "./DynamicHeading.css";
import { FaReddit } from "react-icons/fa6";
import dynamic from "next/dynamic";
import BillingSection from "./_components/BillingSection";
import { FaMailBulk } from "react-icons/fa";

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#965f14]"></div>
  </div>
);

// FeatureCard component
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-[#3e2c1c]">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// FAQItem component
const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string | ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md transition-all duration-200">
      <button
        className="w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-[#3e2c1c]">{question}</h3>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`mt-2 text-gray-600 overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

// Dynamically import heavy components
const DynamicFeatureCard = dynamic(() => Promise.resolve(FeatureCard), {
  loading: () => <LoadingSpinner />,
});

const DynamicFAQItem = dynamic(() => Promise.resolve(FAQItem), {
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  const words = [
    "Engineering",
    "Software Engineering",
    "Internship",
    "Machine Learning",
    "Artificial Intelligence",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeClass("fade-in");
      }, 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo3.ico"
            alt="Resume Roast Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-[#965f14]">
            Resume Roast
          </span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            href="/dashboard"
            prefetch={true}
            className="text-gray-700 hover:text-[#965f14] transition"
          >
            Dashboard
          </Link>
          <Link
            href="/roast"
            prefetch={true}
            className="text-gray-700 hover:text-[#965f14] transition"
          >
            Roast
          </Link>
          <a
            href="https://www.reddit.com/r/resume_roasts/"
            target="_blank"
            className="text-gray-700 hover:text-[#965f14] transition"
          >
            <FaReddit className="text-orange-600 bg-white rounded-full font-bold text-2xl mr-3" />
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#3e2c1c]">
                Craft Your Perfect
                <br />
                <span className={`text-highlight ${fadeClass}`}>
                  {words[currentWordIndex]}
                </span>
                <br />
                Resume In Seconds
              </h1>
              <p className="text-xl mb-8 text-[#704c18]">
                AI-powered resume creation, peer reviews, and ATS optimization
                all in one place.
              </p>
              <div className="flex space-x-4 mb-8">
                <Link
                  href="/dashboard"
                  className="bg-[#965f14] text-white hover:bg-[#7a4b12] px-6 py-3 rounded-md text-lg font-semibold transition"
                >
                  Get Started Free
                </Link>
                <Link
                  href="#features"
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-md text-lg font-semibold transition"
                >
                  Learn More
                </Link>
              </div>
              <p className="flex items-center text-gray-700 font-bold text-lg">
                Powered by Google Gemini <FcGoogle className="ml-2 mr-1" />{" "}
                <SiGooglegemini />
              </p>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-[#965f14] to-[#7a4b12] p-8 md:p-12 text-white">
              <div className="flex items-center mb-6">
                <FaFire className="text-4xl mr-4" />
                <h2 className="text-3xl font-bold">Resume Roasting</h2>
              </div>
              <p className="text-xl mb-6">
                Get your resume roasted and let others roast it too! Our unique
                feature allows you to:
              </p>
              <ul className="list-disc list-inside mb-8 space-y-2">
                <li>Receive honest feedback from peers</li>
                <li>Improve your resume based on real-world insights</li>
                <li>Participate in roasting others' resumes</li>
                <li>Learn from a diverse community of professionals</li>
              </ul>
              <Link
                href="/roast"
                className="bg-white text-[#965f14] hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-semibold transition inline-flex items-center"
              >
                <FaFire className="mr-2" /> Start Roasting
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#3e2c1c]">
            Why Choose Resume Roast?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DynamicFeatureCard
              icon={<SiGooglegemini className="text-4xl text-[#965f14]" />}
              title="AI-Powered Creation"
              description="Leverage Google Gemini AI to craft professional ATS optimized resumes tailored to your industry."
            />
            <DynamicFeatureCard
              icon={<FaFire className="text-4xl text-orange-500" />}
              title="Peer Roasting"
              description="Get honest feedback from professionals in your field to improve your resume."
            />
            <DynamicFeatureCard
              icon={<FaMailBulk className="text-4xl text-[#965f14]" />}
              title="Cover Letter Generation"
              description="Generate a cover letter to accompany your resume specifically tailored to the job you're applying for."
            />
            <DynamicFeatureCard
              icon={
                <FaReddit className="text-4xl text-orange-600 bg-white rounded-full font-bold text-2xl mr-3" />
              }
              title="Reddit Community"
              description="Join our active Reddit community to get help, share your resumes, and get feedback from others."
            />
            <DynamicFeatureCard
              icon={<FaCloud className="text-4xl text-[#96b4ff]" />}
              title="Cloud Hosting"
              description="Host your resume on our cloud servers and share it with others."
            />
            <DynamicFeatureCard
              icon={<FaLink className="text-4xl text-[#965f14]" />}
              title="Link Sharing"
              description="Share your resume with a link and let others view it. Your resume literally becomes a website."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#3e2c1c]">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            <FAQItem
              question="How does the credit system work?"
              answer={
                <div className="space-y-2">
                  <p>
                    Our credit system is designed to be flexible and
                    transparent:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>5 credits per AI writing assist</li>
                    <li>20 credits per resume database hosting</li>
                    <li>Credits never expire</li>
                    <li>Bundle packages offer up to 25% savings</li>
                  </ul>
                </div>
              }
            />
            <FAQItem
              question="What makes Resume Roast's AI different from ChatGPT?"
              answer={
                <div className="space-y-2">
                  <p>
                    Resume Roast uses Google's Gemini AI, specifically trained
                    on:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                      Thousands of successful resumes across various industries
                    </li>
                    <li>
                      Current ATS (Applicant Tracking System) requirements
                    </li>
                    <li>
                      Industry-specific keywords and formatting best practices
                    </li>
                    <li>Real hiring manager preferences and feedback</li>
                  </ul>
                </div>
              }
            />
            <FAQItem
              question="What is resume roasting, and how does it help?"
              answer={
                <div className="space-y-2">
                  <p>
                    Resume roasting is our community-driven review system where:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                      Real professionals provide honest, actionable feedback
                    </li>
                    <li>Get insights from people in your target industry</li>
                    <li>Identify blind spots in your resume</li>
                    <li>Learn from others' resumes and feedback</li>
                    <li>This feature is completely free and unlimited!</li>
                  </ul>
                </div>
              }
            />
            <FAQItem
              question="What's included in the cloud hosting feature?"
              answer={
                <div className="space-y-2">
                  <p>
                    Our premium cloud hosting service (20 credits) includes:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Permanent, shareable link to your resume</li>
                    <li>Multiple format support (PDF, ATS-friendly)</li>
                  </ul>
                </div>
              }
            />
            <FAQItem
              question="How many credits do I need?"
              answer={
                <div className="space-y-2">
                  <p>Credit needs vary based on your job search intensity:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                      Light Usage (50 credits): Perfect for single job
                      applications or resume updates
                    </li>
                    <li>
                      Active Job Search (150 credits): Ideal for creating
                      multiple versions and hosting several resumes
                    </li>
                    <li>
                      Career Builder (500 credits): Best for long-term career
                      management and frequent updates
                    </li>
                  </ul>
                  <p className="mt-2">
                    Remember: You can always purchase more credits as needed,
                    and they never expire!
                  </p>
                </div>
              }
            />
            <FAQItem
              question="What makes Resume Roast worth the investment?"
              answer={
                <div className="space-y-2">
                  <p>Resume Roast offers unique value through:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Professional-grade AI powered by Google Gemini</li>
                    <li>Unlimited community feedback</li>
                    <li>ATS optimization tools</li>
                    <li>Professional cloud hosting</li>
                    <li>Active Reddit community support</li>
                  </ul>
                  <p className="mt-2">
                    Consider this: A single successful job application could
                    mean thousands in additional salary. Our service costs less
                    than a coffee shop visit but could significantly impact your
                    career trajectory.
                  </p>
                </div>
              }
            />
            <FAQItem
              question="Any more questions?🤔"
              answer={
                <div className="space-y-2">
                  <p>
                    Reach out to me on X{" "}
                    <a
                      href="https://x.com/itsthemeg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @itsthemeg
                    </a>
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#965f14] to-[#b27a2d] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Ready to Elevate Your Resume?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their job
            prospects with Resume Roast.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-[#1a1818]">
              Get Started with Resume Credits
            </h3>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-[#965f14] font-bold text-2xl mr-3">
                  ✅
                </span>
                <span className="text-lg">
                  100 Free Credits To Get Started 🤖
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-[#965f14] font-bold text-2xl mr-3">
                  ✅
                </span>
                <span className="text-lg">
                  Cloud hosting included with every resume ☁️
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-[#965f14] font-bold text-2xl mr-3">
                  ✅
                </span>
                <span className="text-lg">
                  Unlimited resume roasting feedback 🔥
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-[#965f14] font-bold text-2xl mr-3">
                  <FaReddit className="text-orange-600 bg-white rounded-full font-bold text-2xl mr-3" />
                </span>
                <span className="text-lg">
                  Access to our Reddit community of students and professionals
                </span>
              </li>
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="bg-white text-[#965f14] hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-bold transition inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex flex-col">
              <p>Get Started</p>
            </div>
          </Link>
          <p className="text-sm text-gray-200 mt-5">
            Invest in your future - one resume at a time!
          </p>
          <p className="text-sm text-gray-200 mt-2">
            Your support helps cover our hosting, database, and AI costs to keep
            providing you with the best resume tools.
          </p>
        </div>
      </section>
      <BillingSection />
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
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
