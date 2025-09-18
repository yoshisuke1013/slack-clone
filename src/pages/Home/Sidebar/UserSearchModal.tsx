import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useUiStore } from "../../../modules/ui/ui.state";
import type { User } from "../../../modules/users/user.entity";
import { userRepository } from "../../../modules/users/user.repository";

function UserSearchModal() {
  const { setShowUserSearchModal } = useUiStore();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchUsers = async () => {
    if (keyword.trim() == "") {
      setSearchResults([]);
      return;
    }
    try {
      setIsLoading(true);
      const users = await userRepository.find(keyword);
      setSearchResults(users);
    } catch (error) {
      console.error("ユーザーの検索中にエラーが発生しました", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback(searchUsers, 500);

  useEffect(() => {
    debouncedSearch();
  }, [keyword]);

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowUserSearchModal(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>メンバーを招待する</h2>
          <button
            className="close-button"
            onClick={() => setShowUserSearchModal(false)}
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="invite-form">
            <label htmlFor="invite-input">招待するメンバー：</label>
            <div className="selected-users-container">
              <div key={1} className="selected-user-chip">
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt={"test"}
                  className="user-avatar small"
                />
                <span>{"test"}</span>
                <button className="remove-user-button">×</button>
              </div>
              <input
                type="text"
                id="invite-input"
                className="invite-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <div className="user-suggestions">
            {isLoading ? (
              <div className="loading-indicator">検索中…</div>
            ) : (
              searchResults.map((user) => (
                <div key={user.id} className={`user-suggestion-item`}>
                  <img
                    src={user.IconUrl}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="modal-footer">
            <button className="invite-button">招待する</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSearchModal;
