import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import type { Workspace } from "../../modules/workspaces/workspace.entity";
import type { Channel } from "../../modules/channels/channel.entity";
import type { Message } from "../../modules/messages/message.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import { channelRepository } from "../../modules/channels/channel.repository";
import { messageRepository } from "../../modules/messages/message.repository";
import WorkspaceSelector from "./WorkspaceSelector";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "./Home.css";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const params = useParams();
  const { workspaceId, channelId } = params;
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id == workspaceId
  );
  const [channels, setChannels] = useState<Channel[]>([]);
  const selectedChannel = channels.find((channel) => channel.id == channelId);
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.error("ワークスペースの取得に失敗しました", error);
    }
  };

  const fetchChannels = async () => {
    try {
      const channels = await channelRepository.find(workspaceId!);
      setChannels(channels);
    } catch (error) {
      console.error("チャンネルの取得に失敗しました", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const messages = await messageRepository.find(workspaceId!, channelId!);
      setMessages(messages);
    } catch (error) {
      console.error("メッセージの取得に失敗しました", error);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [workspaceId]);

  useEffect(() => {
    fetchMessages();
  }, [channelId]);

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        selectedWorkspaceId={workspaceId}
      />
      {selectedWorkspace != null && selectedChannel != null ? (
        <>
          <Sidebar
            selectedWorkspace={selectedWorkspace}
            selectedChannelId={channelId!}
            channels={channels}
            setChannels={setChannels}
          />
          <MainContent
            selectedChannel={selectedChannel}
            channels={channels}
            setChannels={setChannels}
            selectedWorkspaceId={selectedWorkspace.id}
            messages={messages}
            setMessages={setMessages}
          />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
