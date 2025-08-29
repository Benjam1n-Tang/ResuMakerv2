import React from "react";

type ProfileButtonProps = {
  title: string;
  page: string;
  setPage: (page: string) => void;
};

const ProfileButton = ({ title, page, setPage }: ProfileButtonProps) => {
  return (
    <div
      onClick={() => setPage(title)}
      className={`${
        page === title
          ? "bg-primary text-dark-t"
          : "hover:bg-dark-tLighter bg-light-fg dark:bg-dark-fg border-2 border-light-bd dark:border-dark-bd"
      } lg:w-36 lg:h-6 cursor-pointer rounded-lg font-semibold justify-between lg:pl-2 p-1.5 lg:pr-1 items-center flex`}
    >
      <div>
        {title === "User Info" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {title === "Passwords/Keys" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M218.1 167.2c0 13 0 25.6 4.1 37.4c-43.1 50.6-167.5 194.5-167.5 194.5l2.9 36.3s34.8 33 40 28c15.4-15 24.8-25.2 24.8-25.2l7.24-43.35l47.11-3.47l3.78-46.8l49.63-.95l.49-50.09l52.69 2.1l9-18.84c15.5 6.7 29.6 9.4 47.7 9.4c68.5 0 124-53.4 124-119.2S408.5 48 340 48s-121.9 53.4-121.9 119.2M406.85 144A38.85 38.85 0 1 1 368 105.15A38.81 38.81 0 0 1 406.85 144"
            />
          </svg>
        )}
        {title === "Experience" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21zm6-15h4V4h-4z"
            />
          </svg>
        )}
        {title === "Edu./Certifs." && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17z"
            />
          </svg>
        )}
        {title === "Projects" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M2 20V4h8l2 2h10v14z" />
          </svg>
        )}
        {title === "Skills" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="m13.073 15l-.384 1.605c-.184.771-.865 1.33-1.67 1.39l-.144.005h-1.75c-.818 0-1.535-.516-1.776-1.262l-.038-.133L6.928 15zM10 2c3.314 0 6 2.597 6 5.8c0 1.677-.745 3.216-2.204 4.594a.6.6 0 0 0-.145.213l-.026.081L13.311 14H6.689l-.313-1.311a.6.6 0 0 0-.17-.295c-1.39-1.312-2.133-2.77-2.2-4.355L4 7.8l.003-.191C4.108 4.494 6.753 2 10 2"
            />
          </svg>
        )}
      </div>

      <p className="hidden lg:flex"> {title} </p>
      <div className="hidden lg:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-current"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="m10 17l5-5m0 0l-5-5"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProfileButton;
