"use client";

import { useState } from "react";
import ProfileInput from "../ui/ProfileInput";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Button from "../ui/Button";

type SectionKey =
  | "education"
  | "experience"
  | "projects"
  | "certificates"
  | "skills";

type CreateDocumentProps = {
  mainOrder: SectionKey[];
  setMainOrder: React.Dispatch<React.SetStateAction<SectionKey[]>>;
  mainResumeTitle: string;
  mainLetterTitle: string;
  setMainResumeTitle: React.Dispatch<React.SetStateAction<string>>;
  setMainLetterTitle: React.Dispatch<React.SetStateAction<string>>;
};

const CreateDocument = ({
  mainOrder,
  setMainOrder,
  mainResumeTitle,
  mainLetterTitle,
  setMainResumeTitle,
  setMainLetterTitle,
}: CreateDocumentProps) => {
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
    setMainResumeTitle(resumeTitle);
    setMainLetterTitle(letterTitle);
  };

  return (
    <div>
      <h5 className="font-semibold pb-3">Document</h5>
      <div className="flex flex-col gap-3">
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
          <Button text="Save Changes" variant={1} className="py-2 px-4" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;
