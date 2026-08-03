import type { TabType } from "../types";

type UserTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const UserTabs = ({ activeTab, onTabChange }: UserTabsProps) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        onClick={() => onTabChange("all")}
        className={`px-4 py-2 rounded ${
          activeTab === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        全員
      </button>
      <button
        onClick={() => onTabChange("student")}
        className={`px-4 py-2 rounded ${
          activeTab === "student"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        生徒のみ
      </button>
      <button
        onClick={() => onTabChange("mentor")}
        className={`px-4 py-2 rounded ${
          activeTab === "mentor"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        メンターのみ
      </button>
    </div>
  );
};
