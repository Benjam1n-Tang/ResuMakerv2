"use client";
import Image from "next/image";
import { socials } from "@/data/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-2 border-light-bd dark:border-dark-bd">
      <div className="flex flex-col gap-2 py-3 lg:py-4 lg:max-h-12 lg:flex-row items-center justify-between max-container pg-padX">
        <div className="text-wrap w-42 text-center lg:text-left lg:w-auto">
          <p>
            {" "}
            © 2025{" "}
            <span className="font-ysa font-medium tracking-[0] text-primary-dark dark:text-primary-light">
              {" "}
              ResuMaker{" "}
            </span>{" "}
            by <span className="font-semibold"> Benjamin Tang</span>. All Rights
            Reserved
          </p>
        </div>
        <div className="flex gap-3">
          {socials.map((soc) => (
            <Link key={soc.name} href={soc.href} target="_blank">
              <Image
                src={soc.icon}
                alt={soc.name}
                className="bg-light-bg dark:bg-dark-bg hover:bg-light-fg hover:dark:bg-dark-fg rounded-sm cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
