import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalesCoaching = ({ serviceDetails }) => {
  if (!serviceDetails) return <p></p>;
const navigate = useNavigate()
  return (
    <section className="w-full lg:w-3/4">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-[25px] font-extrabold text-gray-900">
          {serviceDetails.title}
        </h2>
        <div className="mt-2 mx-auto h-1 w-32 bg-gradient-to-r from-red-500 to-pink-600 rounded"></div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center text-gray-600 mb-12">
        <p className="text-lg md:text-xl leading-relaxed font-medium">
          At The Sales Enablement Company, we believe that{" "}
          <strong>training sparks change — but coaching sustains it.</strong>{" "}
          Our sales coaching programs provide the personalized support and
          accountability your sales team needs to transform knowledge into
          measurable results.
        </p>
      </div>

      {/* Sales Coaching Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 mb-16">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Sales Coaching Programs
        </h3>
        <p className="text-gray-700 mb-6">
          Through <strong>one-on-one and group coaching</strong>, we help your
          salespeople apply proven techniques to real opportunities, build
          confidence, and sharpen critical skills like prospecting, discovery,
          negotiation, and closing. We also coach{" "}
          <strong>sales managers</strong> to lead with proven frameworks and
          foster a culture of continuous growth.
        </p>

        <h4 className="text-xl font-bold text-gray-800 mb-4">
          Our coaching approach combines:
        </h4>
        <ul className="space-y-3 text-gray-700">
          {[
            "Tailored feedback and support for individual reps",
            "Reinforcement of core sales skills and methodologies",
            "Practical deal coaching on live opportunities",
            "Mindset development to build resilience and confidence",
            "Ongoing accountability and performance tracking",
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

        <p className="mt-6 text-gray-800 font-medium">
          With sales coaching, your team doesn’t just learn — they{" "}
          <strong>consistently perform at their best</strong>, driving stronger
          results, faster ramp-up times, and higher win rates.
        </p>

        {/* CTA */}
        <div className="text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] p-6 rounded-2xl shadow-lg mt-10 text-center">
          <h3 className="text-xl font-bold">Schedule A Free Consultation</h3>
          <p className="mt-2 text-sm opacity-90">
            Let’s unlock your team’s potential together.
          </p>
          <a
            href="https://calendly.com/theenablement/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-white text-[#DB0032] font-semibold rounded-lg shadow hover:scale-105 transition"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Recruitment Services */}
      
    </section>
  );
};

export default SalesCoaching;
