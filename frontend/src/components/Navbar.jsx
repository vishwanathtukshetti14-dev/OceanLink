import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    }
  };

  return (
    <nav className="navbar">
      <h1
        className="logo"
        onClick={() => scrollToSection("home")}
        style={{ cursor: "pointer" }}
      >
        🚢 OceanLink
      </h1>

      <ul className="nav-links">
        <li onClick={() => scrollToSection("home")}>Home</li>

        <li onClick={() => scrollToSection("services")}>Services</li>

        <li onClick={() => scrollToSection("about")}>About</li>

        <li onClick={() => scrollToSection("contact")}>Contact</li>

        <li
          onClick={() => navigate("/login")}
          className="login-btn"
        >
          Login
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;