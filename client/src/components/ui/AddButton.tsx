type AddButtonProps = {
    text:string;
    onClick:() => void;
}

const AddButton = ({text, onClick}: AddButtonProps) => {
  return (
    <button className="h-6 bg-primary-content text-primary-dark w-full sm:w-45 rounded-lg flex justify-center items-center gap-2 hover:bg-dark-tLight" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-3 h-3"
      >
        <path
          fill="currentColor"
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"
        />
      </svg>
      Add New {text}
    </button>
  );
};

export default AddButton;
