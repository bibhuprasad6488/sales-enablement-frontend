
import React from "react";
import { Disclosure } from "@headlessui/react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

const ContactDetails = ({ course }) => {
  if (!course || !course.contact_details || course.contact_details.length === 0) {
    return <p className="text-center text-gray-500"></p>;
  }

  return (
    <div className="space-y-6 bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg">
      <h1 className="uppercase text-3xl font-bold text-[#DB0032] text-center mb-8">
        Contact Details
      </h1>

      {course.contact_details.map((contact, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-[#DB0032]"
        >
          <h2 className="text-xl font-semibold text-gray-800">{contact.name || "N/A"}</h2>

          <div className="flex flex-col md:flex-row md:space-x-6 mt-4">
            {/* Contact Info */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 font-medium text-gray-700">
                <FaPhoneAlt className="text-[#DB0032]" />
                <span>{contact.phone_no || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2 font-medium text-gray-700">
                <FaEnvelope className="text-[#DB0032]" />
                <span>{contact.email || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2 font-medium text-gray-700">
                <FaMapMarkerAlt className="text-[#DB0032]" />
                <span>{contact.address || "N/A"}</span>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mt-4 md:mt-0 flex-grow">
              {contact.notes?.length > 0 && (
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="w-full text-left py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-lg transition-all hover:bg-gray-200">
                        {open ? "Hide Notes" : "View Notes"}
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-4">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          {contact.notes.map((note, idx) => (
                            <li key={idx}>{note}</li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-6 py-2 text-white bg-[#DB0032] rounded-lg shadow-md hover:bg-red-700 transition-all flex items-center space-x-2">
              <FaCalendarAlt />
              <span>Schedule Meeting</span>
            </button>
            <button className="px-6 py-2 text-white bg-[#383F71] rounded-lg shadow-md hover:bg-[#060B33] transition-all flex items-center space-x-2">
              <FaEnvelope />
              <span>Send Email</span>
            </button>
            <button className="px-6 py-2 text-[#DB0032] bg-[#fff] rounded-lg shadow-md hover:bg-[#383F71] hover:text-[#fff] transition-all flex items-center space-x-2">
              <FaFileAlt />
              <span>View Proposal</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactDetails;
