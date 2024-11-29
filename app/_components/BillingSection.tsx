import Link from "next/link";

const BillingSection = () => {
  const creditOptions = [
    {
      credits: 100,
      price: 10,
      description: "Perfect for small projects",
      features: [
        "Generate 20 Cover Letters",
        "AI Resume Review",
        "Basic Support",
      ],
      bgColor: "bg-white",
    },
    {
      credits: 250,
      price: 20,
      description: "Most popular for medium projects",
      features: [
        "Generate 50 Cover Letters",
        "AI Resume Review",
        "Priority Support",
        "Resume Analytics",
      ],
      popular: true,
      bgColor: "bg-blue-50",
    },
    {
      credits: 500,
      price: 35,
      description: "Best value for larger projects",
      features: [
        "Generate 100 Cover Letters",
        "AI Resume Review",
        "24/7 Premium Support",
        "Advanced Analytics",
        "Custom Templates",
      ],
      bgColor: "bg-white",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Engaging Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Supercharge Your Job Search with Credits
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Get instant access to AI-powered tools that help you land your dream
            job faster
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="flex items-center text-green-600">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              No subscription required
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center text-green-600">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Pay as you go
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center text-green-600">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Instant access
            </span>
          </div>
        </div>

        {/* Credit Packages */}
        <div className="grid md:grid-cols-3 gap-8">
          {creditOptions.map((option) => (
            <Link
              href="/billing"
              key={option.credits}
              className={`${
                option.bgColor
              } relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                option.popular
                  ? "border-blue-500 scale-105"
                  : "border-gray-100 hover:scale-102"
              }`}
            >
              {option.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  MOST POPULAR
                </span>
              )}
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-900 mb-2">
                  <span className="text-2xl">$</span>
                  {option.price}
                </p>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {option.credits} Credits
                </p>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <ul className="text-left space-y-3 mb-8">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Get Started
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">
            Trusted by thousands of job seekers
          </p>
          <div className="flex justify-center space-x-6">
            <span className="text-gray-400">🔒 Secure Payment</span>
            <span className="text-gray-400">🎯 Instant Access</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingSection;
