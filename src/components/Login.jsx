import React, { useState } from "react";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheck,
  FiX,
  FiGithub,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";

import lampImage from "../assets/lamp-scene.png";

import "./Login.css";

const Login = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailStatus, setEmailStatus] = useState("idle");
  const [passwordStatus, setPasswordStatus] = useState("idle");

  const [showPassword, setShowPassword] = useState(false);

  const [loginMessage, setLoginMessage] = useState("");

  // =====================================================
  // EMAIL VALIDATION
  // =====================================================

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(value.trim());
  };

  // =====================================================
  // PASSWORD VALIDATION
  //
  // Minimum 8 characters
  // 1 uppercase
  // 1 lowercase
  // 1 number
  // 1 special character
  // =====================================================

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(value);
  };

  // =====================================================
  // EMAIL CHANGE
  // =====================================================

  const handleEmailChange = (event) => {
    const value = event.target.value;

    setEmail(value);
    setLoginMessage("");

    if (value.trim() === "") {
      setEmailStatus("idle");
      return;
    }

    if (validateEmail(value)) {
      setEmailStatus("valid");
    } else {
      setEmailStatus("invalid");
    }
  };

  // =====================================================
  // PASSWORD CHANGE
  // =====================================================

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setPassword(value);
    setLoginMessage("");

    if (value.trim() === "") {
      setPasswordStatus("idle");
      return;
    }

    if (validatePassword(value)) {
      setPasswordStatus("valid");
    } else {
      setPasswordStatus("invalid");
    }
  };

  // =====================================================
  // LAMP STATE
  // =====================================================

  const getLampState = () => {
    // Nothing entered
    if (emailStatus === "idle" && passwordStatus === "idle") {
      return "off";
    }

    // Any field invalid
    if (emailStatus === "invalid" || passwordStatus === "invalid") {
      return "error";
    }

    // Both fields valid
    if (emailStatus === "valid" && passwordStatus === "valid") {
      return "success-both";
    }

    // One field valid
    if (emailStatus === "valid" || passwordStatus === "valid") {
      return "success";
    }

    return "off";
  };

  const lampState = getLampState();

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const getInputClass = (status) => {
    if (status === "valid") {
      return "login-input valid";
    }

    if (status === "invalid") {
      return "login-input invalid";
    }

    return "login-input";
  };

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);

    // Email
    if (!email.trim() || !emailIsValid) {
      setEmailStatus("invalid");
    } else {
      setEmailStatus("valid");
    }

    // Password
    if (!password.trim() || !passwordIsValid) {
      setPasswordStatus("invalid");
    } else {
      setPasswordStatus("valid");
    }

    // Invalid
    if (!emailIsValid || !passwordIsValid) {
      setLoginMessage("Please fix the highlighted fields.");

      return;
    }

    // Valid
    setLoginMessage("All details are valid. Ready to login.");

    // Backend API yahan baad mein connect kar sakte hain.
  };

  return (
    <main className="login-page">
      {/* =================================================
          LEFT SIDE - ONLY LAMP
      ================================================= */}

      <section
        className={`lamp-panel ${lampState}`}
        aria-label="Lamp validation indicator"
      >
        {/* Validation Glow */}

        <div className="lamp-glow"></div>

        {/* Lamp */}

        <div className="lamp-wrapper">
          <div className="lamp-shadow"></div>

          <img src={lampImage} alt="Lamp" className="lamp-image" />
        </div>
      </section>

      {/* =================================================
          RIGHT SIDE - LOGIN FORM
      ================================================= */}

      <section className="form-panel">
        <div className="login-card">
          {/* =================================================
              HEADER
          ================================================= */}

          <header className="login-header">
            <div className="security-badge">
              <FiShield />
            </div>

            <span className="header-eyebrow">WELCOME BACK</span>

            <h2>
              Sign in to
              <span> continue.</span>
            </h2>

            <p>Login to your account to continue your journey.</p>
          </header>

          {/* =================================================
              FORM
          ================================================= */}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="email">Email Address</label>

                {emailStatus === "valid" && (
                  <span className="label-valid">Verified</span>
                )}
              </div>

              <div className={getInputClass(emailStatus)}>
                <FiMail className="input-icon" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />

                {emailStatus === "valid" && (
                  <FiCheck className="input-status success" />
                )}

                {emailStatus === "invalid" && (
                  <FiX className="input-status error" />
                )}
              </div>

              {emailStatus === "invalid" && (
                <div className="validation-message error-message">
                  <FiX />

                  <span>Please enter a valid email address.</span>
                </div>
              )}

              {emailStatus === "valid" && (
                <div className="validation-message success-message">
                  <FiCheck />

                  <span>Email address looks good.</span>
                </div>
              )}
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>

                {passwordStatus === "valid" && (
                  <span className="label-valid">Strong</span>
                )}
              </div>

              <div className={getInputClass(passwordStatus)}>
                <FiLock className="input-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>

                {passwordStatus === "valid" && (
                  <FiCheck className="input-status success" />
                )}

                {passwordStatus === "invalid" && (
                  <FiX className="input-status error" />
                )}
              </div>

              {passwordStatus === "invalid" && (
                <div className="validation-message error-message">
                  <FiX />

                  <span>
                    8+ characters, uppercase, lowercase, number & special
                    character required.
                  </span>
                </div>
              )}

              {passwordStatus === "valid" && (
                <div className="validation-message success-message">
                  <FiCheck />

                  <span>Strong password.</span>
                </div>
              )}
            </div>

            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            <div className="forgot-row">
              <button type="button" className="forgot-button">
                Forgot Password?
              </button>
            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button type="submit" className="login-button">
              <span>Login</span>

              <FiArrowRight />
            </button>

            {/* =================================================
                LOGIN MESSAGE
            ================================================= */}

            {loginMessage && (
              <div
                className={`login-message ${
                  loginMessage.includes("valid")
                    ? "login-message-success"
                    : "login-message-error"
                }`}
              >
                {loginMessage}
              </div>
            )}

            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="divider">
              <span></span>

              <p>or continue with</p>

              <span></span>
            </div>

            {/* =================================================
                SOCIAL LOGIN
            ================================================= */}

            <div className="social-login">
              <button type="button" className="social-button">
                <FcGoogle />

                <span>Google</span>
              </button>

              <button type="button" className="social-button">
                <FiGithub />

                <span>GitHub</span>
              </button>
            </div>

            {/* =================================================
                SIGN UP
            ================================================= */}

            <div className="signup-row">
              <span>Don't have an account?</span>

              <button type="button">Sign up</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
