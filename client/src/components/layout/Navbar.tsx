"use client";
import Button from "../ui/Button";
import ThemeButton from "../ui/ThemeButton";
import Logo from "../ui/Logo";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import Icon from "../ui/Icon";
import { navLinks } from "@/data/constants";
import Link from "next/link";
import Hamburger from "../ui/Hamburger";

const Navbar = () => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState(pathname.replace(/^\/+/, "") || "");

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage =
    pathname?.includes("sign-in") || pathname?.includes("sign-up");

  return (
    <header
      className={`w-full fixed z-10 bg-light-bg dark:bg-dark-bg ${
        isScrolled
          ? "border-b-0 border-light-bd dark:border-dark-bd"
          : "border-0"
      }`}
    >
      <nav className="navBar max-container pg-padX">
        <Logo setActive={setActive}/>
        {!loading && user && (
          <ul className="hidden lg:flex flex-row h-8 gap-4">
            {navLinks.map((item) => {
              return (
                <li
                  key={item.label}
                  className={`flex justify-center items-center font-semibold w-15 h-full cursor-pointer ${
                    active === item.href ? "border-b-4" : ""
                  }`}
                  onClick={() => setActive(item.href)}
                >
                  <Link
                    href={item.href}
                    className="h-full w-full flex items-center justify-center"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <div className="hidden lg:flex gap-2 items-center">
          <ThemeButton />
          <div>
            {!isAuthPage && !loading && user ? (
              <Icon width="3em" height="3em" setActive={setActive} />
            ) : (
              <Button
                text="Log In"
                className="px-3 py-1.5"
                variant={1}
                onClick={handleSignIn}
              />
            )}
          </div>
        </div>
        {!loading && user && <Hamburger setActive={setActive} />}
      </nav>
    </header>
  );
};

export default Navbar;
