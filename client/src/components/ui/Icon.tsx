import { useState, useRef, useEffect, useContext } from "react";
import IconButton from "./IconButton";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

type IconProps = {
  height?: string;
  width?: string;
  setActive: (href: string) => void;
};

const Icon = ({ height, width, setActive }: IconProps) => {
  const { clearUser } = useContext(UserContext);
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleUser = () => setToggle(!toggle);

  const handleProfile = () => {
    setActive("/profile");
    router.replace("/profile");
  };

  const handleSignOut = () => {
    clearUser();
    router.replace("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggle &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);

  return (
    <div
      ref={containerRef}
      className="bg-light-bg relative dark:bg-dark-bg rounded-sm cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        className="hover:bg-light-fg hover:dark:bg-dark-fg"
        onClick={toggleUser}
        viewBox="0 0 24 24"
      >
        <path
          fill="#DC5959"
          fillRule="evenodd"
          d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-7-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-3 11.5a8.46 8.46 0 0 0 4.807-1.489c.604-.415.862-1.205.51-1.848C16.59 15.83 15.09 15 12 15s-4.59.83-5.318 2.163c-.351.643-.093 1.433.511 1.848A8.46 8.46 0 0 0 12 20.5"
          clipRule="evenodd"
        />
      </svg>

      {toggle && (
        <div className="flex flex-col absolute rounded-sm top-[3.5em] right-0 bg-light-fg dark:bg-dark-fg border-2 border-light-bd dark:border-dark-bd">
          <IconButton text="Profile" onClick={handleProfile} />
          <IconButton text="Sign Out" onClick={handleSignOut} />
        </div>
      )}
    </div>
  );
};

export default Icon;
