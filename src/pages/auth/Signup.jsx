import React from "react";
import { LangMessages } from "../../lang/lang";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center login-container">
      <div className="p-4 shadow rounded login-box">
        <div className="loginHeader">
          <img
            src="/assets/images/itam_logo_uhd_svg.svg"
            alt={LangMessages.application.appName}
            className="login-logo"
          />
          <h3 className="text-center mb-4">{LangMessages.auth.signup}</h3>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              {LangMessages.auth.email}
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder={LangMessages.auth.enterEmail}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              {LangMessages.auth.password}
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder={LangMessages.auth.password}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="confirmPassword">
              {LangMessages.auth.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder={`Re-${LangMessages.auth.confirmPassword}`}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {LangMessages.auth.signup}
          </button>

          <p className="text-center mt-3">
            {LangMessages.auth.alreadyAccount}{" "}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate("/")}
            >
              {LangMessages.auth.login}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
