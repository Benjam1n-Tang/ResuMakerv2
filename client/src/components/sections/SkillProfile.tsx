import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import { seperateArray, seperateString } from "@/lib/helper";
import { Skills } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import ProfileInput from "../ui/ProfileInput";

const SkillProfile = () => {
  const [skill, setSkill] = useState<Skills>();
  const [languages, setLanguages] = useState("");
  const [technical, setTechnical] = useState("");
  const [web, setWeb] = useState("");
  const [other, setOther] = useState("");
  const [interests, setInterests] = useState("");

  const [edit, setEdit] = useState(false);

  const applySkillData = (data: Skills) => {
    setSkill(data);
    setLanguages(seperateArray(data.languages || []) || "");
    setTechnical(seperateArray(data.technical || []) || "");
    setWeb(seperateArray(data.web || []) || "");
    setOther(seperateArray(data.other || []) || "");
    setInterests(seperateArray(data.interests || []) || "");
  };

  const fetchSkill = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SKILL.GET_SKILL);
      applySkillData(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          try {
            const createResponse = await axiosInstance.post(
              API_PATHS.SKILL.CREATE_SKILL,
              {
                languages: [],
                technical: [],
                web: [],
                other: [],
                interests: [],
              }
            );
            applySkillData(createResponse.data.data);
          } catch (createErr) {
            console.error("Failed to create skill:", createErr);
          }
        } else {
          console.error("Axios error:", err.response?.data);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
        setEdit(false)
    }
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!skill?._id) return;
      const response = await axiosInstance.put(
        API_PATHS.SKILL.UPDATE_SKILL(skill?._id),
        {
          languages: seperateString(languages),
          technical: seperateString(technical),
          web: seperateString(web),
          other: seperateString(other),
          interests: seperateString(interests),
        }
      );
      console.log("Skill updated:", response.data.data);

      fetchSkill();
      toggleEdit();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
        alert(
          err.response?.data?.message ||
            "Please Fill all appropriate skill fields!"
        );
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchSkill();
  }, []);

  return (
    <div className="px-2 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 items-center lg:items-start">
          <h4 className="font-semibold">Skills & Interests</h4>
          <h6>Update your skills</h6>
        </div>
        <div className="flex flex-col gap-6">
          <div className="px-0 md:px-10 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <form
                onSubmit={handleUpdateSkill}
                className="w-full border-2 border-light-bd dark:border-dark-bd py-2 px-4 rounded-lg flex flex-col gap-1"
              >
                <ProfileInput
                  value={languages}
                  onChange={({ target }) => setLanguages(target.value)}
                  label="Language Skills"
                  placeholder="Languages..."
                  variant="2"
                  edit={edit}
                />
                <ProfileInput
                  value={technical}
                  onChange={({ target }) => setTechnical(target.value)}
                  label="Technical Skills"
                  placeholder="Technical..."
                  variant="2"
                  edit={edit}
                />
                <ProfileInput
                  value={web}
                  onChange={({ target }) => setWeb(target.value)}
                  label="Web Skills"
                  placeholder="Web..."
                  variant="2"
                  edit={edit}
                />
                <ProfileInput
                  value={other}
                  onChange={({ target }) => setOther(target.value)}
                  label="Other Skills"
                  placeholder="Other..."
                  variant="2"
                  edit={edit}
                />
                <ProfileInput
                  value={interests}
                  onChange={({ target }) => setInterests(target.value)}
                  label="Interests"
                  placeholder="Interests..."
                  variant="2"
                  edit={edit}
                />
                <div className="flex justify-end pt-1 gap-2">
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
                      onClick={fetchSkill}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProfile;
