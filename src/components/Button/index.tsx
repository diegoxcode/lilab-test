import { CSSProperties } from "react";
import Svg from "../Svg";
import styles from "./button.module.css";

interface ButtonProps {
  size?: string;
  color?: string;
  onKeyDown?: any
  disabled?: boolean;
  type?: any;
  onClick: any;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: string;
  isIcon?: boolean;
  onlyIcon?: boolean;
  outline?: boolean;
  id?: string;
  title?: string;
}

const Button = ({
  onClick,
  disabled = false,
  color = "default",
  type = "submit",
  children,
  onKeyDown,
  icon,
  isIcon,
  onlyIcon,
  id,
  outline,
  title,
  isLoading
}: ButtonProps) => {
  const iconButton: CSSProperties = {
    right: onlyIcon ? "0px" : "6px",
  };

  const paddingButton: CSSProperties = {
    padding: onlyIcon ? "5px 3px" : "8px 15px",
  };

  return (
    <div
      className={`${outline ? styles.wrapper__buttonOutline : styles.wrapper__button} ${styles[color]} ${isLoading ? "loading-custom" : ""}`}
      title={title}
    >
      <button
        style={paddingButton}
        onClick={onClick}
        type={type}
        onKeyDown={onKeyDown}
        id={id}
        disabled={disabled}
        className={
          isIcon
            ? styles.button__icon
            : styles.button__notIcon || onlyIcon
            ? styles.button__children
            : styles.button__notChildren
        }
      >
        {
            isLoading ?
            <span className={styles.button__loader__icon}></span>
            :
            <>
                {isIcon && <Svg style={iconButton} icon={icon} />}
                <span>
                    {children}
                </span>
            </>
        }
      </button>
    </div>
  );
};

export default Button;
