import React from 'react';
import styles from '../../styles/common.module.css';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, label, onClick, disabled, className }) => {
  const buttonClasses = `${styles.button} ${className ? className : ''}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses} 
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
