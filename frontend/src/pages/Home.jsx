// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    
    <div
      className="flex flex-col items-center overflow-hidden"
      data-aos="fade-in"
      data-aos-delay="500"
    >
      

      
      {/* Logo at the top */}
      <div className="mb-12 mt-6 logo-container">
        <img
          src="src/assets/lexi-high-resolution-logo-transparent.png"
          alt="Lexi Logo"
          className="max-w-xs mx-auto"
        />
      </div>

      {/* Welcome text */}
      <div className=" ">
      <h1 className="text-3xl font-bold  text-[#62767c] mb-8">
        Welcome to Lexi
      </h1>
      <p className="text-[#85a193] max-w-3xl text-center mb-12">
        Your assistant for scheduling appointments, chatting, and
        more. Choose one of the options below to get started.
      </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Chat Card */}
        <div className="bg-transparent filter backdrop-blur-md rounded-lg shadow-lg border border-white  transition-transform hover:scale-95">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#62767c] mb-3">Chat</h2>
            <p className="text-gray-400 mb-4">
              Start a conversation with Lexi. Ask questions, get
              recommendations, or just say hello!
            </p>
            <Link
              to="/chat"
              className="inline-block bg-[#62767c] hover:bg-[#90a9b1] text-white  px-4 py-2 rounded-3xl "
            >
              Start Chatting
            </Link>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="bg-transparent filter backdrop-blur-md rounded-lg shadow-lg border border-white  transition-transform hover:scale-95">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#62767c] mb-3">
              Schedule
            </h2>
            <p className="text-gray-400 mb-4">
              Book appointments, set reminders, and manage your calendar with
              ease.
            </p>
            <Link
              to="/schedule"
              className="inline-block bg-[#62767c] hover:bg-[#90a9b1] text-white  px-4 py-2 rounded-3xl "
            >
              Schedule Now
            </Link>
          </div>
        </div>

        {/* Feedback Card */}
        <div className="bg-transparent filter backdrop-blur-md rounded-lg shadow-lg border border-white  transition-transform hover:scale-95">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#62767c] mb-3">
              Feedback
            </h2>
            <p className="text-gray-400 mb-4">
              Share your experience with Lexi. Your feedback helps us improve!
            </p>
            <Link
              to="/feedback"
              className="inline-block bg-[#62767c] hover:bg-[#90a9b1] text-white  px-4 py-2 rounded-3xl "
            >
              Give Feedback
            </Link>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <Link
        to="/chat"
        className="bg-[#62767c] hover:bg-[#90a9b1]  text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl mb-16"
      >
        Get Started
      </Link>
    </div>
  );
}
