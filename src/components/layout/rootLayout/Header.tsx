"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import { navLinks } from "./navLinks";


const Header = () => {
  const {
    userInformation: { email },
  } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);


  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const normalizedPath = pathname.replace(/^\/(en|bn)(?=\/|$)/, "") || "/";

  return (
    <header className="relative">
      <div className="fixed w-full h-20 md:h-24 lg:h-40 bg-white z-50">
        {/* 🔹 Top Black Accessibility Bar (Desktop only) */}
        <div className="hidden lg:flex items-center w-full h-12 bg-pureBlack">
          <div
            className="container px-4 sm:px-6 lg:px-8"
            aria-label="Nav bar"
            tabIndex={0}
          >
            <div className="text-white text-xs sm:text-sm px-2 sm:px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">

              {/* Right Links */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 items-center">
                {/* <LanguageToggle /> */}
                {/* <Link href="/accessibility">{t("accessibility")}</Link> */}
                <Link href="/event-calendar">event Calendar</Link>
                {/* <Link href="/privacy">{t("privacyPolicy")}</Link> */}
                {email ? (
                  <ProfileDropdown />
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Main White Navbar */}
        <div className="h-20 md:h-24 lg:h-28 shadow-lg flex items-center relative">
          <div className="container flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/"
                aria-label="Disability Inclusion Resource Hub"
                className="shrink-0"
              >
                <h2 className="font-inter text-base sm:text-lg text-[#0077CC] font-bold leading-tight">
                  Disability Inclusion
                  <br /> Resource Hub
                </h2>
                <p className="font-inter font-medium text-xs sm:text-sm text-[#666666]">
                  Bangladesh
                </p>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex font-normal divide-x divide-gray-300 text-sm">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? normalizedPath === "/"
                    : normalizedPath.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className="group relative pb-1 px-2"
                  >
                    <div className="px-2 sm:px-4">
                      <span
                        className={`whitespace-nowrap ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-[#666666]"
                        }`}
                      >
                        {label}
                      </span>
                      <span
                        className={`absolute -inset-x-1 -bottom-0.5 h-0.75 transition-all duration-300 ease-in-out mx-auto ${
                          isActive
                            ? "w-9/12 bg-red-700"
                            : "w-0 group-hover:w-9/12"
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Drawer (slides under navbar) */}
      <div
        className={`lg:hidden fixed z-40 right-0 top-20 md:top-24 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 space-y-8 h-full overflow-y-auto">
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
              Main Menu
            </h4>
            <nav className="flex flex-col space-y-2">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? normalizedPath === "/"
                    : normalizedPath.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 px-3 rounded-md text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-primary font-medium bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <hr className="border-gray-200" />
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
              Accessibility & Info
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <Link href="/accessibility" onClick={() => setMobileOpen(false)}>
                accessibility
              </Link>

              
            </div>
          </div>
          <hr className="border-gray-200" />
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
              Profile & Settings
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              {email ? (
                <ProfileDropdown />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 hover:text-primary"
                >
                  login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed duration-300 top-20 md:top-24 z-30 inset-0 ${
          mobileOpen
            ? "backdrop-blur-sm bg-black/40"
            : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
    </header>
  );
};

export default Header;
