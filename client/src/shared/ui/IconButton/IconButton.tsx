import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = {
  children: ReactNode;
  "aria-label": string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children">;

export function IconButton({
  children,
  className = "",
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={[styles.button, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
