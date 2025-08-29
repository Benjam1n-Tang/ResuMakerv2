"use client";

import Doc from "@/components/layout/Document";

const Page = () => {
  return (
    <div className="max-container pg-padX pt-19 flex justify-between min-h-[100dvh] gap-8 pb-12 flex-col lg:flex-row-reverse">
      <div className="flex-1">
        <Doc />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">Create New</h3>
      </div>
    </div>
  );
};

export default Page;
