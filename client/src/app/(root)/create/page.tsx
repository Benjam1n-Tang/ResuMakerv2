"use client";

import CreateDocument from "@/components/layout/CreateDocument";
import CreateEducation from "@/components/layout/CreateEducation";
import CreateExperience from "@/components/layout/CreateExperience";
import CreateHeader from "@/components/layout/CreateHeader";
import CreateLetter from "@/components/layout/CreateLetter";
import CreateProject from "@/components/layout/CreateProject";
import Doc from "@/components/layout/Doc";
import { UserContext } from "@/context/userContext";
import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import {
  Certificates,
  Education,
  Experience,
  Header,
  Letter,
  Projects,
  Skills,
  SocialList,
} from "@/types";
import axios from "axios";
import { Project } from "next/dist/build/swc/types";
import { useContext, useEffect, useState } from "react";

type SectionKey =
  | "education"
  | "experience"
  | "projects"
  | "certificates"
  | "skills";

const Page = () => {
  const { user, loading, updateUser } = useContext(UserContext);
  const [resumeTitle, setResumeTitle] = useState("");
  const [letterTitle, setLetterTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [selected, setSelected] = useState("Document");
  const [order, setOrder] = useState<SectionKey[]>([
    "education",
    "experience",
    "projects",
    "certificates",
    "skills",
  ]);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");

  const [socials, setSocials] = useState<SocialList[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificates[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [skills, setSkills] = useState<Skills>();
  const [letter, setLetter] = useState<Letter>({
    manager: "",
    company: "",
    companyAddress: "",
    companyCity: "",
    companyState: "",
    companyZip: "",
    position: "",
    salutation: "",
    body: [],
    closingText: "",
  });
  const [header, setHeader] = useState<Header>({
    name: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    summary: "",
    socials: [],
  });

  const fetchSocials = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SOCIAL.GET_USER_ALL);

      const socialsWithActive: SocialList[] = response.data.data.map(
        (social: Omit<SocialList, "active">) => ({
          ...social,
          active: false,
        })
      );

      setSocials(socialsWithActive);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.CERTIFICATE.GET_USER_ALL
      );

      const certificatesWithActive: Certificates[] = response.data.data.map(
        (certificate: Omit<Certificates, "active">) => {
          let formattedDate: string | null = null;

          if (certificate.endDate) {
            const dateObj = new Date(certificate.endDate);
            formattedDate = dateObj.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
          }

          return {
            ...certificate,
            endDate: formattedDate,
            active: false,
          };
        }
      );

      setCertificates(certificatesWithActive);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPERIENCE.GET_USER_ALL
      );

      const formatMonthYear = (value: unknown): string | null => {
        if (!value) return null;
        if (
          typeof value === "string" &&
          value.trim().toLowerCase() === "present"
        ) {
          return "Present";
        }
        const d = new Date(value as string);
        if (isNaN(d.getTime())) return null;
        return d.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      };

      const experiencesWithActive: Experience[] = response.data.data.map(
        (experience: Omit<Experience, "active">) => ({
          ...experience,
          startDate: formatMonthYear(experience.startDate),
          endDate: formatMonthYear(experience.endDate),
          active: false,
        })
      );

      setExperience(experiencesWithActive);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EDUCATION.GET_USER_ALL
      );

      const educationWithActive: Education[] = response.data.data.map(
        (education: Omit<Education, "active">) => {
          let formattedGradDate = "";

          if (education.gradDate) {
            const grad = new Date(education.gradDate);
            const now = new Date();

            const monthYear = grad.toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            });

            formattedGradDate =
              grad < now ? monthYear : `Expected ${monthYear}`;
          }

          return {
            ...education,
            gradDate: formattedGradDate,
            active: false,
          };
        }
      );

      setEducation(educationWithActive);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.PROJECT.GET_USER_ALL);

      const projectsWithActive: Projects[] = response.data.data.map(
        (project: Omit<Project, "active">) => ({
          ...project,
          active: false,
        })
      );

      setProjects(projectsWithActive);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SKILL.GET_SKILL);
      setSkills(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          try {
            const createResponse = await axiosInstance.post(
              API_PATHS.SKILL.CREATE_SKILL,
              {
                languages: [],
                technical: [],
                web: [],
                other: [],
                interests: [],
              }
            );
            setSkills(createResponse.data.data);
          } catch (createErr) {
            console.error("Failed to create skill:", createErr);
          }
        } else {
          console.error("Axios error:", err.response?.data);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  useEffect(() => {
    if (!loading && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setCity(user.city || "");
      setState(user.state || "");
      setZip(user.zip || "");
      setPhone(user.phone || "");
      setSummary(user.summary || "");
      const activeSocialLinks = socials
        .filter((s) => s.active)
        .map((s) => s.link);
      setHeader({
        name: user.name || "",
        email: user.email || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
        phone: user.phone || "",
        summary: user.summary || "",
        socials: activeSocialLinks,
      });
      fetchSocials();
      fetchEducation();
      fetchCertificates();
      fetchExperience();
      fetchProjects();
      fetchSkills();
    }
    if (typeof window !== "undefined") {
      const storedKey = localStorage.getItem("key");
      setApiKey(storedKey);
    }
  }, [loading, user]);

  return (
    <div className="max-container pg-padX pt-19 flex justify-between min-h-[100dvh] gap-8 pb-12 flex-col lg:flex-row-reverse">
      <div className="flex-1">
        <Doc
          resumeTitle={resumeTitle}
          letterTitle={letterTitle}
          order={order}
          header={header}
          education={education}
          certificates={certificates}
          experience={experience}
          projects={projects}
          skills={skills}
          letter={letter}
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
          <h3 className="font-semibold">Create New</h3>
          <h6>Create a new resume and cover letter.</h6>
          <p>
            To save info, add info, and/or delete info, please input them in
            your profile page. To use AI, add your openAI key to your profile,
            provide the website of your application, and make sure your fields
            are filled appropriately. Not following these directions can give
            mixed results.
          </p>
        </div>
        <div>
          <select
            className="bg-light-fg dark:bg-dark-fg border-2 border-light-bd dark:border-dark-bd py-1.5 px-6 rounded-sm"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="Document">Document</option>
            <option value="Header">Header</option>
            <option value="Education">Education</option>
            <option value="Experience">Experience</option>
            <option value="Projects">Projects</option>
            <option value="Letter">Letter</option>
          </select>
        </div>
        {selected === "Document" && (
          <CreateDocument
            apiKey={apiKey}
            mainOrder={order}
            setMainOrder={setOrder}
            mainWebsite={website}
            setMainWebsite={setWebsite}
            mainResumeTitle={resumeTitle}
            setMainResumeTitle={setResumeTitle}
            mainLetterTitle={letterTitle}
            setMainLetterTitle={setLetterTitle}
            header={header}
            education={education}
            experience={experience}
            projects={projects}
            skills={skills}
            letter={letter}
            setExperience={setExperience}
            setProjects={setProjects}
            setLetter={setLetter}
          />
        )}
        {selected === "Header" && (
          <CreateHeader
            mainName={name}
            setMainName={setName}
            mainEmail={email}
            setMainEmail={setEmail}
            mainCity={city}
            setMainCity={setCity}
            mainState={state}
            setMainState={setState}
            mainZip={zip}
            setMainZip={setZip}
            mainPhone={phone}
            setMainPhone={setPhone}
            mainSummary={summary}
            setMainSummary={setSummary}
            mainSocials={socials}
            setMainSocials={setSocials}
            setHeader={setHeader}
          />
        )}
        {selected === "Education" && (
          <CreateEducation
            education={education}
            setEducation={setEducation}
            certificates={certificates}
            setCertificates={setCertificates}
          />
        )}
        {selected === "Experience" && (
          <CreateExperience
            apiKey={apiKey}
            experience={experience}
            setExperience={setExperience}
          />
        )}
        {selected === "Projects" && (
          <CreateProject
            apiKey={apiKey}
            projects={projects}
            setProjects={setProjects}
          />
        )}
        {selected === "Letter" && (
          <CreateLetter
            apiKey={apiKey}
            letter={letter}
            setLetter={setLetter}
            website={website}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
