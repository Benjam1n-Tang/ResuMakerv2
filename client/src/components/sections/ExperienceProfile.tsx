import { useEffect, useState } from "react";
import AddButton from "../ui/AddButton";
import ExperienceInput from "../ui/ExperienceInput";
import { Experience } from "@/types";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { API_PATHS } from "@/lib/apiPaths";

const ExperienceProfile = () => {
  const [add, setAdd] = useState(false);

  const toggleAdd = () => {
    setAdd(!add);
  };

  const [experiences, setExperiences] = useState<Experience[]>([]);

  const fetchExperiences = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPERIENCE.GET_USER_ALL
      );
      setExperiences(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);
  return (
    <div className="px-2 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 items-center lg:items-start">
          <h4 className="font-semibold">Experience</h4>
          <h6>Update your experience</h6>
        </div>
        <div className="flex flex-col gap-6">
          <div className="px-0 md:px-10 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {experiences.map((experience) => (
                <ExperienceInput
                  key={experience._id}
                  id={experience._id}
                  companyP={experience.company}
                  roleP={experience.role}
                  startP={
                    experience.startDate === "Present"
                      ? "Present"
                      : experience.startDate
                      ? new Date(experience.startDate)
                      : null
                  }
                  endP={
                    experience.endDate === "Present"
                      ? "Present"
                      : experience.endDate
                      ? new Date(experience.endDate)
                      : null
                  }
                  locationP={experience.location}
                  bulletsP={experience.bullets}
                  refetch={fetchExperiences}
                />
              ))}
              {add && (
                <ExperienceInput
                  isNew={true}
                  toggleAdd={toggleAdd}
                  refetch={fetchExperiences}
                />
              )}
            </div>
            <div className="flex justify-center items-center pt-2">
              <AddButton text="Experience" onClick={toggleAdd} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceProfile;
