// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu, X } from "lucide-react";
import Logo from "./assets/lexi-high-resolution-logo-transparent.png"

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarLinks = [
    { title: "Chat", path: "/chat" },
    { title: "Scheduler", path: "/schedule" },
    { title: "Feedback", path: "/feedback" },
  ];

  const Sidebar = ({ className = "h-11/12" }) => (
    <aside
      className={`bg-transparent filter backdrop-blur-md border border-[#62767c] rounded-2xl shadow-sm flex flex-col ${className}`}
    >
      <div className="p-4 flex items-center gap-2">
        <div>
          <Link to="/">
            <img
              className="  h-20 w-40 sm:h-auto sm:w-60"
              src={Logo}
              alt="Lexi"
            />
          </Link>
        </div>
        {/* Close button for mobile sidebar */}
        {isMobileMenuOpen && (
          <button
            className="ml-auto text-gray-400 sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <nav className="mt-4 px-2 flex-1 overflow-hidden hover:overflow-y-auto">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-xl mb-1 ${
                isActive
                  ? "text-white bg-[#62767c] font-medium"
                  : "text-gray-600 hover:bg-[#62767c] hover:text-white"
              }`
            }
          >
            <span>{link.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  Sidebar.propTypes = {
    className: PropTypes.string,
  };

  return (
    <div className="h-screen flex flex-col md:flex-row p-2 sm:p-4 gap-4">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-full">
        <Sidebar />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 animate-slide-right">
            <Sidebar className="h-full" />
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        {!isMobileMenuOpen && (
          <div className="p-4">
            <button
              className="text-gray-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-10 h-10 relative left-36 text-[#62767c]" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-4 min-w-0 h-11/12">
        <main className="flex-1 bg-transparent filter backdrop-blur-md border border-[#62767c] rounded-2xl shadow-sm p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
