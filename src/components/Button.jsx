import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) {
  const baseStyles =
    "rounded-full transition-all duration-300 inline-flex items-center justify-center";

  const variants = {
    primary: "bg-[#6B7F59] text-white hover:bg-[#8B9D83] active:scale-95",
    secondary: "bg-[#E8DCC4] text-[#3A3A3A] hover:bg-[#D4CBBB] active:scale-95",
    outline:
      "border-2 border-[#6B7F59] text-[#6B7F59] hover:bg-[#6B7F59] hover:text-white active:scale-95",
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3",
    lg: "px-10 py-4 text-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
