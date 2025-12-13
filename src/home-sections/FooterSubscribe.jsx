import React, { useState } from "react";
import RightArrow1 from "../assets/arrow-right1.png";
import { useApi3 } from "../context/WebsiteDataContext";
import { toast } from "react-toastify";
import axios from "axios";

const FooterSubscribe = () => {
  const { websiteData } = useApi3();
  if (!websiteData) return <p></p>;

  const [email, setEmail] = useState("");

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
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (response.data?.status === "success") {
        toast.success(response.data.message, {
          pauseOnHover: false,
          closeOnClick: true,
        });
        setEmail("");
      } else {
        toast.error(response.data.message, {
          pauseOnHover: false,
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.", {
        pauseOnHover: false,
        closeOnClick: true,
      });
      console.error("Error:", error);
    }
  };

  return (
    <footer className="bg-gradient-2 text-white">
      <div className="flex flex-col md:flex-row container mx-auto justify-between items-center py-6 px-4 md:px-4">
        <img
          loading="lazy"
          src={websiteData.logo}
          alt="Logo"
          className="w-[180px] md:w-[150px] lg:w-[200px] xl:w-[300px] h-auto mb-4 md:mb-0"
        />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center sm:gap-2 md:gap-3 lg:gap-0 xl:gap-0 2xl:gap-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-full text-black border sm:px-9 md:px-10 lg:px-5 xl:px-12 text-lg md:py-3.5 lg:py-4 xl:py-4 2xl:py-4 md:w-[250px] lg:w-[430px] xl:w-[430px] border-gray-300 px-12 py-2 mb-4 sm:mb-0 sm:mr-0 md:mr-0 lg:mr-2 xl:mr-2 2xl:mr-2 focus:outline-none focus:ring-2 focus:ring-[#FA6602]"
            />
            <button
              type="submit"
              className="w-full uppercase transition-transform hover:bg-gradient-to-r from-[#060B33] to-[#383F71] hover:text-white duration-500 ease-out transform sm:px-10 md:px-6 md:py-3 sm:w-full md:w-[200px] lg:w-[250px] xl:w-[300px] flex items-center border-2 border-white text-white px-4 py-2 justify-center gap-4 hover:text-white border-btn font-medium text-sm md:text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl text-center dark:hover:text-white"
            >
              Subscribe
              <img
                loading="lazy"
                src={RightArrow1}
                alt="arrow"
                className="w-6 h-6 ml-2"
              />
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
};

export default FooterSubscribe;
