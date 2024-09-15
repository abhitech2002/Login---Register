import React from "react";
import styles from "../../styles/common.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPasswordToggle?: boolean;
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  error,
  showPasswordToggle,
  togglePasswordVisibility,
  showPassword,
}) => {
  return (
    <div className={styles.inputContainer}>
      {/* <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label> */}
      <div className={styles.inputWrapper}>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`${styles.inputField} ${error ? styles.error : ''}`}
          placeholder={label} 
          />
        {showPasswordToggle && (
          <span
            className={styles.passwordToggleIcon}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
