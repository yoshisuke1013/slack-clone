import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import "../Signup/auth.css";

function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      console.log(newWorkspace);
    } catch (error) {
      console.error("ワークスペースの作成に失敗しました", error);
    }
  };

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div>
      <CreateWorkspaceModal onSubmit={createWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
