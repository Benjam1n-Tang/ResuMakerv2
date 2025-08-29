"use client";

import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

type LogoProps = {
  setActive: (href: string) => void;
}

const Logo = ({setActive}: LogoProps) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  const handleClick = () => {
    if (!loading && user) {
      router.push("/create");
      setActive("create")
    } else {
      router.push("/");
      setActive("create")
    }

  };
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <h3 className=" text-primary-dark dark:text-primary-light tracking-[0] leading-[2rem] text-[1.75rem] font-ysa font-semibold">
        {" "}
        ResuMaker{" "}
      </h3>
    </div>
  );
};

export default Logo;
