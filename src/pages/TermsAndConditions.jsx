import React from "react";
import HeroTermsAndConditions from "../service-section/dedicated-pages/sections/HeroTermsAndConditions";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useApi3 } from "../context/WebsiteDataContext";

function TermsAndConditions() {
    const { websiteData,  } = useApi3();
        if (!websiteData) return <p></p>
  return (
    <>
      <HeroTermsAndConditions />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
        <div className="max-w-5xl w-full bg-white p-10 rounded-xl shadow-lg border border-gray-300">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Terms & Conditions</h1>
          <p className="text-gray-600 text-center mt-2">
            Welcome to <span className="font-semibold">{websiteData.title}</span> platform. By using our services, you agree to the following terms and conditions.
          </p>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-700">1. Authorized Use</h2>
              <p className="text-gray-600 mt-2">
                This platform is intended for <span className="font-semibold">authorized sales representatives, managers, and partners</span>. Unauthorized use, credential sharing, or data misuse is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700">2. Data Protection & Privacy</h2>
              <p className="text-gray-600 mt-2">
                We adhere to <span className="font-semibold">GDPR</span> and industry best practices to secure your data. Read our
                <Link to="/privacy-policy" className="text-red-600 hover:text-red-400 hover:underline ml-1">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700">3. Intellectual Property</h2>
              <p className="text-gray-600 mt-2">
                All materials, playbooks, and training content are proprietary to <span className="font-semibold">The Sales Enablement</span>. Unauthorized distribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700">4. Platform Updates</h2>
              <p className="text-gray-600 mt-2">
                We may update features, pricing, and access levels. Users will be notified of major changes via email or platform alerts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700">5. Compliance & Conduct</h2>
              <p className="text-gray-600 mt-2">
                Users must follow ethical sales practices, data protection laws, and maintain professionalism when interacting with clients and resources.
              </p>
            </section>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600">By continuing, you acknowledge acceptance of these terms.</p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-lg shadow-lg hover:opacity-90 transition-all"
            >
              Back To Home <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions;
