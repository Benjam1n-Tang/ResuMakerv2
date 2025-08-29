

type inputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
};

const ProfileInput = ({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
}: inputProps) => {
  return (
    <div className="w-full flex flex-col gap-0.5">
      <p className="pl-0.5 font-medium"> {label} </p>
      <div className="flex flex-row items-center bg-light-fg dark:bg-dark-fg border-2 border-light-bd dark:border-dark-bd rounded-lg px-1 gap-1 focus-within:ring-2 focus-within:ring-light-t dark:focus-within:ring-dark-t">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full placeholder-light-tLighter dark:placeholder-dark-tLighter text-light-t dark:text-dark-t text-base py-0.75 outline-none font-sans"
        />
      </div>
      {/* <label className="pl-0.5 font-light h-3 text-error dark:text-error-content">
        {" "}
      </label> */}
    </div>
  );
};

export default ProfileInput;
