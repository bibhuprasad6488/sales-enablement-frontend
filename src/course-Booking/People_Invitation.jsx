import axios from "../api/axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const People_Invitation = () => {
    const userId = localStorage.getItem("user_id");
    console.log(userId);

    const location = useLocation();
    const courses = location.state?.course;
    const courseId = courses?.id || "";
    console.log(courseId);
  const [shareData, setShareData] = useState({
    recipientName: "",
    recipientSurName: "",
    recipientEmail: "",
  });

  const [error, setError] = useState({
    recipientName: "",
    recipientSurName: "",
    recipientEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShareData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const { recipientName, recipientSurName, recipientEmail } = shareData;

    // Validate inputs
    const newErrors = {
      recipientName: !recipientName ? "Please enter recipient name" : "",
      recipientSurName: !recipientSurName
        ? "Please enter recipient surname"
        : "",
      recipientEmail: !recipientEmail
        ? "Please enter recipient email"
        : !/\S+@\S+\.com$/.test(recipientEmail)
        ? "Email must be valid and end with .com"
        : "",
    };

    setError(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");

    if (!isValid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    // If valid, send data to API
    try {
      const currenturl = window.location.href;
      const payload = {
        receipt_fname: recipientName,
        receipt_lname: recipientSurName,
        receipt_email: recipientEmail,
        user_id: userId,
        course_id: courseId,
        course_url: currenturl,
      };

      const response = await axios.post("invite-other", payload);
      console.log(response.data);

      toast.success("Data shared successfully");

      // Reset form
      setShareData({
        recipientName: "",
        recipientSurName: "",
        recipientEmail: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to share data. Please try again.");
    }
  };

  return (
    <section className="flex flex-col gap-4 w-full justify-center px-4">
      <div className="w-full md:w-4/5 mx-auto flex flex-col gap-7 justify-center border-b-4 border-orange-400 rounded-lg shadow-xl py-10 px-6">
        <h1 className="font-bold capitalize text-xl">Share this with others</h1>
        <hr />
        <form className="space-y-3 w-full grid gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-1.5">
            <label>Recipient name</label>
            <input
              name="recipientName"
              placeholder="Recipient name"
              value={shareData.recipientName}
              onChange={handleChange}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
            />
            {error.recipientName && (
              <p className="text-red-500 text-xs mt-1">{error.recipientName}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <label>Recipient surname</label>
            <input
              name="recipientSurName"
              placeholder="Recipient surname"
              value={shareData.recipientSurName}
              onChange={handleChange}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
            />
            {error.recipientSurName && (
              <p className="text-red-500 text-xs mt-1">
                {error.recipientSurName}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <label>Recipient email</label>
            <input
              name="recipientEmail"
              placeholder="Email address"
              value={shareData.recipientEmail}
              onChange={handleChange}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg bg-slate-100"
            />
            {error.recipientEmail && (
              <p className="text-red-500 text-xs mt-1">
                {error.recipientEmail}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#DB0032] to-[#FA6602] 
             hover:from-[#FA6602] hover:to-[#DB0032] 
             transition-all duration-300 justify-self-start inline-block"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default People_Invitation;
