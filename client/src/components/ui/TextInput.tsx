import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type inputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
};

const TextInput = ({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
}: inputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col gap-0.5">
      <p> {label} </p>
      <div className="flex flex-row items-center bg-light-fg dark:bg-dark-fg border-2 border-light-bd dark:border-dark-bd rounded-lg px-1 gap-1 focus-within:ring-2 focus-within:ring-light-t dark:focus-within:ring-dark-t">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full placeholder-light-tLighter dark:placeholder-dark-tLighter text-light-t dark:text-dark-t text-base py-0.75 outline-none font-sans"
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={24}
                className="hover:cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={24}
                className="hover:cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
      {/* <label className="pl-0.5 font-light h-3 text-error dark:text-error-content">
        {" "}
      </label> */}
    </div>
  );
};

export default TextInput;
