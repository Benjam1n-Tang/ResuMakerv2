"use client";

import { useRef, useState } from "react";
// import { Page, View, Document, Text, pdf } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import dynamic from "next/dynamic";
import { sampleResumes } from "@/data/constants";
import {
  Certificates,
  Education,
  Experience,
  Header,
  Letter,
  PDFData,
  Projects,
  Skills,
} from "@/types";
import { styles } from "@/styles/pdfStyles";
import EducationSection from "../sections/Education";
import HeaderSection from "../sections/Header";
import ExperienceSection from "../sections/Experience";
import SkillsSection from "../sections/Skills";
import ProjectSection from "../sections/Projects";
import CertificateSection from "../sections/Certificates";
import ContactSection from "../sections/Contact";
import LetterSection from "../sections/Letter";
import Button from "../ui/Button";
import DocSwitch from "../ui/DocSwitch";
import axiosInstance from "@/lib/axiosInstance";
import { API_PATHS } from "@/lib/apiPaths";

const PDFDocument = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.Document),
  { ssr: false }
);
const PDFPage = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.Page),
  { ssr: false }
);
const PDFView = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.View),
  { ssr: false }
);
const PDFText = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.Text),
  { ssr: false }
);

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <p className="flex justify-center items-center w-full h-full">
        Loading PDF...
      </p>
    ),
  }
);

const sectionMap = {
  education: (data: PDFData) => <EducationSection education={data.education} />,
  experience: (data: PDFData) => (
    <ExperienceSection experience={data.experience} />
  ),
  projects: (data: PDFData) => <ProjectSection projects={data.projects} />,
  certificates: (data: PDFData) => (
    <CertificateSection certificates={data.certificates} />
  ),
  skills: (data: PDFData) => <SkillsSection skills={data.skills} />,
};

type SectionKey = keyof typeof sectionMap;

type PDFProps = {
  data: PDFData;
};

type ResumeProps = {
  initialData?: PDFData;
  resumeTitle?: string;
  letterTitle?: string;
  order: SectionKey[];
  header?: Header;
  education?: Education[];
  certificates?: Certificates[];
  experience?: Experience[];
  projects?: Projects[];
  skills?: Skills;
  letter?: Letter;
};

const Doc = ({
  initialData,
  resumeTitle,
  letterTitle,
  order,
  header,
  education,
  certificates,
  experience,
  projects,
  skills,
  letter,
}: ResumeProps) => {
  const [toggle, setToggle] = useState(true);
  const [pdfData, setPdfData] = useState<PDFData>(
    initialData || 
    sampleResumes[0]
  );
  const keyRef = useRef(0);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const mergedData: PDFData = {
    ...pdfData,
    resumeName: resumeTitle,
    letterName: letterTitle,
    header: header || pdfData.header,
    education: education,
    certificates: certificates,
    experience: experience,
    projects: projects,
    skills: skills,
    letter: letter,
  };

  keyRef.current++;

  const uploadResume = async (blob: Blob, fileName: string, title: string) => {
    const formData = new FormData();
    formData.append("file", blob, fileName);
    formData.append("title", title);

    try {
      const response = await axiosInstance.post(
        API_PATHS.RESUME.CREATE_RESUME,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Resume upload failed:", error);
      throw error;
    }
  };

  const uploadLetter = async (blob: Blob, fileName: string, title: string) => {
    const formData = new FormData();
    formData.append("file", blob, fileName);
    formData.append("title", title);

    try {
      const response = await axiosInstance.post(
        API_PATHS.LETTER.CREATE_LETTER,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Cover Letter upload failed:", error);
      throw error;
    }
  };

  const ResumeDocs = ({ data }: PDFProps) => (
    <PDFDocument title={data.resumeName ? `${data.resumeName}.pdf` : "Resume.pdf"}>
      <PDFPage size="LETTER" style={styles.page}>
        <PDFView style={{ gap: 12 }}>
          <HeaderSection header={data.header} />
          <PDFView style={{ gap: 4 }}>
            {order.map((key) => (
              <PDFView key={key}>{sectionMap[key](data)}</PDFView>
            ))}
          </PDFView>
        </PDFView>
      </PDFPage>
    </PDFDocument>
  );

  const LetterDocs = ({ data }: PDFProps) => (
    <PDFDocument
      title={data.letterName ? `${data.letterName}.pdf` : "CoverLetter.pdf"}
    >
      <PDFPage size="LETTER" style={styles.page}>
        <PDFView style={{ fontSize: 12, lineHeight: 1.4, gap: 10 }}>
          <ContactSection contact={data.header} />
          <PDFText style={styles.bold}>
            {""}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </PDFText>
          <LetterSection name={data.header.name} letter={data.letter} />
        </PDFView>
      </PDFPage>
    </PDFDocument>
  );

  const saveFile = async () => {
    const doc = toggle ? (
      <ResumeDocs data={mergedData} />
    ) : (
      <LetterDocs data={mergedData} />
    );
    const blob = await pdf(doc).toBlob();

    const fileName = toggle
      ? `${
          mergedData.resumeName ? `${mergedData.resumeName}.pdf` : "Resume.pdf"
        }`
      : `${
          mergedData.letterName
            ? `${mergedData.letterName}.pdf`
            : "CoverLetter.pdf"
        }`;

    const title = toggle
      ? mergedData.resumeName || "Resume"
      : mergedData.letterName || "CoverLetter";

    saveAs(blob, fileName);

    try {
      if (toggle) {
        const result = await uploadResume(blob, fileName, title);
        console.log("Resume uploaded:", result);
      }
      if (!toggle) {
        const result = await uploadLetter(blob, fileName, title);
        console.log("Cover letter uploaded:", result);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <DocSwitch toggle={toggle} handleToggle={handleToggle} />
        <Button
          variant={1}
          text={"Save PDF"}
          onClick={saveFile}
          className="px-4 py-1"
        />
      </div>
      <div className="aspect-[8.5/11] w-full">
        <PDFViewer width="100%" height="100%" key={keyRef.current}>
          {toggle ? (
            <ResumeDocs data={mergedData} />
          ) : (
            <LetterDocs data={mergedData} />
          )}
        </PDFViewer>
      </div>
    </div>
  );
};

export default Doc;
