import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Input from "../Common/Input";
import Button from "../Common/Button";
import ErrorMessage from "../Common/ErrorMessage";
import { validateLogin } from "../../services/validations";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import loginImage from "../../assets/signin.png";
import styles from "../../styles/Login.module.css";
import Loader from "../Common/Loader";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      const { token, user } = response.data;
      login(token, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: formData.email,
      });

      navigate("/welcome");
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img src={loginImage} alt="Login Illustration" loading="lazy" />
          </div>
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>
              Let us know <span className={styles.exclamation}>!</span>
            </h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showPasswordToggle={true}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
              <Button
                type="submit"
                label="Sign In"
                className={styles.loginButton}
              />
            </form>
            <Link
              to="/register"
              className={`${styles.signUpButton} ${styles.button}`}
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
