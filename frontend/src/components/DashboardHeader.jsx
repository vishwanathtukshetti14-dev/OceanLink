import { auth } from "../firebase";

function DashboardHeader() {
  const user = auth.currentUser;

  return (
    <div className="dashboard-header">

      <img
        src={
          user?.photoURL ||
          "https://ui-avatars.com/api/?name=OceanLink&background=0D8ABC&color=fff"
        }
        alt="Profile"
        className="profile-image"
      />

      <h1>🚢 OceanLink Dashboard</h1>

      <h2>
        Welcome, {user?.displayName || "Admin"} 👋
      </h2>

      <p>{user?.email}</p>

    </div>
  );
}

export default DashboardHeader;