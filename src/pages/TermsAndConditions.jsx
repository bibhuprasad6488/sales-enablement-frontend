import React from "react";
import HeroTermsAndConditions from "../service-section/dedicated-pages/sections/HeroTermsAndConditions";

export default function TermsConditions() {
  return (
    <>
      <HeroTermsAndConditions />
      <div className="bg-gray-50 min-h-screen w-full py-12 px-6 md:px-16">
        {/* Header */}

        {/* Content */}
        <div className="w-full grid grid-cols-2 gap-5 mx-auto mb-10">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-2">
              Welcome to The Sales Enablement Company (Pty) Ltd (“we,” “us,” or
              “our”). By accessing and using this website, you (“user,”
              “visitor,” or “you”) agree to be bound by these Terms and
              Conditions. If you do not agree, please do not use this website.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              2. Definitions
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <b>Website</b>: www.theenablement.com and all related pages.
              </li>
              <li>
                <b>Services</b>: training, coaching, consulting, and sales
                enablement solutions offered by us.
              </li>
              <li>
                <b>Content</b>: all text, graphics, design, trademarks, and
                intellectual property displayed on the website.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              3. Use of the Website
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>You agree to use this website only for lawful purposes.</li>
              <li>
                You may not attempt to gain unauthorized access, distribute
                harmful software, or use the site in a way that infringes on the
                rights of others.
              </li>
              <li>
                We reserve the right to restrict or terminate access if these
                Terms are violated.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              4. Intellectual Property
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                All content on this website is owned by or licensed to The Sales
                Enablement Company (Pty) Ltd.
              </li>
              <li>
                You may not copy, reproduce, or distribute any material without
                prior written consent.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              5. Privacy and Data Protection
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                We respect your privacy and comply with the Protection of
                Personal Information Act (POPIA).
              </li>
              <li>
                By using this website, you consent to the collection and use of
                your personal information as described in our Privacy Policy.
              </li>
              <li>
                Information collected may include your name, contact details,
                and browsing activity.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              6. Limitation of Liability
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                While we aim to keep this website accurate and up to date, we
                make no guarantees as to its completeness or reliability.
              </li>
              <li>
                We are not responsible for any loss, damage, or disruption
                arising from the use of this website.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              7. Third-Party Links
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>This website may include links to external websites.</li>
              <li>
                We are not responsible for the content, accuracy, or privacy
                practices of third-party sites.
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              8. E-Commerce (If Applicable)
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                Prices, services, and availability are subject to change without
                notice.
              </li>
              <li>
                Where applicable, refunds and returns will comply with the
                Consumer Protection Act (CPA).
              </li>
              <li>
                Payments must be made in full before delivery of any service.
              </li>
            </ul>
          </div>

          {/* Section 9 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              9. Governing Law
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                These Terms are governed by the laws of the Republic of South
                Africa.
              </li>
              <li>
                Any disputes shall be resolved in the courts of South Africa.
              </li>
            </ul>
          </div>

          {/* Section 10 */}
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              10. Changes to Terms
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>We may update or amend these Terms from time to time.</li>
              <li>
                Changes will take effect immediately once published on this
                page.
              </li>
            </ul>
          </div>

          {/* Section 11 */}
        </div>
        <div className="max-w-4xl  mx-auto mb-10">
          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-r-4  border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              11. Contact Information
            </h2>
            <p className="text-gray-600 leading-7">
              For questions or concerns regarding these Terms, please contact
              us:{" "}
              <a href="mailto:info@theenablement.com" className="text-red-500">
                info@theenablement.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
