import React from "react";
import { LangMessages } from "../../lang/lang";
import "./Login.css"; // réutilisation du CSS de login pour commencer
import { useNavigate } from "react-router-dom";

function PasswordRecovery() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center login-container">
      <div className="p-4 shadow rounded login-box">
        <div className="loginHeader">
          <img
            src="/assets/images/itam_logo_uhd_svg.svg"
            alt="ITam"
            className="login-logo"
          />
          <h3 className="text-center mb-4">Password Recovery</h3>
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

          <button type="submit" className="btn btn-success w-100">
            {LangMessages.auth.sendRecoveryEmail}
          </button>

          <p className="text-center mt-3">
            {LangMessages.auth.passwordRemembered}{" "}
            <a
              className="btn-link p-0 text-decoration-none"
              onClick={() => navigate("/")}
            >
              {LangMessages.auth.login}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecovery;
