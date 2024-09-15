import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Input from "../Common/Input";
import Button from "../Common/Button";
import ErrorMessage from "../Common/ErrorMessage";
import styles from "../../styles/Auth.module.css";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Common/Loader";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/verify-otp", {
        email: location.state.email,
        otp,
      });
      const { token } = response.data;
      login(token, {
        firstName: location.state.firstName,
        lastName: location.state.lastName,
        email: location.state.email,
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
    <div className={styles.otpContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.formBox}>
            <h2 className={styles.title}>OTP Verification</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className={styles.otpForm}>
              <Input
                type="text"
                name="otp"
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                type="submit"
                label="Verify OTP"
                className={styles.verifyButton}
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default OTPVerification;
