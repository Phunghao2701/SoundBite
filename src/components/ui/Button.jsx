import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon: Icon,
  ...props
}) => {
  // Định nghĩa các style khác nhau
  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    outline:
      "border border-slate-600 hover:border-indigo-500 text-slate-300 hover:text-white",
    ghost: "hover:bg-slate-800 text-slate-400 hover:text-white",
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
