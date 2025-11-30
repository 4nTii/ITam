import { LangMessages } from "../../lang/lang";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import UIButton from "../../components/uiElements/UIButton";
import UICheckbox from "../../components/uiElements/UICheckbox";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleChange_CheckBox = (event) => {
    event.target && setRememberMe(event.target.checked);
  };

  return (
    <div className="d-flex justify-content-center align-items-center login-container">
      <div className="p-4 shadow rounded login-box">
        <div className="loginHeader">
          <img
            src="/assets/images/itam_logo_uhd_svg.svg"
            alt={LangMessages.application.appName}
            className="login-logo"
          />
          <h3 className="text-center mb-4">{LangMessages.auth.login}</h3>
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
              placeholder={LangMessages.auth.enterPassword}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <UICheckbox
              id="RememberMe"
              checked={rememberMe}
              label={LangMessages.auth.rememberMe}
              value="rememberMe"
              onChange={handleChange_CheckBox}
            />
            <a
              className="btn-link p-0 text-decoration-none"
              onClick={() => navigate("/password-recovery")}
            >
              {LangMessages.auth.forgotPassword}
            </a>
          </div>
          <UIButton
            type="submit"
            className="btn-primary w-100"
            label={LangMessages.auth.login}
          />

          <p className="text-center mt-3">
            {LangMessages.auth.dontHaveAccount}{" "}
            <a
              className="btn-link p-0 text-decoration-none"
              onClick={() => navigate("/signup")}
            >
              {LangMessages.auth.signup}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
