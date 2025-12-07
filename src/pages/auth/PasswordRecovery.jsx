import { LangMessages } from "../../lang/lang";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import UIButton from "../../components/uiHTMLElements/UIButton";
import { useState } from "react";

function PasswordRecovery() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'envoi de l'email de récupération
    console.log("Recovery email sent to:", email);
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
          <h3 className="text-center mb-4">
            {LangMessages.auth.passwordRecovery}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              {LangMessages.auth.email}
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder={LangMessages.auth.enterEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <UIButton
            type="submit"
            className="btn-primary w-100"
            label={LangMessages.auth.sendRecoveryEmail}
          />

          <p className="text-center mt-3">
            {LangMessages.auth.passwordRemembered}{" "}
            <a
              className="btn-link p-0 text-decoration-none"
              onClick={() => navigate("/login")}
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
