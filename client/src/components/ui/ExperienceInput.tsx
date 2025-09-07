import { useState } from "react";
import ProfileInput from "./ProfileInput";
import axiosInstance from "@/lib/axiosInstance";
import { API_PATHS } from "@/lib/apiPaths";
import axios from "axios";
import Button from "./Button";
import { convertToBullet, convertToString } from "@/lib/helper";

type ExperienceInputProps = {
  id?: string | undefined | null;
  companyP?: string;
  roleP?: string;
  locationP?: string;
  isNew?: boolean;
  startP?: Date | "Present" | null;
  endP?: Date | "Present" | null;
  bulletsP?: string[];
  toggleAdd?: () => void;
  refetch?: () => void;
};

const ExperienceInput = ({
  id,
  companyP = "",
  roleP = "",
  locationP = "",
  startP = null,
  endP = null,
  bulletsP = [],
  isNew,
  toggleAdd,
  refetch,
}: ExperienceInputProps) => {
  const [company, setCompany] = useState(companyP);
  const [role, setRole] = useState(roleP);
  const [location, setLocation] = useState(locationP);
  const [start, setStart] = useState<Date | "Present" | null>(startP);
  const [end, setEnd] = useState<Date | "Present" | null>(endP);
  const [bullets, setBullets] = useState(convertToString(bulletsP));

  const [edit, setEdit] = useState(false);


  const toggleEdit = () => {
    setEdit(!edit);
  };

  const resetExperience = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPERIENCE.GET_EXPERIENCE(id)
      );
      const experience = response.data.data;

      setCompany(experience.company);
      setRole(experience.role);
      setLocation(experience.location);
      setStart(
        experience.startDate === "Present"
          ? "Present"
          : experience.startDate
          ? new Date(experience.startDate)
          : null
      );
      setEnd(
        experience.endDate === "Present"
          ? "Present"
          : experience.endDate
          ? new Date(experience.endDate)
          : null
      );
      setBullets(convertToString(experience.bullets));
      setEdit(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to fetch experience");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleCreateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const correctedBullets = convertToBullet(bullets);
      const response = await axiosInstance.post(
        API_PATHS.EXPERIENCE.CREATE_EXPERIENCE,
        {
          company,
          role,
          location,
          startDate: start,
          endDate: end,
          bullets: correctedBullets,
        }
      );
      console.log("Experience created:", response.data.data);

      setCompany("");
      setRole("");
      setLocation("");
      setStart(null);
      setEnd(null);
      setBullets("");
      if (refetch) refetch();
      if (toggleAdd) toggleAdd();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to create experience");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleDeleteExperience = async () => {
    try {
      if (id) {
        await axiosInstance.delete(API_PATHS.EXPERIENCE.DELETE_EXPERIENCE(id));
        console.log("Experience deleted:", id);
        if (refetch) refetch();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(
          err.response?.data?.message || "Failed to delete experience link"
        );
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleUpdateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      const correctedBullets = convertToBullet(bullets);
      const response = await axiosInstance.put(
        API_PATHS.EXPERIENCE.UPDATE_EXPERIENCE(id),
        {
          company,
          role,
          location,
          startDate: start,
          endDate: end,
          bullets: correctedBullets,
        }
      );
      console.log("Experience updated:", response.data.data);

      if (toggleAdd) toggleAdd();
      if (refetch) refetch();
      toggleEdit();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(
          err.response?.data?.message ||
            "Please Fill all appropriate experience fields!"
        );
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      {isNew ? (
        <form
          onSubmit={handleCreateExperience}
          className="w-full border-2 border-light-bd dark:border-dark-bd py-2 px-4 rounded-lg flex flex-col gap-1"
        >
          <ProfileInput
            value={company}
            onChange={({ target }) => setCompany(target.value)}
            label="Company"
            placeholder="Your Company..."
            variant="1"
            edit={true}
          />
          <ProfileInput
            value={role}
            onChange={({ target }) => setRole(target.value)}
            label="Role"
            placeholder="Your Role..."
            variant="1"
            edit={true}
          />
          <div className="flex sm:flex-row flex-col sm:gap-2 gap-1">
            <div className="w-full">
              <ProfileInput
                value={location}
                onChange={({ target }) => setLocation(target.value)}
                label="Location"
                placeholder="Company Location..."
                variant="1"
                edit={true}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <ProfileInput
                date={start}
                onDateChange={setStart}
                label="Start Date"
                placeholder="Start Date..."
                variant="3"
                edit={true}
              />
              <ProfileInput
                date={end}
                onDateChange={setEnd}
                label="End Date"
                present={true}
                placeholder="End Date..."
                variant="3"
                edit={true}
              />
            </div>
          </div>
          <ProfileInput
            value={bullets}
            onChange={({ target }) => setBullets(target.value)}
            label="Bullets"
            placeholder="Bullets..."
            variant="2"
            edit={true}
          />
          <div className="flex justify-end pt-1">
            <Button
              className="px-4 py-1"
              text="Create"
              variant={1}
              type="submit"
            />
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleUpdateExperience}
          className="w-full border-2 border-light-bd dark:border-dark-bd py-2 px-4 rounded-lg flex flex-col gap-1"
        >
          <ProfileInput
            value={company}
            onChange={({ target }) => setCompany(target.value)}
            label="Company"
            placeholder="Your Company..."
            variant="1"
            edit={edit}
          />
          <ProfileInput
            value={role}
            onChange={({ target }) => setRole(target.value)}
            label="Role"
            placeholder="Your Role..."
            variant="1"
            edit={edit}
          />
          <div className="flex sm:flex-row flex-col sm:gap-2 gap-1">
            <div className="w-full">
              <ProfileInput
                value={location}
                onChange={({ target }) => setLocation(target.value)}
                label="Location"
                placeholder="Company Location..."
                variant="1"
                edit={edit}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <ProfileInput
                date={start}
                onDateChange={setStart}
                label="Start Date"
                placeholder="Start Date..."
                variant="3"
                edit={edit}
              />
              <ProfileInput
                date={end}
                onDateChange={setEnd}
                label="End Date"
                placeholder="End Date..."
                variant="3"
                present={true}
                edit={edit}
              />
            </div>
          </div>
          <ProfileInput
            value={bullets}
            onChange={({ target }) => setBullets(target.value)}
            label="Bullets"
            placeholder="Bullets..."
            variant="2"
            edit={edit}
          />
          <div className="flex justify-end pt-1 gap-2">
            <button
              type="button"
              onClick={handleDeleteExperience}
              className="bg-light-fg dark:bg-dark-fg border-light-bd dark:border-dark-bd p-1 border-2 rounded-sm hover:bg-dark-tLight dark:hover:bg-light-tLight"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-3 h-3"
              >
                <path
                  fill="none"
                  d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8"
                />
                <path
                  fill="currentColor"
                  d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32M192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416M272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"
                />
              </svg>
            </button>
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
                onClick={resetExperience}
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
        </form>
      )}
    </>
  );
};

export default ExperienceInput;
