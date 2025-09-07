import { API_PATHS } from "@/lib/apiPaths";
import axiosInstance from "@/lib/axiosInstance";
import { Certificates, Education } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import AddButton from "../ui/AddButton";
import EducationInput from "../ui/EducationInput";
import CertificateInput from "../ui/CertificateInput";



const EducationProfile = () => {
  const [add, setAdd] = useState(false);
  const [add2, setAdd2] = useState(false);
  
    const toggleAdd = () => {
      setAdd(!add);
    };
    const toggleAdd2 = () => {
      setAdd2(!add2);
    };
  
    const [education, setEducation] = useState<Education[]>([]);
    const [certificates, setCertificates] = useState<Certificates[]>([])
  
    const fetchEducation = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.EDUCATION.GET_USER_ALL
        );
        setEducation(response.data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response?.data);
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    const fetchCertificates = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.CERTIFICATE.GET_USER_ALL
        );
        setCertificates(response.data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response?.data);
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    
  
    useEffect(() => {
      fetchEducation();
      fetchCertificates();
    }, []);
    return (
      <div className="px-2 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 items-center lg:items-start">
            <h4 className="font-semibold">Education</h4>
            <h6>Update your education</h6>
          </div>
          <div className="flex flex-col gap-6">
            <div className="px-0 md:px-10 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {education.map((edu) => (
                  <EducationInput
                    key={edu.degree}
                    id={edu._id}
                    schoolP={edu.school}
                    degreeP={edu.degree}
                    gradDateP={edu.gradDate ? new Date(edu.gradDate) : null}
                    locationP={edu.location}
                    gpaP={edu.gpa?.toString()}
                    courseworkP={edu.coursework}
                    involvementP={edu.involvement}
                    leadershipP={edu.leadership}
                    refetch={fetchEducation}
                  />
                ))}
                {add && (
                  <EducationInput
                    isNew={true}
                    toggleAdd={toggleAdd}
                    refetch={fetchEducation}
                  />
                )}
              </div>
              <div className="flex justify-center items-center pt-2">
                <AddButton text="Education" onClick={toggleAdd} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center lg:items-start">
            <h4 className="font-semibold">Certificates</h4>
            <h6>Update your certificates</h6>
          </div>
          <div className="flex flex-col gap-6">
            <div className="px-0 md:px-10 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {certificates.map((certif) => (
                  <CertificateInput
                    key={certif._id}
                    id={certif._id}
                    titleP={certif.title}
                    organizationP={certif.organization}
                    endDateP={certif.endDate ? new Date(certif.endDate) : null}
                    refetch={fetchCertificates}
                  />
                ))}
                {add2 && (
                  <CertificateInput
                    isNew={true}
                    toggleAdd={toggleAdd2}
                    refetch={fetchCertificates}
                  />
                )}
              </div>
              <div className="flex justify-center items-center pt-2">
                <AddButton text="Certificate" onClick={toggleAdd2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default EducationProfile;
