"use client";

import ResumeCard from "@/components/ui/ResumeCard";
import { API_PATHS} from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

type Resume = {
  id: string;
  title: string;
  contentType: string;
  uploadedAt: string;
};

const Page = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axiosInstance.get<Resume[]>(
          API_PATHS.RESUME.GET_USER_ALL
        );
        setResumes(response.data);
      } catch (error) {
        console.error("Could not retrieve resumes:", error);
      }
    };

    fetchResumes();
  }, []);



  return (
    <div className="max-container pg-padX pt-19 flex min-h-[100dvh] gap-6 pb-12 flex-col">
      <div className="flex flex-col items-center lg:items-start gap-2">
        <h3 className="font-semibold">My Resumes</h3>
        <h6>A list of all the resumes you have created</h6>
      </div>

      <div className="w-full grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-4 lg:grid-cols-3 lg:justify-start">
        {resumes && resumes.map((resume) => (


          <div
            key={resume.id}
            className="w-full"
          >
            <ResumeCard 
              id={resume.id}
              title={resume.title}
              date={resume.uploadedAt}
            />
          </div>
          


        ))}
        
      </div>
    </div>
  );
};

export default Page;
