import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/api";
import { validateSignUp } from "../../services/validations";
import Input from "../Common/Input";
import Button from "../Common/Button";
import ErrorMessage from "../Common/ErrorMessage";
import styles from "../../styles/Signup.module.css";
import { Link } from "react-router-dom";
import signupImage from "../../assets/file.png";
import Loader from "../Common/Loader";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterPassword: "",
    contact: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateSignUp(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (formData.password !== formData.reEnterPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signUp(formData);
      navigate("/otp-verification", {
        state: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.signupImageContainer}>
            <img src={signupImage} alt="Signup Illustration" loading="lazy" />
          </div>
          <div className={styles.formSection}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                Let us know <span className={styles.exclamation}>!</span>
              </h2>
              <Link to="/login" className={styles.signInLink}>
                Sign <span>In</span>
              </Link>
            </div>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className={styles.signupForm}>
              <Input
                type="text"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <Input
                type="text"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
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
                label="Set Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showPasswordToggle={true}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="reEnterPassword"
                label="Retype Password"
                value={formData.reEnterPassword}
                onChange={handleChange}
                error={errors.reEnterPassword}
                showPasswordToggle={true}
                togglePasswordVisibility={toggleConfirmPasswordVisibility}
                showPassword={showConfirmPassword}
              />
              <Input
                type="text"
                name="contact"
                label="Contact"
                value={formData.contact}
                onChange={handleChange}
                error={errors.contact}
              />
              <Button
                type="submit"
                label="Sign Up"
                className={styles.signupButton}
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
