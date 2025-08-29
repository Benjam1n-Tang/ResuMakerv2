"use client";
import React from "react";

type ButtonProps = {
  //   children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  variant: 1 | 2;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  type = "button",
  text,
  variant,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg  ${className}
      ${
        variant === 2
          ? "bg-light-fg dark:bg-dark-fg text-light-t dark:text-dark-t border-light-bd dark:border-dark-bd border-2"
          : "bg-primary text-light-bg hover:bg-primary-dark"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
