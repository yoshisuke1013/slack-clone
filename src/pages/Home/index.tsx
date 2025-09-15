import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import WorkspaceSelector from "./WorkspaceSelector";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "./Home.css";

function Home() {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div className="slack-container">
      <WorkspaceSelector />
      <>
        <Sidebar />
        <MainContent />
      </>
    </div>
  );
}

export default Home;
