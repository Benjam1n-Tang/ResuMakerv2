"use client";

import Button from "@/components/ui/Button";
import * as Img from "../../assets/images";
import Image from "next/image";
import FeatureCard from "@/components/ui/FeatureCard";
import { features } from "@/data/constants";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };
  return (
    <div className="max-container pg-padX pt-24 flex flex-col min-h-[100dvh] gap-8">
      <div className="pg-base">
        <div className="xl:w-80 w-auto flex flex-col gap-5">
          <div className="flex flex-col gap-2 items-center xl:items-start">
            <h2 className="font-semibold text-center xl:text-left">
              {" "}
              Make the Job Process Effortless{" "}
            </h2>
            <h6 className="text-center xl:text-left w-[80%]">
              {" "}
              Whether you prefer crafting your own or leveraging AI technology,
              we help you create standout resumes and compelling cover letters
              tailored to your career goals!
            </h6>
          </div>
          <div className="flex justify-center xl:justify-start">
            <Button
              text="Start Building"
              className="px-4 py-2"
              variant={1}
              onClick={handleSignIn}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="p-4">
            <Image src={Img.placeholder} alt="placeholder" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-col">
        <h5 className="font-semibold"> Features </h5>
        <div className="w-full grid gap-3 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] pb-6 justify-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
