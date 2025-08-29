"use client";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

const Page = () => {



  
  return (
    <div className="pt-24 pb-24 flex justify-center items-center max-container pg-padX min-h-[100dvh]">
      <div className="flex flex-col gap-5 w-full sm:w-50">
        <div>
          <h5 className="font-semibold"> Create an account</h5>
          <p> Join us by entering your details </p>
        </div>
        <div className="flex flex-col gap-1">
          <TextInput label="Your Full Name" placeholder="Full Name..." />
          <TextInput
            label="Your Unique Username"
            placeholder="Unique Username"
          />
          <TextInput label="Email" placeholder="Email..." />
          <TextInput label="Password" placeholder="Password..." />
          <TextInput label="Verify Password" placeholder="Verify Password..." />
        </div>

        <div className="flex flex-col gap-0.5">
          <Button text="Continue" variant={1} className="w-full py-1" />
          <label className="font-semilight">
            {" "}
            Already have an account?{" "}
            <span>
              {" "}
              <a
                className="text-info dark:text-info-content hover:underline"
                href="/sign-in"
              >
                {" "}
                Sign In
              </a>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Page;
