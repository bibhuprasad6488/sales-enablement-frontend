import React from "react";
import { Link } from "react-router-dom";
import ErrorImg from "../assets/404 -error.gif";
import { FaArrowRight } from "react-icons/fa"; 
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="flex justify-center mb-8">
        <img
          src={ErrorImg}
          alt="Cartoon 404 Animation"
          className="w-full"
        />
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">Hey!</h1>
        <h2 className="text-3xl font-semibold mb-2">We are not here...</h2>
        <p className="text-xl mb-4">Oops! Looks like you're lost.</p>
        <p>
        <Link
          to="/"
          className="bg-gradient-to-r from-[#DB0032] to-[#FA6602] text-white hover:bg-gradient-to-bl focus:outline-none px-6 py-3 rounded-md text-xl font-semibold hover:bg-gray-200 transition duration-300 mb-4 inline-flex items-center gap-2"
        >
          Go Back to Homepage
          <FaArrowRight className="text-white" size={20} />
        </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
