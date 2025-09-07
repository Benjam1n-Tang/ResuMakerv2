import { useState } from "react";
import ProfileInput from "./ProfileInput";
import axiosInstance from "@/lib/axiosInstance";
import { API_PATHS } from "@/lib/apiPaths";
import axios from "axios";
import Button from "./Button";
import { convertToBullet, convertToString } from "@/lib/helper";

type ExperienceInputProps = {
  id?: string | undefined | null;
  titleP?: string;
  organizationP?: string;
  isNew?: boolean;
  endDateP?: Date | "Present" | null;
  toggleAdd?: () => void;
  refetch?: () => void;
};

const CertificateInput = ({
  id,
  titleP = "",
  organizationP = "",
  endDateP = null,
  isNew,
  toggleAdd,
  refetch,
}: ExperienceInputProps) => {
  const [title, setTitle] = useState(titleP);
  const [organization, setOrganization] = useState(organizationP);
  const [endDate, setEndDate] = useState<Date | "Present" | null>(endDateP);

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const resetCertificate = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.CERTIFICATE.GET_CERTIFICATE(id)
      );
      const certificate = response.data.data;

      setTitle(certificate.company);
      setOrganization(certificate.organization);
      setEndDate(
        certificate.endDate === "Present"
          ? "Present"
          : certificate.endDate
          ? new Date(certificate.endDate)
          : null
      );
      setEdit(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to fetch certificate");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        API_PATHS.CERTIFICATE.CREATE_CERTIFICATE,
        {
          title,
          organization,
          endDate,
        }
      );
      console.log("Certificate created:", response.data.data);

      setTitle("");
      setOrganization("");
      setEndDate(null);
      if (refetch) refetch();
      if (toggleAdd) toggleAdd();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to create certificate");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleDeleteCertificate = async () => {
    try {
      if (id) {
        await axiosInstance.delete(
          API_PATHS.CERTIFICATE.DELETE_CERTIFICATE(id)
        );
        console.log("Certificate deleted:", id);
        if (refetch) refetch();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to delete certificate");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleUpdateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      const response = await axiosInstance.put(
        API_PATHS.EXPERIENCE.UPDATE_EXPERIENCE(id),
        {
          title,
          organization,
          endDate,
        }
      );
      console.log("Certificate updated:", response.data.data);

      if (toggleAdd) toggleAdd();
      if (refetch) refetch();
      toggleEdit();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(
          err.response?.data?.message ||
            "Please Fill all appropriate certificate fields!"
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
          onSubmit={handleCreateCertificate}
          className="w-full border-2 border-light-bd dark:border-dark-bd py-2 px-4 rounded-lg flex flex-col gap-1"
        >
          <ProfileInput
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            label="Title"
            placeholder="Your Certificate Title..."
            variant="1"
            edit={true}
          />
          <ProfileInput
            value={organization}
            onChange={({ target }) => setOrganization(target.value)}
            label="Organization"
            placeholder="Your Certificate Organization..."
            variant="1"
            edit={true}
          />
          <ProfileInput
            date={endDate}
            onDateChange={setEndDate}
            label="End Date"
            placeholder="End Date..."
            variant="3"
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
          onSubmit={handleUpdateCertificate}
          className="w-full border-2 border-light-bd dark:border-dark-bd py-2 px-4 rounded-lg flex flex-col gap-1"
        >
          <ProfileInput
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            label="Title"
            placeholder="Your Certificate Title..."
            variant="1"
            edit={edit}
          />
          <ProfileInput
            value={organization}
            onChange={({ target }) => setOrganization(target.value)}
            label="Organization"
            placeholder="Your Certificate Organization..."
            variant="1"
            edit={edit}
          />
          <ProfileInput
            date={endDate}
            onDateChange={setEndDate}
            label="End Date"
            placeholder="End Date..."
            variant="3"
            edit={edit}
          />
          <div className="flex justify-end pt-1 gap-2">
            <button
              type="button"
              onClick={handleDeleteCertificate}
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
                onClick={resetCertificate}
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

export default CertificateInput;
