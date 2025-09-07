import { useState } from "react";
import Button from "../ui/Button";
import ProfileInput from "../ui/ProfileInput";
import { Header, SocialList } from "@/types";

type CreateHeaderProps = {
  mainName: string;
  setMainName: React.Dispatch<React.SetStateAction<string>>;
  mainEmail: string;
  setMainEmail: React.Dispatch<React.SetStateAction<string>>;
  mainCity: string;
  setMainCity: React.Dispatch<React.SetStateAction<string>>;
  mainState: string;
  setMainState: React.Dispatch<React.SetStateAction<string>>;
  mainZip: string;
  setMainZip: React.Dispatch<React.SetStateAction<string>>;
  mainPhone: string;
  setMainPhone: React.Dispatch<React.SetStateAction<string>>;
  mainSummary: string;
  setMainSummary: React.Dispatch<React.SetStateAction<string>>;
  mainSocials: SocialList[];
  setMainSocials: React.Dispatch<React.SetStateAction<SocialList[]>>;
  setHeader: React.Dispatch<React.SetStateAction<Header>>;
};

const CreateHeader = ({
  mainName,
  setMainName,
  mainEmail,
  setMainEmail,
  mainCity,
  setMainCity,
  mainState,
  setMainState,
  mainZip,
  setMainZip,
  mainPhone,
  setMainPhone,
  mainSummary,
  setMainSummary,
  mainSocials,
  setMainSocials,
  setHeader
}: CreateHeaderProps) => {
  const [name, setName] = useState(mainName);
  const [email, setEmail] = useState(mainEmail);
  const [city, setCity] = useState(mainCity);
  const [state, setState] = useState(mainState);
  const [zip, setZip] = useState(mainZip);
  const [phone, setPhone] = useState(mainPhone);
  const [summary, setSummary] = useState(mainSummary);

  const [socials, setSocials] = useState<SocialList[]>(mainSocials);

  const handleSave = () => {
    setMainName(name);
    setMainEmail(email);
    setMainCity(city);
    setMainState(state);
    setMainZip(zip);
    setMainPhone(phone);
    setMainSummary(summary)
    setMainSocials(socials);
    const activeSocialLinks = socials
        .filter((s) => s.active)
        .map((s) => s.link);
    setHeader({
        name,
        email,
        city, 
        state,
        zip,
        phone,
        summary,
        socials: activeSocialLinks,
    })
    
  }
  return (
    <div>
      <h5 className="font-semibold pb-3">Header</h5>
      <div className="flex flex-col gap-3">
        <ProfileInput
          label="Full Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          edit={true}
          placeholder="Full Name"
          variant="1"
        />
        <ProfileInput
          label="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          edit={true}
          placeholder="Your Email"
          variant="1"
        />
        <ProfileInput
          label="City"
          value={city}
          onChange={({ target }) => setCity(target.value)}
          edit={true}
          placeholder="Your City"
          variant="1"
        />
        <ProfileInput
          label="State"
          value={state}
          onChange={({ target }) => setState(target.value)}
          edit={true}
          placeholder="Your State"
          variant="1"
        />
        <ProfileInput
          label="Zip"
          value={zip}
          onChange={({ target }) => setZip(target.value)}
          edit={true}
          placeholder="Your Zip"
          variant="1"
        />
        <ProfileInput
          label="Phone"
          value={phone}
          onChange={({ target }) => setPhone(target.value)}
          edit={true}
          placeholder="Your phone"
          variant="1"
        />
        <ProfileInput
          label="Summary"
          value={summary}
          onChange={({ target }) => setSummary(target.value)}
          edit={true}
          placeholder="Your summary"
          variant="2"
        />
        <div className="flex flex-col gap-1">
          <p className="pl-0.5 font-medium">Select Socials:</p>
          {socials.map((social, index) => (
            <div
              key={index}
              onClick={() =>
                setSocials((prev) =>
                  prev.map((s, i) =>
                    i === index ? { ...s, active: !s.active } : s
                  )
                )
              }
              className="cursor-pointer flex gap-2 items-center"
            >
              <div>
                {social.active ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#267026"
                      d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 56 56"
                  >
                    <path
                      fill="#702626"
                      d="M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265m5.836-11.203a1.97 1.97 0 0 1-1.969-1.992c0-.54.211-1.008.586-1.36l7.008-7.03l-7.008-7.032c-.375-.328-.586-.82-.586-1.36c0-1.077.867-1.945 1.969-1.945c.54 0 1.008.211 1.36.586l7.03 7.008l7.079-7.031c.398-.422.843-.61 1.36-.61a1.98 1.98 0 0 1 1.968 1.97c0 .538-.164.984-.586 1.359l-7.031 7.054l7.008 6.985c.375.375.585.843.585 1.406c0 1.102-.89 1.992-1.968 1.992a1.98 1.98 0 0 1-1.407-.586l-7.007-7.031l-6.985 7.031a1.93 1.93 0 0 1-1.406.586"
                    />
                  </svg>
                )}
              </div>
              <div className="font-semibold">{social.title.charAt(0).toUpperCase() + social.title.slice(1)}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button text="Save Changes" variant={1} className="py-2 px-4" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default CreateHeader;
