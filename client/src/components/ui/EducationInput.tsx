import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import { seperateArray, seperateString } from "@/lib/helper";
import axios from "axios";
import { useState } from "react";
import ProfileInput from "./ProfileInput";
import Button from "./Button";

type EducationInputProps = {
  isNew?: boolean;
  id?: string | undefined | null;
  schoolP?: string;
  degreeP?: string;
  gradDateP?: Date | "Present" | null;
  locationP?: string;
  gpaP?: string;
  courseworkP?: string[];
  involvementP?: string[];
  leadershipP?: string[];
  toggleAdd?: () => void;
  refetch?: () => void;
};

const EducationInput = ({
  id,
  isNew,
  schoolP = "",
  degreeP = "",
  gradDateP = null,
  locationP = "",
  gpaP = "",
  courseworkP = [],
  involvementP = [],
  leadershipP = [],
  toggleAdd,
  refetch,
}: EducationInputProps) => {
  const [school, setSchool] = useState(schoolP);
  const [degree, setDegree] = useState(degreeP);
  const [gradDate, setGradDate] = useState<Date | "Present" | null>(gradDateP);
  const [location, setLocation] = useState(locationP);
  const [gpa, setGpa] = useState(gpaP);
  const [coursework, setCoursework] = useState(seperateArray(courseworkP));
  const [involvement, setInvolvement] = useState(seperateArray(involvementP));
  const [leadership, setLeadership] = useState(seperateArray(leadershipP));

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const resetEducation = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.EDUCATION.GET_EDUCATION(id)
      );
      const education = response.data.data;

      setSchool(education.school);
      setDegree(education.degree);
      setGradDate(education.gradDate ? new Date(education.gradDate) : null);
      setLocation(education.location);
      setGpa(education.gpa);
      setCoursework(seperateArray(education.coursework));
      setInvolvement(seperateArray(education.involvement));
      setLeadership(seperateArray(education.leadership));

      setEdit(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to fetch education");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleCreateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const correctedCoursework = seperateString(coursework);
      const correctedInvolvement = seperateString(involvement);
      const correctedLeadership = seperateString(leadership);
      const response = await axiosInstance.post(
        API_PATHS.EDUCATION.CREATE_EDUCATION,
        {
          school,
          degree,
          gradDate,
          location,
          gpa,
          coursework: correctedCoursework,
          involvement: correctedInvolvement,
          leadership: correctedLeadership,
        }
      );
      console.log("Education created:", response.data.data);

      setSchool("");
      setDegree("");
      setGradDate(null);
      setLocation("");
      setGpa("");
      setCoursework("");
      setInvolvement("");
      setLeadership("");
      if (refetch) refetch();
      if (toggleAdd) toggleAdd();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to create education");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleDeleteEducation = async () => {
    try {
      if (id) {
        await axiosInstance.delete(API_PATHS.EDUCATION.DELETE_EDUCATION(id));
        console.log("Education deleted:", id);
        if (refetch) refetch();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to delete education link");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleUpdateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      const correctedCoursework = seperateString(coursework);
      const correctedInvolvement = seperateString(involvement);
      const correctedLeadership = seperateString(leadership);
      const response = await axiosInstance.put(
        API_PATHS.EDUCATION.UPDATE_EDUCATION(id),
        {
          school,
          degree,
          gradDate,
          location,
          gpa,
          coursework: correctedCoursework,
          involvement: correctedInvolvement,
          leadership: correctedLeadership,
        }
      );
      console.log("Education updated:", response.data.data);

      if (toggleAdd) toggleAdd();
      if (refetch) refetch();
      toggleEdit();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(
          err.response?.data?.message ||
            "Please Fill all appropriate education fields!"
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
          onSubmit={handleCreateEducation}
          className="w-full border-2 border-light-bd dark:border-dark-bd py-2 px-4 rounded-lg flex flex-col gap-1"
        >
          <ProfileInput
            value={school}
            onChange={({ target }) => setSchool(target.value)}
            label="School"
            placeholder="Your School..."
            variant="1"
            edit={true}
          />
          <ProfileInput
            value={degree}
            onChange={({ target }) => setDegree(target.value)}
            label="Degree"
            placeholder="Your Degree..."
            variant="1"
            edit={true}
          />
          <div className="flex sm:flex-row flex-col sm:gap-2 gap-1">
            <div className="flex flex-col gap-1 w-full">
              <ProfileInput
                value={location}
                onChange={({ target }) => setLocation(target.value)}
                label="Location"
                placeholder="School Location..."
                variant="1"
                edit={true}
              />
              <ProfileInput
                value={gpa}
                onChange={({ target }) => setGpa(target.value)}
                label="GPA"
                placeholder="GPA"
                variant="1"
                edit={true}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <ProfileInput
                date={gradDate}
                onDateChange={setGradDate}
                label="End Date"
                placeholder="End Date..."
                variant="3"
                edit={true}
              />
            </div>
          </div>
          <ProfileInput
            value={coursework}
            onChange={({ target }) => setCoursework(target.value)}
            label="Coursework"
            placeholder="Coursework..."
            variant="2"
            edit={true}
          />
          <ProfileInput
            value={involvement}
            onChange={({ target }) => setInvolvement(target.value)}
            label="Involvement"
            placeholder="Involvement..."
            variant="2"
            edit={true}
          />
          <ProfileInput
            value={leadership}
            onChange={({ target }) => setLeadership(target.value)}
            label="Leadership"
            placeholder="Leadership..."
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
          onSubmit={handleUpdateEducation}
          className="w-full border-2 border-light-bd dark:border-dark-bd py-2 px-4 rounded-lg flex flex-col gap-1"
        >
          <ProfileInput
            value={school}
            onChange={({ target }) => setSchool(target.value)}
            label="School"
            placeholder="Your School..."
            variant="1"
            edit={edit}
          />
          <ProfileInput
            value={degree}
            onChange={({ target }) => setDegree(target.value)}
            label="Degree"
            placeholder="Your Degree..."
            variant="1"
            edit={edit}
          />
          <div className="flex sm:flex-row flex-col sm:gap-2 gap-1">
            <div className="flex flex-col gap-1 w-full">
              <ProfileInput
                value={location}
                onChange={({ target }) => setLocation(target.value)}
                label="Location"
                placeholder="School Location..."
                variant="1"
                edit={edit}
              />
              <ProfileInput
                value={gpa}
                onChange={({ target }) => setGpa(target.value)}
                label="GPA"
                placeholder="GPA"
                variant="1"
                edit={edit}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <ProfileInput
                date={gradDate}
                onDateChange={setGradDate}
                label="End Date"
                placeholder="End Date..."
                variant="3"
                edit={edit}
              />
            </div>
          </div>
          <ProfileInput
            value={coursework}
            onChange={({ target }) => setCoursework(target.value)}
            label="Coursework"
            placeholder="Coursework..."
            variant="2"
            edit={edit}
          />
          <ProfileInput
            value={involvement}
            onChange={({ target }) => setInvolvement(target.value)}
            label="Involvement"
            placeholder="Involvement..."
            variant="2"
            edit={edit}
          />
          <ProfileInput
            value={leadership}
            onChange={({ target }) => setLeadership(target.value)}
            label="Leadership"
            placeholder="Leadership..."
            variant="2"
            edit={edit}
          />
          <div className="flex justify-end pt-1 gap-2">
            <button
              type="button"
              onClick={handleDeleteEducation}
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
                onClick={resetEducation}
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

export default EducationInput;
