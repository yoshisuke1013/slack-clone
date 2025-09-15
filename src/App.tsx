import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { authRepository } from "./modules/auth/auth.repository";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CreateWorkspace from "./pages/CreateWorkspace";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = useCurrentUserStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("ユーザーの取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading…</div>;

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<CreateWorkspace />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/:workspaceId/:channelId" element={<Home />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
