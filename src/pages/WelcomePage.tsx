import React, { useState, useEffect } from "react";
import styles from "../styles/WelcomePage.module.css";

const WelcomePage: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');

    if (firstName && lastName && email) {
      setUserData({
        firstName,
        lastName,
        email
      });
    }
  }, []);

  if (!userData.firstName || !userData.lastName || !userData.email) return null;

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.contentBox}>
        <h1 className={styles.title}>
          Welcome, {userData.firstName} {userData.lastName}!
        </h1>
        <p className={styles.subTitle}>We are thrilled to have you here.</p>
        <h2 className={styles.emailText}>
          Your Email: <span className={styles.email}>{userData.email}</span>
        </h2>
      </div>
    </div>
  );
};

export default WelcomePage;
