import clsx from "clsx";
import React from "react";

// --- 1. Define the Props ---
type DefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends DefaultButtonProps {
  variant?: "primary" | "secondary";
  size?: "normal" | "large"; // <-- ADDED THIS
}

// --- 2. Create the Component ---
export default function Button({
  variant = "primary",
  size = "normal", // <-- ADDED THIS
  className,
  children,
  ...rest
}: ButtonProps) {
  // --- 3. Define Styles ---
  const baseStyles =
    "rounded-md font-medium transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  // Styles for EACH variant
  const variantStyles = {
    primary: "bg-brand-primary text-white hover:opacity-90",
    secondary: "bg-brand-secondary text-white hover:opacity-90",
  };

  // Styles for EACH size
  const sizeStyles = {
    normal: "px-4 py-2.5 text-sm",
    large: "px-6 py-3 text-base", // <-- ADDED THIS
  };

  // --- 4. Combine Classes with clsx ---
  const combinedClasses = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size], // <-- ADDED THIS
    className
  );

  // --- 5. Render the Button ---
  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
}
