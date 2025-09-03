import React, { useState } from "react";
import HeroPrivacyPolicy from "../service-section/dedicated-pages/sections/HeroPrivacyPolicy";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "information-use", title: "3. How We Use Your Information" },
    { id: "information-sharing", title: "4. Sharing of Information" },
    { id: "cookies", title: "5. Cookies and Tracking" },
    { id: "data-security", title: "6. Data Security" },
    { id: "rights", title: "7. Your Rights Under POPIA" },
    { id: "data-retention", title: "8. Retention of Data" },
    { id: "policy-changes", title: "9. Changes to this Policy" },
    { id: "contact", title: "10. Contact Us" },
  ];

  return (
    <>
      <HeroPrivacyPolicy />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Main Content Area */}
        <div className="w-full mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sticky Navigation */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-3">
                  Policy Sections
                </h2>
                <nav>
                  <ul className="space-y-3">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => {
                            setActiveSection(section.id);
                            document
                              .getElementById(section.id)
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`w-full text-left py-3 px-4 rounded-lg transition-all flex items-center ${
                            activeSection === section.id
                              ? "bg-gray-100 text-gray-800 border-l-4 border-[#db7500] font-medium"
                              : "hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Content Sections */}
            <main className="lg:w-3/4">
              <div className="space-y-12">
                {/* Introduction */}
                <section
                  id="introduction"
                  className="pb-6 border-b border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      1
                    </span>
                    Introduction
                  </h2>
                  <div className="pl-14">
                    <p className="text-gray-700 ">
                      We respect your privacy and are committed to protecting
                      your personal information. This Privacy Policy explains
                      how The Sales Enablement Company (Pty) Ltd ("we," "us," or
                      "our") collects, uses, and protects your personal
                      information in accordance with the Protection of Personal
                      Information Act (POPIA) and other applicable laws in South
                      Africa.
                    </p>
                  </div>
                </section>

                {/* Information We Collect */}
                <section
                  id="information-collected"
                  className="pb-4 border-b border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      2
                    </span>
                    Information We Collect
                  </h2>
                  <div className="pl-14">
                    <p className="mb-6 text-gray-700">
                      We may collect the following types of information:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-3">
                          Personal details
                        </h3>
                        <p className="text-gray-700 text-sm font-thin">
                          Name, surname, company, job title.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-3">
                          Contact details
                        </h3>
                        <p className="text-gray-700 text-sm font-thin">
                          Email address, phone number, business address.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-3">
                          Website usage data
                        </h3>
                        <p className="text-gray-700 text-sm font-thin">
                          IP address, browser type, pages visited, and cookies.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-3">
                          Service-related information
                        </h3>
                        <p className="text-gray-700 text-sm font-thin">
                          Details you provide when enquiring about or using our
                          services.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section
                  id="information-use"
                  className="pb-4 border-b border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      3
                    </span>
                    How We Use Your Information
                  </h2>
                  <div className="pl-14">
                    <p className="mb-6 text-gray-700">
                      We use personal information for the following purposes:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4 mt-1">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Service Provision
                          </h3>
                          <p className="text-gray-600">
                            To provide and improve our services.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4 mt-1">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Customer Support
                          </h3>
                          <p className="text-gray-600">
                            To respond to enquiries, proposals, and service
                            requests.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4 mt-1">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Marketing Communications
                          </h3>
                          <p className="text-gray-600">
                            To send updates, offers, or marketing communications
                            (with your consent).
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4 mt-1">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Legal Compliance
                          </h3>
                          <p className="text-gray-600">
                            To comply with legal obligations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Sharing of Information */}
                <section
                  id="information-sharing"
                  className="pb-4 border-b border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      4
                    </span>
                    Sharing of Information
                  </h2>
                  <div className="pl-14">
                    <p className="mb-6 text-gray-700">
                      We do not sell or rent personal information. We may share
                      information with:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          •
                        </span>
                        <span className="text-gray-700">
                          Service providers who assist in delivering our
                          services.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          •
                        </span>
                        <span className="text-gray-700">
                          Legal or regulatory authorities when required by law.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          •
                        </span>
                        <span className="text-gray-700">
                          Business partners, only where necessary and with
                          appropriate safeguards.
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Cookies and Tracking */}
                <section id="cookies" className="pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      5
                    </span>
                    Cookies and Tracking
                  </h2>
                  <div className="pl-14">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          •
                        </span>
                        <span className="text-gray-700">
                          Our website uses cookies to improve user experience
                          and analyse site traffic.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          •
                        </span>
                        <span className="text-gray-700">
                          You can disable cookies in your browser settings, but
                          some features may not function properly.
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Data Security */}
                <section
                  id="data-security"
                  className="pb-4 border-b border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      6
                    </span>
                    Data Security
                  </h2>
                  <div className="pl-14">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          •
                        </span>
                        <span className="text-gray-700">
                          We take reasonable, technical, and organisational
                          measures to protect personal information from loss,
                          misuse, or unauthorised access.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          •
                        </span>
                        <span className="text-gray-700">
                          However, no method of transmission over the internet
                          is 100% secure.
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Your Rights Under POPIA */}
                <section id="rights" className="pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      7
                    </span>
                    Your Rights Under POPIA
                  </h2>
                  <div className="pl-14">
                    <p className="mb-6 text-gray-700">
                      As a data subject, you have the right to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-2">
                          Access Information
                        </h3>
                        <p className="text-gray-600">
                          Access the personal information we hold about you.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-2">
                          Correction & Deletion
                        </h3>
                        <p className="text-gray-600">
                          Request correction or deletion of your personal
                          information.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-2">
                          Withdraw Consent
                        </h3>
                        <p className="text-gray-600">
                          Withdraw consent for marketing communications at any
                          time.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <h3 className="font-medium text-gray-800 mb-2">
                          Lodge Complaints
                        </h3>
                        <p className="text-gray-600">
                          Lodge a complaint with the Information Regulator at
                          complaints.IR@justice.gov.za.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Retention of Data */}
                <section
                  id="data-retention"
                  className="pb-4 border-b border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      8
                    </span>
                    Retention of Data
                  </h2>
                  <div className="pl-14">
                    <p className="text-gray-700 ">
                      We will retain personal information only as long as
                      necessary to fulfil the purposes outlined in this policy,
                      unless a longer retention period is required by law.
                    </p>
                  </div>
                </section>

                {/* Changes to this Policy */}
                <section
                  id="policy-changes"
                  className="pb-4 border-b border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      9
                    </span>
                    Changes to this Policy
                  </h2>
                  <div className="pl-14">
                    <p className="text-gray-700 ">
                      We may update this Privacy Policy from time to time.
                      Updates will be posted on this page with the latest
                      revision date.
                    </p>
                  </div>
                </section>

                {/* Contact Us */}
                <section id="contact">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                    <span className="bg-gray-100 text-gray-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                      10
                    </span>
                    Contact Us
                  </h2>
                  <div className="pl-14">
                    <p className="mb-6 text-gray-700">
                      For any questions or requests regarding this Privacy
                      Policy, please contact:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <a
                        href="mailto:info@theenablement.com"
                        className="text-l font-medium text-gray-800 hover:text-[#DB0032] transition-colors"
                      >
                        info@theenablement.com
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
