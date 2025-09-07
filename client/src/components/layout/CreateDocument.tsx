"use client";

import { useEffect, useState } from "react";
import ProfileInput from "../ui/ProfileInput";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Button from "../ui/Button";
import {
  Education,
  Experience,
  Header,
  Letter,
  Projects,
  Skills,
} from "@/types";
import OpenAI from "openai";

type SectionKey =
  | "education"
  | "experience"
  | "projects"
  | "certificates"
  | "skills";

type CreateDocumentProps = {
  mainWebsite: string;
  setMainWebsite: React.Dispatch<React.SetStateAction<string>>;
  mainOrder: SectionKey[];
  setMainOrder: React.Dispatch<React.SetStateAction<SectionKey[]>>;
  mainResumeTitle: string;
  mainLetterTitle: string;
  setMainResumeTitle: React.Dispatch<React.SetStateAction<string>>;
  setMainLetterTitle: React.Dispatch<React.SetStateAction<string>>;
  apiKey: string | null;

  header: Header;
  education: Education[];
  experience: Experience[];
  projects: Projects[];
  skills?: Skills;
  letter: Letter;
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
  setProjects: React.Dispatch<React.SetStateAction<Projects[]>>;
  setLetter: React.Dispatch<React.SetStateAction<Letter>>;
};

const CreateDocument = ({
  mainWebsite,
  setMainWebsite,
  mainOrder,
  setMainOrder,
  mainResumeTitle,
  mainLetterTitle,
  setMainResumeTitle,
  setMainLetterTitle,
  apiKey,

  header,
  education,
  experience,
  projects,
  skills,
  letter,
  setExperience,
  setProjects,
  setLetter,
}: CreateDocumentProps) => {
  const [website, setWebsite] = useState(mainWebsite);
  const [order, setOrder] = useState<SectionKey[]>(mainOrder);
  const [resumeTitle, setResumeTitle] = useState(mainResumeTitle);
  const [letterTitle, setLetterTitle] = useState(mainLetterTitle);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = Array.from(order);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);

    setOrder(newOrder);
  };

  const handleSave = () => {
    setMainOrder(order);
    setMainWebsite(website);
    setMainResumeTitle(resumeTitle);
    setMainLetterTitle(letterTitle);
  };

  const handleGenerateResume = async () => {
    if (!apiKey || apiKey.length <= 10) return;

    try {
      const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      const currentData = {
        header,
        education,
        experience,
        projects,
        skills,
        letter,
        resumeTitle,
        letterTitle,
        website,
      };

      const prompt = `
You are a professional career coach and resume optimizer.
Given the following user resume data in JSON, rewrite it to be most relevant for applying to the website: ${
        website || "N/A"
      }.
- Pick the most relevant experiences and projects.
- Set their 'active' field to true for selected items.
- Update bullets to highlight achievements relevant to the website/company.
- Suggest a new resumeTitle and letterTitle.
- For the cover letter, suggest an updated letter body and closing.
Output JSON in this format:
{
  "resumeTitle": "<string>",
  "letterTitle": "<string>",
  "experience": [ ...updated experience objects... ],
  "projects": [ ...updated project objects... ],
  "letter": {
    "manager": "<string>",
    "company": "<string>",
    "position": "<string>",
    "salutation": "<string>",
    "body": ["<paragraphs>"],
    "closingText": "<string>"
  }
}
Use concise and professional formatting.
Here is the current data: ${JSON.stringify(currentData)}
`;

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a professional career coach and resume/cover letter optimizer.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      });

      const aiText = completion.choices[0].message.content?.trim() || "";

      let parsed: {
        resumeTitle?: string;
        letterTitle?: string;
        experience?: Experience[];
        projects?: Projects[];
        letter?: Letter;
      } = {};

      try {
        parsed = JSON.parse(aiText);
      } catch {
        console.warn("AI output not JSON, using fallback");

        parsed = {
          resumeTitle: resumeTitle || "My Resume",
          letterTitle: letterTitle || "Cover Letter",
          experience: experience.map((e) => ({ ...e, active: true })),
          projects: projects.map((p) => ({ ...p, active: true })),
          letter: letter,
        };
      }

      // Update state with AI suggestions
      if (parsed.resumeTitle) setResumeTitle(parsed.resumeTitle);
      if (parsed.letterTitle) setLetterTitle(parsed.letterTitle);
      if (parsed.experience) setExperience(parsed.experience);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.letter) setLetter(parsed.letter);
    } catch (err) {
      console.error("Error generating AI resume:", err);
    }
  };

  return (
    <div>
      <h5 className="font-semibold pb-3">Document</h5>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-center gap-1">
          <ProfileInput
            label="Website (You must have your AI key saved to use this)"
            value={website}
            edit={Boolean(apiKey && apiKey.length > 10)}
            onChange={({ target }) => setWebsite(target.value)}
            placeholder="Website of application."
            variant="1"
          />
          <Button
            variant={1}
            text="Generate CV + CL"
            onClick={handleGenerateResume}
            disabled={
              !apiKey || apiKey.length <= 10 || mainWebsite.trim() === ""
            }
            className="py-1 px-2"
          />
        </div>
        <ProfileInput
          label="Resume Title"
          value={resumeTitle}
          onChange={({ target }) => setResumeTitle(target.value)}
          edit={true}
          placeholder="Resume Title"
          variant="1"
        />
        <ProfileInput
          label="Cover Letter Title"
          value={letterTitle}
          onChange={({ target }) => setLetterTitle(target.value)}
          edit={true}
          placeholder="Cover Letter Title"
          variant="1"
        />
        <div className="flex flex-col gap-1">
          <p className="pl-0.5 font-medium">Select Section Order:</p>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-2"
                >
                  {order.map((section, index) => (
                    <Draggable
                      key={section}
                      draggableId={section}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-2"
                          style={provided.draggableProps.style}
                        >
                          <span className="w-6 text-center font-medium hidden sm:block">
                            {index + 1}
                          </span>
                          <div
                            {...provided.dragHandleProps}
                            className={`flex-1 p-2 border rounded-md bg-light-fg dark:bg-dark-fg ${
                              snapshot.isDragging ? "opacity-70" : ""
                            }`}
                          >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="flex justify-end">
          <Button
            text="Save Changes"
            variant={1}
            className="py-2 px-4"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;
