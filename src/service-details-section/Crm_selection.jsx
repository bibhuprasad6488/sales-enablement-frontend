import React from "react";
import { CheckCircle } from "lucide-react";

const CRMServices = ({ serviceDetails }) => {
  return (
    <section className="w-full lg:w-3/4">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {serviceDetails.title}
        </h2>
        <div className="mt-3 mx-auto h-1 w-32 bg-gradient-to-r from-[#DB0032] to-[#FA6602] rounded"></div>
      </div>

      <div className="max-w-3xl mx-auto text-center text-gray-600 mb-12">
        <p className="text-lg md:text-xl leading-relaxed font-medium">
          Your CRM should be more than a database — it should be the{" "}
          <strong>engine that drives sales productivity.</strong> We help you
          choose the right CRM, align it with your sales process, and integrate
          it seamlessly with the tools your team already uses.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          How We Help
        </h3>
        <ul className="space-y-4 text-gray-700">
          {[
            "CRM selection aligned with your sales process and growth goals",
            "Installation & configuration of sales stages, data fields, and user roles",
            "Integration with email, calendars, marketing automation, and sales tools",
            "Tailored team training for faster adoption",
            "Custom dashboards for pipeline visibility and coaching insights",
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 bg-white shadow-sm p-3 rounded-lg hover:shadow-md transition"
            >
              <CheckCircle className="text-blue-500 w-5 h-5 mt-1 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-gray-800 font-medium">
          With the right CRM setup, your team gains{" "}
          <strong>
            better visibility, improved coaching insights, and faster deal
            cycles
          </strong>{" "}
          — all while boosting adoption and productivity.
        </p>
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://calendly.com/theenablement/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white font-semibold rounded-lg shadow hover:scale-105 transition"
        >
          CRM Free Diagnosis
        </a>
      </div>
    </section>
  );
};

export default CRMServices;
