import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/Navigation.module.css";

const Navigation = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.navItem}>
          Dashboard
        </Link>
      </div>
      <div className={styles.navRight}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
