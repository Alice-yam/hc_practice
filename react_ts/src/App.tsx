import { useState } from "react";
import { USER_LIST } from "./constants";
import { getAvailableMentorNames } from "./utils/userUtils";
import type { SortKey, SortOrder, UserFilterTab, User } from "./types";
import { UserTable } from "./components/UserTable";
import { UserTabs } from "./components/UserTabs";
import { UserForm } from "./components/UserForm";

export function App() {
  // USER_LISTをstateで管理(新規追加用)
  const [userList, setUserList] = useState<User[]>(USER_LIST);
  const displayUsers = getAvailableMentorNames(userList);

  // モーダル管理用state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 新規追加処理
  const handleAddUser = (newUser: User) => {
    setUserList([...userList, newUser]);
    setIsModalOpen(false); // 追加したら閉じる
  };

  // タブ切り替え用のstate
  const [activeTab, setActiveTab] = useState<UserFilterTab>("all");

  // activeTabの値によって絞り込む
  const filteredUsers = displayUsers.filter((user) => {
    if (activeTab === "student") return user.role === "student";
    if (activeTab === "mentor") return user.role === "mentor";
    return true; // "all"の場合は全て表示
  });

  // ソート
  const [sortKey, setSortKey] = useState<SortKey>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    // sortKeyが指定されてない時はそのまま
    if (!sortKey) return 0;

    // 生徒タブの時
    if (
      activeTab === "student" &&
      a.role === "student" &&
      b.role === "student"
    ) {
      if (sortKey === "studyMinutes") {
        // 勉強時間でソート
        return sortOrder === "asc"
          ? a.studyMinutes - b.studyMinutes // 昇順(asc)
          : b.studyMinutes - a.studyMinutes; // 降順(desc)
      }
      if (sortKey === "score") {
        // ハピネススコアでソート
        return sortOrder === "asc"
          ? a.score - b.score // 昇順(asc)
          : b.score - a.score; // 降順(desc)
      }
    }
    // メンタータブの時
    if (activeTab === "mentor" && a.role === "mentor" && b.role === "mentor") {
      if (sortKey === "experienceDays") {
        // 実務経験日数でソート
        return sortOrder === "asc"
          ? a.experienceDays - b.experienceDays // 昇順(asc)
          : b.experienceDays - a.experienceDays; // 降順(desc)
      }
    }

    return 0;
  });

  // 前の情報が残らないようにタブを切り替えたらソートをリセットする
  const handleTabChange = (tab: UserFilterTab) => {
    setActiveTab(tab);
    setSortKey("");
    setSortOrder("asc");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ユーザー一覧</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-4 rounded-lg transition-colors"
        >
          + ユーザー追加
        </button>
      </div>

      {/* UserTab */}
      <UserTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* sort */}
      {activeTab !== "all" && (
        <div className="flex justify-end items-center gap-3 mb-4 text-sm">
          <label className="font-medium text-gray-700">並び替え:</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="border border-gray-300 rounded px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">標準(ID順)</option>
            {activeTab === "student" && (
              <>
                <option value="studyMinutes">勉強時間</option>
                <option value="score">ハピネススコア</option>
              </>
            )}
            {activeTab === "mentor" && (
              <option value="experienceDays">実務経験月数</option>
            )}
          </select>

          {/* sortKeyが選ばれている時だけ昇順/降順ボタンを出す */}
          {sortKey && (
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="border border-gray-300 rounded px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors"
            >
              {sortOrder === "asc" ? "昇順 ▲" : "降順 ▼"}
            </button>
          )}
        </div>
      )}

      {/* UserTable */}
      <UserTable users={sortedUsers} activeTab={activeTab} />

      {/* Modal */}
      <UserForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
}

export default App;
