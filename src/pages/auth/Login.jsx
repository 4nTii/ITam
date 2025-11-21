import { LangMessages } from "../../lang/lang";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
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
            <div>
              <input type="checkbox" id="remember" className="checkbox" />
              <label htmlFor="remember" className="ms-1">
                {LangMessages.auth.rememberMe}
              </label>
            </div>
            <a
              className="btn-link p-0 text-decoration-none"
              onClick={() => navigate("/password-recovery")}
            >
              {LangMessages.auth.forgotPassword}
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {LangMessages.auth.login}
          </button>

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
