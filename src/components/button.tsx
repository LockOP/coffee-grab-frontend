import React from "react";

export default function Button({
  label = "Button",
  type = "primary",
  onClick = () => {},
}: {
  label?: string;
  type?: "primary" | "secondary";
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 border box-border h-[62px] flex items-center justify-center text-[16px] font-semibold rounded-2xl cursor-pointer ${
        type === "primary"
          ? "bg-primary text-white border-primary active:bg-primaryDark active:border-primaryDark hover:bg-primaryDark hover:border-primaryDark"
          : type === "secondary"
          ? "bg-white text-primary border-white"
          : "bg-white text-primary border-white"
      }`}
    >
      {label}
    </div>
  );
}
