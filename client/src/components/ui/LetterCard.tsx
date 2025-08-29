import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import ItemButton from "./ItemButton";
import axiosInstance from "@/lib/axiosInstance";
import { API_PATHS, BASE_URL } from "@/lib/apiPaths";

type LetterCardProps = {
  id: string;
  title: string;
  date: string;
};

const LetterCard = ({ id, title, date }: LetterCardProps) => {
  const [toggle, setToggle] = useState(false);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleOpen = () => {
    window.open(`${BASE_URL}${API_PATHS.LETTER.GET_LETTER}${id}`, "_blank");
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.LETTER.DELETE_LETTER(id)
      );
      window.location.reload();
    } catch (error) {
      console.error("Could not retrieve letters:", error);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    );

    const label =
      diffInDays < 7
        ? formatDistanceToNow(d, { addSuffix: true, includeSeconds: true })
        : format(d, "MMMM do, yyyy");

    return <label className="truncate">{label}</label>;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div className="bg-light-fg dark:bg-dark-fg border-2 border-light-bd dark:border-dark-bd rounded-sm py-2 flex items-center justify-between pl-4 pr-2 gap-1">
      <div className="flex flex-col gap-0">
        <p className="truncate font-semibold">{title}</p>
        <small className="truncate">{formatDate(date)}</small>
      </div>
      <div
        ref={buttonRef}
        className="cursor-pointer relative"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M7 4c0-.14 0-.209.008-.267a.85.85 0 0 1 .725-.725C7.79 3 7.86 3 8 3s.209 0 .267.008a.85.85 0 0 1 .725.725C9 3.79 9 3.86 9 4s0 .209-.008.267a.85.85 0 0 1-.725.725C8.21 5 8.14 5 8 5s-.209 0-.267-.008a.85.85 0 0 1-.725-.725C7 4.21 7 4.14 7 4m0 4c0-.14 0-.209.008-.267a.85.85 0 0 1 .725-.725C7.79 7 7.86 7 8 7s.209 0 .267.008a.85.85 0 0 1 .725.725C9 7.79 9 7.86 9 8s0 .209-.008.267a.85.85 0 0 1-.725.725C8.21 9 8.14 9 8 9s-.209 0-.267-.008a.85.85 0 0 1-.725-.725C7 8.21 7 8.14 7 8m0 4c0-.139 0-.209.008-.267a.85.85 0 0 1 .724-.724c.059-.008.128-.008.267-.008s.21 0 .267.008a.85.85 0 0 1 .724.724c.008.058.008.128.008.267s0 .209-.008.267a.85.85 0 0 1-.724.724c-.058.008-.128.008-.267.008s-.209 0-.267-.008a.85.85 0 0 1-.724-.724C7 12.209 7 12.139 7 12"
          />
        </svg>
        {toggle && (
          <div
            ref={toggleRef}
            className="flex flex-col absolute rounded-sm top-0 right-0 mr-6 mt-[-1em] bg-dark-tLight dark:bg-light-tLight border-2 border-light-bd dark:border-dark-bd"
          >
            <ItemButton text="Open" onClick={handleOpen} />
            <ItemButton text="Delete" onClick={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterCard;
