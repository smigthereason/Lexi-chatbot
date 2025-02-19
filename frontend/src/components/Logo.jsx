// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../assets/lexi-high-resolution-logo-transparent.png"

export default function LogoComponent() {
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
      <Link to="/">
        {/* Logo at the top */}
        <div className="mb-12 mt-6 logo-container">
          <img
            src={Logo}
            alt="Lexi Logo"
            className="max-w-xs mx-auto"
          />
        </div>
      </Link>
    </div>
  );
}
