import { useState } from "react";
import ProfileInput from "./ProfileInput";
import Button from "./Button";
import axiosInstance from "@/lib/axiosInstance";
import { API_PATHS } from "@/lib/apiPaths";
import axios from "axios";

type SocialInputProps = {
  number: number;
  isNew?: boolean;
  id?: string;
  initialTitle?: string;
  initialLink?: string;
  toggleAdd?: () => void;
  refetch?: () => void;
};
const SocialInput = ({
  number,
  isNew = false,
  id,
  initialTitle,
  initialLink,
  toggleAdd,
  refetch,
}: SocialInputProps) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [link, setLink] = useState(initialLink || "");
  const [edit, setEdit] = useState(false);

  const handleCreateSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        API_PATHS.SOCIAL.CREATE_SOCIAL,
        {
          title,
          link,
        }
      );
      console.log("Social created:", response.data.data);

      setTitle("");
      setLink("");
      if (toggleAdd) toggleAdd();
      if (refetch) refetch();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to create social link");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleUpdateSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      const response = await axiosInstance.put(
        API_PATHS.SOCIAL.UPDATE_SOCIAL(id),
        {
          title,
          link,
        }
      );
      console.log("Social updated:", response.data.data);
      
      if (toggleAdd) toggleAdd();
      if (refetch) refetch();
      toggleEdit()
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Please Fill all appropriate social fields!");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const resetSocial = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance.get(API_PATHS.SOCIAL.GET_SOCIAL(id));
      const social = response.data.data;

      setTitle(social.title);
      setLink(social.link);
      setEdit(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to fetch social link");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleDeleteSocial = async () => {
    try {
      if (id) {
        await axiosInstance.delete(API_PATHS.SOCIAL.DELETE_SOCIAL(id));
        console.log("Social deleted:", id);
        if (refetch) refetch();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(err.response?.data?.message || "Failed to delete social link");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="flex-row flex gap-4 w-full">
      <h6 className="flex items-center">{number}</h6>
      {isNew ? (
        <form
          onSubmit={handleCreateSocial}
          className="flex flex-col gap-2 w-full"
        >
          <div className="sm:flex-row flex-col flex w-full sm:gap-3 gap-1">
            <ProfileInput
              label="Title"
              onChange={({ target }) => setTitle(target.value)}
              edit={true}
              value={title}
              placeholder={"Title"}
              variant={"1"}
            />
            <ProfileInput
              label="Link"
              onChange={({ target }) => setLink(target.value)}
              edit={true}
              value={link}
              placeholder={"Link"}
              variant={"1"}
            />
          </div>
          <div className="flex justify-end">
            <Button
              className="px-4 py-1"
              text="Create"
              variant={1}
              type="submit"
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleUpdateSocial} className="flex flex-col gap-2 w-full">
          <div className="sm:flex-row flex-col flex w-full sm:gap-3 gap-1">
            <ProfileInput
              label="Title"
              onChange={({ target }) => setTitle(target.value)}
              edit={edit}
              value={title}
              placeholder={"Title"}
              variant={"1"}
            />
            <ProfileInput
              label="Link"
              onChange={({ target }) => setLink(target.value)}
              edit={edit}
              value={link}
              placeholder={"Link"}
              variant={"1"}
            />
          </div>
          <div className="flex flex-row gap-2 justify-end">
            <button
              type="button"
              onClick={handleDeleteSocial}
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
                onClick={resetSocial}
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
    </div>
  );
};

export default SocialInput;
