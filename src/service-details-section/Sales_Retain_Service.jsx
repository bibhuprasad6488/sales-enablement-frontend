import React from "react";
import { CheckCircle } from "lucide-react";
import { Oval } from "react-loader-spinner";

const ServiceDetailSection = ({ serviceDetails }) => {
  if (!serviceDetails) return <p></p>;

  return (
    <section className="w-full lg:w-3/4">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-[25px] font-extrabold text-gray-900">
          {serviceDetails.title}
        </h2>
        <div className="mt-3 mx-auto h-1 w-32 bg-gradient-to-r from-red-500 to-pink-600 rounded"></div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center text-gray-600 mb-12">
        <p className="text-lg md:text-xl leading-relaxed font-medium">
          At The Sales Enablement Company, we don’t just train your sales team —
          we partner with you to build a culture of consistent, measurable
          performance. Our retainers provide ongoing training, coaching, and
          strategic support designed to shorten ramp-up time, increase win
          rates, and drive revenue growth.
        </p>
      </div>

      {/* Why a Retainer */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 mb-16">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Why a Retainer?
        </h3>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-700 text-base">
          {[
            "Continuous skill development & reinforcement",
            "Structured onboarding for new hires",
            "On-demand access to expert sales advisory",
            "Data-driven performance insights",
            "Alignment between Sales, Marketing, and Product",
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 bg-white shadow-sm p-3 rounded-lg hover:shadow-md transition"
            >
              <CheckCircle className="text-red-500 w-5 h-5 mt-1 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Retainer Packages */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Light Package */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:scale-105 hover:shadow-2xl transition duration-300">
          <h4 className="text-2xl font-bold text-blue-600 mb-3">Light Plan</h4>
          <p className="text-sm text-gray-600 mb-5">
            For smaller teams starting their enablement journey.
          </p>
          <ul className="space-y-3 text-gray-700">
            {[
              "Monthly training session (2 hrs)",
              "Quarterly sales performance review",
              "Sales scripts, templates & frameworks",
              "2 advisory calls per month",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Standard Package (Highlighted) */}
        <div className="relative bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500 hover:scale-105 hover:shadow-2xl transition duration-300">
          <h4 className="text-2xl font-bold text-green-600 mb-3">
            Standard Plan
          </h4>
          <p className="text-sm text-gray-600 mb-5">
            For growing teams needing continuous coaching.
          </p>
          <ul className="space-y-3 text-gray-700">
            {[
              "Everything in Light",
              "Bi-weekly coaching calls",
              "Monthly skills workshop (2 hrs)",
              "Onboarding playbook for new hires",
              "CRM & tool adoption audits",
              "4 advisory calls per month",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Package */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-200 hover:scale-105 hover:shadow-2xl transition duration-300">
          <h4 className="text-2xl font-bold text-purple-600 mb-3">
            Premium Plan
          </h4>
          <p className="text-sm text-gray-600 mb-5">
            For scaling organisations that want a hands-on partner.
          </p>
          <ul className="space-y-3 text-gray-700">
            {[
              "Everything in Standard",
              "Weekly coaching & pipeline reviews",
              "Customized sales playbook",
              "Role-plays & deal clinics",
              "Monthly win/loss reports",
              "Quarterly cross-functional workshops",
              "Unlimited advisory support",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Closing Section */}
      <div className="mt-16 text-center">
        <p className="text-lg font-semibold text-gray-900">
          All retainers require a minimum 3-month commitment.
        </p>
        <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
          With a sales enablement retainer, your team doesn’t just learn — they
          transform. We embed enablement into your sales process, ensuring that
          skills, tools, and strategies translate into revenue impact.
        </p>

        <div className="text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-8 rounded-2xl shadow-lg mt-10 inline-block max-w-xl">
          <h3 className="text-2xl font-bold">
            Ready to Transform Your Sales Team?
          </h3>
          <p className="mt-3 text-base">
            Let’s unlock your team’s full potential together.
          </p>
          <p className="mt-1 text-sm opacity-90">
            Contact us today to book a discovery call and find the right package
            for your business.
          </p>
          <a
            href="https://calendly.com/theenablement/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-white text-[#DB0032] font-semibold rounded-lg shadow hover:scale-105 transition"
          >
            CRM Free Diagnosis
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailSection;
