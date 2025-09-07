import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import { Projects } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import AddButton from "../ui/AddButton";
import ProjectInput from "../ui/ProjectInput";

const ProjectProfile = () => {
  const [add, setAdd] = useState(false);

  const toggleAdd = () => {
    setAdd(!add);
  };

  const [projects, setProjects] = useState<Projects[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.PROJECT.GET_USER_ALL);
      setProjects(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="px-2 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 items-center lg:items-start">
          <h4 className="font-semibold">Projects</h4>
          <h6>Update your projects</h6>
        </div>
        <div className="flex flex-col gap-6">
          <div className="px-0 md:px-10 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {projects.map((proj, index) => (
                <ProjectInput
                  key={proj._id}
                  id={proj._id}
                  titleP={proj.title}
                  linkP={proj.link}
                  stackP={proj.stack}
                  bulletsP={proj.bullets}
                  refetch={fetchProjects}
                />
              ))}
              {add && (
                <ProjectInput
                  isNew={true}
                  toggleAdd={toggleAdd}
                  refetch={fetchProjects}
                />
              )}
            </div>
            <div className="flex justify-center items-center pt-2">
              <AddButton text="Project" onClick={toggleAdd} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProfile;
