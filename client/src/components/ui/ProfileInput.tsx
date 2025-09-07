import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "./Button";

type inputProps = {
  label: string;
  value?: string;
  date?: Date | "Present" | null;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDateChange?: (value: Date | "Present" | null) => void;
  placeholder: string;
  type?: string; 
  present?: boolean;
  variant: "1" | "2" | "3";
  edit: boolean;
  ai?: boolean;
  disabled?: boolean;
   onAiClick?: () => void; 
};

const ProfileInput = ({
  label,
  value,
  date,
  onDateChange,
  placeholder,
  onChange,
  present,
  variant,
  type = "text",
  edit,
  ai,
  disabled = true,
  onAiClick,
}: inputProps) => {
  const [showSecret, setShowSecret] = useState(false);

  const handlePresent = () => {
    onDateChange?.("Present");
  };
  const handleDate = () => {
    onDateChange?.(null);
  };

  const toggleShowSecret = () => {
    setShowSecret(!showSecret);
  };

  return (
    <div className="w-full flex flex-col gap-0.5">
      <div className="flex justify-between items-center">
        <p className="pl-0.5 font-medium"> {label} </p>
        <div className="flex flex-col">
          {ai && <Button text="Fix AI" disabled={disabled} variant={1} className="py-1 px-2" onClick={onAiClick}/>}
        </div>
      </div>
      <div className="flex flex-row items-center bg-light-fg dark:bg-dark-fg border-2 border-light-bd dark:border-dark-bd rounded-lg px-1 gap-1 focus-within:ring-2 focus-within:ring-light-t dark:focus-within:ring-dark-t">
        {variant === "1" && (
          <>
            <input
              type={
                type === "password" ? (showSecret ? "text" : "password") : type
              }
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={!edit}
              className="w-full placeholder-light-tLighter dark:placeholder-dark-tLighter text-light-t dark:text-dark-t text-base py-0.75 outline-none font-sans"
            />
            {type === "password" && edit && (
              <>
                {showSecret ? (
                  <FaRegEye
                    size={20}
                    className="hover:cursor-pointer text-light-t dark:text-dark-t"
                    onClick={toggleShowSecret}
                  />
                ) : (
                  <FaRegEyeSlash
                    size={20}
                    className="hover:cursor-pointer text-light-t dark:text-dark-t"
                    onClick={toggleShowSecret}
                  />
                )}
              </>
            )}
          </>
        )}
        {variant === "2" && (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={!edit}
            className="w-full placeholder-light-tLighter dark:placeholder-dark-tLighter text-light-t dark:text-dark-t text-base py-0.75 outline-none font-sans min-h-10"
          />
        )}
        {variant === "3" && (
          <>
            {date === "Present" ? (
              <span
                className="text-light-t dark:text-dark-t text-base py-0.75 w-full"
                onClick={edit ? handleDate : undefined}
              >
                Present
              </span>
            ) : (
              <Calendar
                view="month"
                value={date as Date | null}
                dateFormat="M yy"
                monthNavigator
                yearNavigator
                yearRange="2000:2030"
                onChange={(e) => onDateChange?.(e.value as Date | null)}
                className="bg-light-fg dark:bg-dark-fg"
                disabled={!edit}
                placeholder={placeholder}
              />
            )}
            {present && (
              <Button
                text="Present"
                variant={1}
                className="px-1"
                onClick={edit ? handlePresent : undefined}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInput;
