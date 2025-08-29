import React, { useRef } from "react";
import { toPng } from "html-to-image";



const ResumeImage = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleCapture = async () => {
    if (!contentRef.current) {
      console.error("contentRef is null");
      return;
    }

    try {
      const dataUrl = await toPng(contentRef.current, {
        cacheBust: true,
      });

      console.log("Captured Image");
      const link = document.createElement("a");
      link.download = "resume-page.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error capturing screenshot", error);
    }
  };

  return (
    <div>
      <div
        ref={contentRef}
        className="aspect-[8.5/11] bg-white text-black w-[612px] pt-5 font-times"
      >
        <p className="font-bold text-[18px] flex justify-center tracking-[0.5px]">BENJAMIN TANG</p>
        <p>Queens, NY | </p>
      </div>

      <button onClick={handleCapture}>Capture Screenshot</button>
    </div>
  );
};

export default ResumeImage;
