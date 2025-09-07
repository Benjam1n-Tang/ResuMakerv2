import { ReactEventHandler, useContext, useEffect, useState } from "react";
import ProfileInput from "../ui/ProfileInput";
import { UserContext } from "@/context/userContext";
import Button from "../ui/Button";
import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import AddButton from "../ui/AddButton";
import SocialInput from "../ui/SocialInput";

type Social = {
  _id: string;  
  title: string;
  link: string;
};

const UserProfile = () => {
  const { user, loading, updateUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");

  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const [socials, setSocials] = useState<Social[]>([]);

  const fetchSocials = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SOCIAL.GET_USER_ALL);
      setSocials(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  useEffect(() => {
    if (!loading && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setCity(user.city || "");
      setState(user.state || "");
      setZip(user.zip || "");
      setPhone(user.phone || "");
      setSummary(user.summary || "");
      fetchSocials();
    }
  }, [loading, user]);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const toggleAdd = () => {
    setAdd(!add);
  };

  const handleCancel = () => {
    if (!loading && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setCity(user.city || "");
      setState(user.state || "");
      setZip(user.zip || "");
      setPhone(user.phone || "");
      setSummary(user.summary || "");
    }
    setMessage("");
    toggleEdit();
  };

  const handleUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, {
        name,
        email,
        city,
        state,
        zip,
        phone,
        summary,
      });

      updateUser(response.data.data);
      toggleEdit();
      setMessage("Updated User Successfully!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(
          err.response?.data?.message ||
            "Failed to update profile. Please fix one or several of your inputs."
        );
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="px-2 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 items-center lg:items-start">
          <h4 className="font-semibold">User Info</h4>
          <h6>Change your user info</h6>
        </div>
        <form onSubmit={handleUserInfo} className="flex flex-col gap-6">
          <div className="px-0 md:px-10 flex flex-col gap-2">
            <ProfileInput
              value={name}
              onChange={({ target }) => setName(target.value)}
              label="Full Name"
              placeholder="Your Name..."
              variant="1"
              edit={edit}
            />
            <ProfileInput
              value={city}
              onChange={({ target }) => setCity(target.value)}
              label="City"
              placeholder="Your City..."
              variant="1"
              edit={edit}
            />
            <ProfileInput
              value={state}
              onChange={({ target }) => setState(target.value)}
              label="State"
              placeholder="Your State..."
              variant="1"
              edit={edit}
            />
            <ProfileInput
              value={zip}
              onChange={({ target }) => setZip(target.value)}
              label="Zip Code"
              placeholder="Your Zipcode..."
              variant="1"
              edit={edit}
            />
            <ProfileInput
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="Your Email..."
              variant="1"
              edit={edit}
            />
            <ProfileInput
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
              label="Phone Number"
              placeholder="Your Phone..."
              variant="1"
              edit={edit}
            />
            <ProfileInput
              value={summary}
              onChange={({ target }) => setSummary(target.value)}
              label="Summary"
              placeholder="Your Summary..."
              variant="2"
              edit={edit}
            />
            <label
              className={`${
                message === "Updated User Successfully!"
                  ? `text-info dark:text-info-content`
                  : `text-error dark:text-error-content`
              } flex justify-center items-center`}
            >
              {message}
            </label>
            <div className="flex justify-end gap-2">
              {edit && (
                <Button
                  className="px-4 py-1"
                  text="Save"
                  variant={1}
                  type="submit"
                />
              )}
              {edit ? (
                <Button
                  className="px-4 py-1"
                  text="Cancel"
                  variant={2}
                  onClick={handleCancel}
                />
              ) : (
                <Button
                  className="px-4 py-1"
                  text="Edit"
                  variant={1}
                  onClick={toggleEdit}
                />
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
          <h4 className="font-semibold">Socials</h4>
          <h6>Add any other socials or links you wish to add (max 5)</h6>
        </div>
        <div className="px-0 md:px-10 flex flex-col gap-1">
          {socials.map((social, index) => (
            <div key={social._id}>
              <SocialInput number={index + 1} id={social._id} initialTitle={social.title} initialLink={social.link} refetch={fetchSocials}  />
            </div>
          ))}

          <div>
            {add && socials.length < 5 && (
              <SocialInput
                number={socials.length + 1}
                isNew={true}
                toggleAdd={toggleAdd}
                refetch={fetchSocials} 
              />
            )}
          </div>
          <div className="flex justify-center items-center pt-2">
            <AddButton text="Social" onClick={toggleAdd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
