"use client";

import { Certificates, Education, Experience } from "@/types";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import ProfileInput from "../ui/ProfileInput";
import Button from "../ui/Button";

type CreateEducationProps = {
  experience: Experience[];
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
};

const CreateExperience = ({
  experience,
  setExperience,
}: CreateEducationProps) => {
  const [draftExperience, setDraftExperience] =
    useState<Experience[]>(experience);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(draftExperience);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setDraftExperience(items);
  };

  const handleBulletChange = (index: number, value: string) => {
  setDraftExperience((prev) =>
    prev.map((exp, i) =>
      i === index
        ? {
            ...exp,
            bullets: value
              .split(/\n/) // split only on newlines
              .map((s) => s.replace(/^-\s*/, "")) 
          }
        : exp
    )
  );
};

  const handleSave = () => {
    setExperience(draftExperience);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="font-semibold pb-3">Experience</h5>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="education">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-3"
              >
                {draftExperience.map((exp, index) => (
                  <Draggable
                    key={exp._id}
                    draggableId={exp._id || ""}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`p-3 border rounded-md bg-light-fg dark:bg-dark-fg flex flex-col gap-1 ${
                          snapshot.isDragging ? "opacity-70" : ""
                        }`}
                        style={provided.draggableProps.style}
                      >
                        <div className="flex items-center gap-1">
                          <span
                            {...provided.dragHandleProps}
                            className="cursor-grab"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill="currentColor"
                                d="M10 13a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m-4 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m5-9a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0M6 5a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                              />
                            </svg>
                          </span>
                          <div className="font-semibold flex-1">
                            <div>{exp.role}</div>
                            <div className="italic font-normal">
                              {exp.company}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              setDraftExperience((prev) =>
                                prev.map((s, i) =>
                                  i === index ? { ...s, active: !s.active } : s
                                )
                              )
                            }
                            className="text-sm"
                          >
                            <div>
                              {exp.active ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="2em"
                                  height="2em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#267026"
                                    d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="2em"
                                  height="2em"
                                  viewBox="0 0 56 56"
                                >
                                  <path
                                    fill="#702626"
                                    d="M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265m5.836-11.203a1.97 1.97 0 0 1-1.969-1.992c0-.54.211-1.008.586-1.36l7.008-7.03l-7.008-7.032c-.375-.328-.586-.82-.586-1.36c0-1.077.867-1.945 1.969-1.945c.54 0 1.008.211 1.36.586l7.03 7.008l7.079-7.031c.398-.422.843-.61 1.36-.61a1.98 1.98 0 0 1 1.968 1.97c0 .538-.164.984-.586 1.359l-7.031 7.054l7.008 6.985c.375.375.585.843.585 1.406c0 1.102-.89 1.992-1.968 1.992a1.98 1.98 0 0 1-1.407-.586l-7.007-7.031l-6.985 7.031a1.93 1.93 0 0 1-1.406.586"
                                  />
                                </svg>
                              )}
                            </div>
                          </button>
                        </div>
                        <div className="flex flex-col gap-1">
                          <ProfileInput
                            label="Bullets Seperated By New Line"
                            value={exp.bullets?.map((b) => `- ${b}`).join("\n") || ""}
                            onChange={({ target }) =>
                              handleBulletChange(index, target.value)
                            }
                            edit={true}
                            placeholder="Coursework..."
                            variant="2"
                          />
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

      <div className="flex justify-end mt-3">
        <Button
          text="Save Changes"
          variant={1}
          className="py-2 px-4"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default CreateExperience;
