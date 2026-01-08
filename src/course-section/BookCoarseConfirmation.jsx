// BookingConfirmation.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import axios from "../api/axios";
const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { course, bookingData } = location.state || {};
  const courseName = course?.name || "Selected Course";

  const [websiteData, setWebsiteData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/get-website-data");
        setWebsiteData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section>
        <div className="relative w-full h-full course-bg">
          <div className="relative bg-layer">
            <Navbar />
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-6 sm:px-4 sm:pt-16">
              <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-bold">
                Booking Confirmation
              </h1>
            </div>
            <div className="text-white flex items-center justify-center container mx-auto px-4 pt-4 pb-10 sm:px-4 sm:pt-10 sm:pb-20">
              <Breadcrumb
                breadcrumbs={[
                  { label: "Course", to: "/" },
                  { label: "Booking Courses", to: "/booking-course/general" },
                  { label: "Confirmation" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-10 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Application submitted
          </h2>

          <p className="text-gray-600 mb-6">
            Please check your email for further instructions regarding your
            application process.
            <br />
            You can review all application progress on the{" "}
            <span className="font-semibold">My learning journey</span> tab in
            your Profile.
          </p>

          {/* Course Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Course Details
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Course Name:</span> {courseName}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Amount Payable:</span> R 
              {course?.fees || "0"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Booking Reference:</span>{" "}
              {bookingData?.ref_no}
            </p>
          </div>

          {/* Banking Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Please use the banking details below to make payment
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Bank:</span>{" "}
                {websiteData.bank_name}
              </li>
              <li>
                <span className="font-medium">Account Number:</span>{" "}
                {websiteData.bank_account_no}
              </li>
              <li>
                <span className="font-medium">Branch Name:</span>{" "}
                {websiteData.branch_name}
              </li>
              <li>
                <span className="font-medium">Branch Code:</span>{" "}
                {websiteData.branch_code}
              </li>
              <li>
                <span className="font-medium">Swift Code:</span>{" "}
                {websiteData.swift_code}
              </li>
              <li>
                <span className="font-medium">Account Name:</span>{" "}
                {websiteData.account_name}
              </li>
              <li>
                <span className="font-medium">Reference:</span> Use your{" "}
                <span className="italic">ID number</span> or{" "}
                <span className="italic">invoice number</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingConfirmation;
