import React, { useState } from "react";
import DesktopMenu from "../nav-menu/DesktopMenu";
import MobileMenu from "../nav-menu/MobileMenu";
import { useApi3 } from "../context/WebsiteDataContext";
import { useApi } from "../context/ServiceContextApi";
import { useApi2 } from "../context/CourseContextApi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { name: "Home", route: "/" },
    // { name: "About Us", route: "/about-us" },
    { name: "Who we are", route: "/who-we-are" },
    { name: "Services", route: "/services" },
    { name: "Courses", route: "/courses" },
    { name: "Blog", route: "/blogs" },
    { name: "Contact Us", route: "/contact-us" },
  ];


  const toggleDropdown = (dropdownName) => {
    setDropdownOpen(dropdownOpen === dropdownName ? null : dropdownName);
  };

    const { websiteData,  } = useApi3();
    if (!websiteData) return <p></p>

    const { serviceData,  } = useApi();
      if (!serviceData) return <p></p>;
  
      const { courseData,  } = useApi2();
      if (!courseData) return <p></p>;
  
  return (
    <section className="container mx-auto px-4 z-50">
      <nav className="text-white">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">
            <a href="/">
              <img src=   {websiteData.logo} alt="Logo" className="w-[170px] h-auto" />
            </a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <DesktopMenu
            links={links}
            courses={courseData}
            services={serviceData}
            dropdownOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
          />
        </div>

        <MobileMenu
          links={links}
          courses={courseData}
          services={serviceData}
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
        />
      </nav>
    </section>
  );
}

export default Navbar;
