import { useContext, useEffect, useState } from "react";
import ProfileInput from "../ui/ProfileInput";
import { UserContext } from "@/context/userContext";

const UserProfile = () => {
  const { user, loading } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.data.name || "");
      setEmail(user.data.email || "");
      setCity(user.data.city || "");
      setState(user.data.state || "");
      setZip(user.data.zip || "");
      setPhone(user.data.phone || "");
      setSummary(user.data.summary || "");
    }
  }, [user]);

  return (
    <div className="px-2 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 items-center lg:items-start">
          <h4 className="font-semibold">User Info</h4>
          <h6>Change your user info</h6>
        </div>
        <div className="px-0 md:px-10 flex flex-col gap-2">
          <ProfileInput
            value={name}
            onChange={({ target }) => setName(target.value)}
            label="Full Name"
            placeholder="Your Name..."
          />
          <ProfileInput
            value={city}
            onChange={({ target }) => setCity(target.value)}
            label="City"
            placeholder="Your City..."
          />
          <ProfileInput
            value={state}
            onChange={({ target }) => setState(target.value)}
            label="State"
            placeholder="Your State..."
          />
          <ProfileInput
            value={zip}
            onChange={({ target }) => setZip(target.value)}
            label="Zip Code"
            placeholder="Your Zipcode..."
          />
          <ProfileInput
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="Your Email..."
          />
          <ProfileInput
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            label="Phone Number"
            placeholder="Your Phone..."
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
          <h4 className="font-semibold">Socials</h4>
          <h6>Add any other socials or links you wish to add</h6>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
