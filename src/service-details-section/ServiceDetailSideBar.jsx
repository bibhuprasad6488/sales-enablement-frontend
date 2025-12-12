import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { Link, useParams } from "react-router-dom";

const ServiceDetailSideBar = () => {
  const { slug } = useParams(); // current service slug from route
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showServices, setShowServices] = useState([]);

  // Fetch services
  useEffect(() => {
    const allServices = async () => {
      try {
        const response = await axios.get("/all-services");
        const result = response.data;
        setShowServices(result.data || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    allServices();
  }, []);

  // Handle subscribe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address (e.g: user@gmail.com)", {
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://www.email.theenablement.com/send_email.php",
        new URLSearchParams({ email }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.data?.status === "success") {
        toast.success(response.data.message);
        setEmail("");
        setIsSubscribed(true);
      } else {
        toast.error(response.data.message || "Subscription failed");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Error:", error);
    }
  };
  return (
    <aside className="w-full h-full lg:w-1/6 xl:w-1/3 2xl:w-1/5 bg-gray-100 p-6 shadow-lg md:block sticky top-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Our Services
      </h2>

      {/* Services List */}
      <div className="space-y-4 mb-8 grid gap-1">
        {showServices?.map((service) => (
          <Link
            key={service.slug}
            to={
              service.indp === "1"
                ? `/service/sales-force-details/${service.slug}`
                : service.indp === "2"
                ? `/service/sales-candidate-details/${service.slug}`
                : `/service/${service.slug}`
            }
            state={service}
            className={`flex items-center justify-between p-4 cursor-pointer rounded-lg shadow-md border transition-all duration-300
              ${
                slug === service.slug
                  ? "bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white"
                  : "bg-white text-gray-800 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#DB0032] hover:to-[#FA6602] hover:text-white"
              }
            `}
          >
            <span className="font-medium">{service.title}</span>
            <BsArrowRight />
          </Link>
        ))}

        {/* {showServices?.length > 5 && (
          <div
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:text-white hover:bg-gradient-to-r from-[#DB0032] to-[#FA6602] transition-all duration-300"
            onClick={() => (window.location.href = "/our-services")}
          >
            <span className="font-medium">More Services</span>
            <BsArrowRight />
          </div>
        )} */}
      </div>

      {/* Subscribe Form */}
      {/* <div className="py-6 px-4 bg-gray-200 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Get Updates
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Subscribe via email and get the latest news, updates, and exclusive
          offers.
        </p>
        <div className="mt-6 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-md w-full bg-white p-2 rounded-lg shadow-md"
          >
            <input
              type="email"
              placeholder="Email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 relative flex items-center justify-center group bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white rounded-md transition"
            >
              <span className="absolute inset-0 w-0 h-full bg-[#060b33] rounded-md transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-gradient-to-tr group-hover:from-[#060b33] group-hover:to-[#383f71]"></span>
              <span className="relative">Subscribe</span>
            </button>
          </form>
        </div>

        {isSubscribed && (
          <div className="mt-4 text-center text-green-600">
            Thank you for subscribing!
          </div>
        )}
      </div> */}
    </aside>
  );
};

export default ServiceDetailSideBar;
