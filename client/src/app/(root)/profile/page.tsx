"use client";

import EducationProfile from "@/components/sections/EducationProfile";
import ExperienceProfile from "@/components/sections/ExperienceProfile";
import PasswordProfile from "@/components/sections/PasswordProfile";
import ProjectProfile from "@/components/sections/ProjectProfile";
import SkillProfile from "@/components/sections/SkillProfile";
import UserProfile from "@/components/sections/UserProfile";
import ProfileButton from "@/components/ui/ProfileButton";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState("User Info");

  return (
    <div className="max-container pg-padX pt-19 flex min-h-[100dvh] gap-6 pb-12 flex-col">
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold">Edit Profile</h3>
        <h6>Edit and change your profile</h6>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-3 gap-8">
        <div className="flex flex-col items-center flex-1 h-100 gap-8">
          <div className="flex lg:hidden gap-1 justify-center">
            <ProfileButton title={"User Info"} page={page} setPage={setPage} />
            <ProfileButton
              title={"Passwords/Keys"}
              page={page}
              setPage={setPage}
            />
            <ProfileButton title={"Experience"} page={page} setPage={setPage} />
            <ProfileButton
              title={"Edu./Certifs."}
              page={page}
              setPage={setPage}
            />
            <ProfileButton title={"Projects"} page={page} setPage={setPage} />
            <ProfileButton title={"Skills"} page={page} setPage={setPage} />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={200}
              height={200}
              viewBox="0 0 24 24"
            >
              <path
                fill="#DC5959"
                fillRule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-7-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-3 11.5a8.46 8.46 0 0 0 4.807-1.489c.604-.415.862-1.205.51-1.848C16.59 15.83 15.09 15 12 15s-4.59.83-5.318 2.163c-.351.643-.093 1.433.511 1.848A8.46 8.46 0 0 0 12 20.5"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="lg:flex flex-col gap-1 hidden">
            <ProfileButton title={"User Info"} page={page} setPage={setPage} />
            <ProfileButton
              title={"Passwords/Keys"}
              page={page}
              setPage={setPage}
            />
            <ProfileButton title={"Experience"} page={page} setPage={setPage} />
            <ProfileButton
              title={"Edu./Certifs."}
              page={page}
              setPage={setPage}
            />
            <ProfileButton title={"Projects"} page={page} setPage={setPage} />
            <ProfileButton title={"Skills"} page={page} setPage={setPage} />
          </div>
        </div>
        <div className="flex-4">
          {page === "User Info" && <UserProfile />}
          {page === "Experience" && <ExperienceProfile />}
          {page === "Edu./Certifs." && <EducationProfile />}
          {page === "Projects" && <ProjectProfile />}
          {page === "Skills" && <SkillProfile />}
          {page === "Passwords/Keys" && <PasswordProfile />}
        </div>
      </div>
    </div>
  );
};

export default Page;
