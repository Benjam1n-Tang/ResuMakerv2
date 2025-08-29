"use client";


import LetterCard from "@/components/ui/LetterCard";
import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

type Letter = {
  id: string;
  title: string;
  contentType: string;
  uploadedAt: string;
};

const Page = () => {
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await axiosInstance.get<Letter[]>(
          API_PATHS.LETTER.GET_USER_ALL
        );
        setLetters(response.data);
      } catch (error) {
        console.error("Could not retrieve letters:", error);
      }
    };

    fetchLetters();
  }, []);

  return (
    <div className="max-container pg-padX pt-19 flex min-h-[100dvh] gap-6 pb-12 flex-col">
      <div className="flex flex-col items-center lg:items-start gap-2">
        <h3 className="font-semibold">My Letters</h3>
        <h6>A list of all the cover letters you have created</h6>
      </div>

      <div className="w-full grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-4 lg:grid-cols-3 lg:justify-start">
        {letters && letters.map((letter) => (
          <div key={letter.id} className="w-full">
            <LetterCard 
              id={letter.id}
              title={letter.title}
              date={letter.uploadedAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
