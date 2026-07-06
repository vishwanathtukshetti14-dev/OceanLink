import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

      alert(`Welcome ${result.user.displayName} 🚢`);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-card">
        <div className="login-logo">🚢</div>

        <h1>OceanLink</h1>

        <h2>Welcome Back</h2>

        <p>Login to access your shipping dashboard</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button className="login-button">
            Login
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          className="google-button"
          onClick={handleGoogleLogin}
        >
          🔵 Continue with Google
        </button>

        <Link className="back-home" to="/">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;