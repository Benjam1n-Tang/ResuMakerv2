"use client";
import { navLinks } from "@/data/constants";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "@/context/userContext";
import ThemeSwitch from "./ThemeSwitch";

type HamburgerProps = {
  setActive: (href: string) => void;
};

const Hamburger = ({ setActive }: HamburgerProps) => {
  const { clearUser } = useContext(UserContext);

  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<SVGSVGElement | null>(null);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleSignOut = () => {
    clearUser();
    router.replace("/");
  };

  const openLink = (href: string) => {
    setToggle(false);
    setActive(href);
    router.push(href);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div className="flex lg:hidden">
      {toggle ? (
        <svg
          ref={buttonRef}
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 text-dark-t hover:bg-primary-dark cursor-pointer z-20"
          onClick={handleToggle}
          viewBox="0 0 56 56"
        >
          <path
            fill="currentColor"
            d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922c11.039 0 19.921 8.883 19.945 19.922c.023 11.063-8.883 19.922-19.922 19.922m-8.016-9.984c.516 0 .985-.211 1.336-.586l6.657-6.68l6.656 6.68c.351.351.82.586 1.36.586c1.03 0 1.874-.868 1.874-1.899c0-.539-.21-.984-.562-1.336l-6.657-6.656l6.68-6.703c.375-.399.563-.797.563-1.313a1.865 1.865 0 0 0-1.875-1.875c-.493 0-.915.164-1.313.563l-6.727 6.703l-6.703-6.68c-.351-.375-.773-.539-1.289-.539c-1.054 0-1.875.797-1.875 1.852c0 .515.188.96.563 1.312l6.656 6.68l-6.656 6.68c-.375.328-.563.796-.563 1.312c0 1.031.82 1.898 1.875 1.898"
          />
        </svg>
      ) : (
        <svg
          ref={buttonRef}
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 text-light-t dark:text-dark-t hover:bg-light-fg hover:dark:bg-dark-fg cursor-pointer z-20"
          onClick={handleToggle}
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M7.95 11.95h32m-32 12h32m-32 12h32"
          />
        </svg>
      )}
      {toggle && (
        <div
          ref={menuRef}
          className="flex flex-col gap-2 items-center absolute top-0 right-0 bg-primary w-36 h-[100dvh] z-10"
        >
          <div className="mt-12 w-full">
            {navLinks.map((item) => (
              <div
                key={item.href}
                className="flex justify-center items-center w-full h-10 font-semibold hover:bg-primary-dark cursor-pointer text-dark-t"
                onClick={() => openLink(item.href)}
              >
                {item.label}
              </div>
            ))}
          </div>
          <span className="border-dark-t border-b-2 w-[90%]"></span>
          <div className="w-full">
            <div
              className="flex justify-center items-center w-full h-10 font-semibold hover:bg-primary-dark cursor-pointer text-dark-t"
              onClick={() => openLink("profile")}
            >
              Profile
            </div>
            <div
              className="flex justify-center items-center w-full h-10 font-semibold hover:bg-primary-dark cursor-pointer text-dark-t"
              onClick={handleSignOut}
            >
              Sign Out
            </div>
          </div>
          <ThemeSwitch />
        </div>
      )}
    </div>
  );
};

export default Hamburger;
