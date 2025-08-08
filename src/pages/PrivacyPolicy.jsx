import React from "react";
import HeroPrivacyPolicy from "../service-section/dedicated-pages/sections/HeroPrivacyPolicy";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApi3 } from "../context/WebsiteDataContext";

function PrivacyPolicy() {
     const { websiteData,  } = useApi3();
          if (!websiteData) return <p></p>
  return (

    <>
    <HeroPrivacyPolicy/>
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Privacy Policy</h1>
        <p className="text-gray-600 leading-relaxed text-center mb-8">
          This Privacy Policy explains how <span className="font-semibold">{websiteData.title}</span> collects, uses, and discloses information when you use our website and services.
        </p>
        

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Information We Collect</h2>
          <p className="text-gray-600 mt-2">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            <li><span className="font-semibold">Personal Information:</span> Name, Email address, Phone number, Mailing address, Demographic information (e.g., age, gender).</li>
            <li><span className="font-semibold">Usage Data:</span> IP address, Browser type, Pages visited, Time spent on pages, Referrer URL.</li>
          </ul>
        </section>

   
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">How We Use Your Information</h2>
          <p className="text-gray-600 mt-2">We may use your information to:</p>
          <ul className="list-disc pl-6 text-gray-600 mt-2">
            <li>Provide and maintain our services</li>
            <li>Improve our services</li>
            <li>Communicate with you</li>
            <li>Personalize your experience</li>
            <li>Analyze website usage</li>
            <li>Conduct market research</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

     
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Data Security</h2>
          <p className="text-gray-600 mt-2">
            We take reasonable measures to protect your information from unauthorized access, use, and disclosure. However, no method of transmission over the internet is completely secure.
          </p>
        </section>


        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mt-2">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>
        </section>

    
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions, please <a href="/contact-us" className="font-semibold text-red-600 hover:text-red-400 hover:underline ml-1">contact us</a>.
          </p>
        </section>
        <Link
              to="/"
              className="mt-4 inline-flex items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-lg shadow-lg hover:opacity-90 transition-all"
            >
              Back To Home <FaArrowRight className="ml-2" />
            </Link>
      </div>
     
    </div>
    </>
  );
}

export default PrivacyPolicy;