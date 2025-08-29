type IconButtonProps = {
  text: string;
  onClick?: () => void;
};

const ItemButton = ({ text, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-25 h-8 cursor-pointer hover:bg-dark-tLighter dark:hover:bg-light-tLighter flex justify-start gap-3.5 px-2 items-center"
    >
      {text === "Open" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 text-light-t dark:text-dark-t"
          viewBox="0 0 12 12"
        >
          <path
            fill="currentColor"
            d="M4 3.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-.25a.75.75 0 0 1 1.5 0V8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h.25a.75.75 0 0 1 0 1.5zm2.75 0a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69L7.28 5.78a.75.75 0 0 1-1.06-1.06L7.44 3.5z"
          />
        </svg>
      )}
      {text === "Delete" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 text-light-t dark:text-dark-t"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21V6H4V4h5V3h6v1h5v2h-1v15zm2-2h10V6H7zm2-2h2V8H9zm4 0h2V8h-2zM7 6v13z"
          />
        </svg>
      )}
      {text}
    </button>
  );
};

export default ItemButton;
