import React from 'react';
import styles from '../../styles/common.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className={styles.errorMessage}>{message}</div>;
};

export default ErrorMessage;
