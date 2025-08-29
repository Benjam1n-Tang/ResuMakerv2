"use client";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { UserContext } from "@/context/userContext";
import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import { validateEmail } from "@/lib/helper";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const { updateUser } = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErr("Please enter the password");
      return;
    }
    setErr("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data?.data || {};
      if (!token || !user) {
        setErr("Invalid server response. Please try again.");
        return;
      }

      if (token) {
        localStorage.setItem("token", token);
        updateUser({ ...user, token });
        router.push("/create");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErr(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else {
        setErr("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="pt-24 pb-24 flex justify-center items-center max-container pg-padX min-h-[100dvh]">
      <div className="flex flex-col gap-5 w-full sm:w-50">
        <div>
          <h5 className="font-semibold"> Log in to your account</h5>
          <p> Please enter your account details</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <TextInput
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="Your Email..."
            />
            <TextInput
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Your Password..."
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex justify-center text-error dark:text-error-content">
              <p className="py-1"> {err} </p>
            </div>
            <Button
              type="submit"
              text="Continue"
              variant={1}
              className="w-full py-1"
            />
            <label className="font-semilight">
              {" "}
              Do not have an account?{" "}
              <span>
                {" "}
                <a
                  className="text-info dark:text-info-content hover:underline"
                  href="/sign-up"
                >
                  {" "}
                  Sign Up
                </a>
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
