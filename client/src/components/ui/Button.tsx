"use client";
import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  variant: 1 | 2;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  type = "button",
  text,
  variant,
  onClick,
  className,
  disabled = false, // default false
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}   // ← just pass it directly
      className={`rounded-lg ${className}
        ${
          variant === 2
            ? "bg-light-fg dark:bg-dark-fg text-light-t dark:text-dark-t border-light-bd dark:border-dark-bd border-2"
            : `bg-primary text-light-bg ${
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:bg-primary-dark"
              }`
        }`}
    >
      {text}
    </button>
  );
};

export default Button;
