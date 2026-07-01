import React from "react";
import { format } from "date-fns";

export const ChatList = (props) => {
  return (
    <div>
      {props.chat.map((user) => (
        <div
          key={user.id}
          // クリック時に選択されたidを記憶
          onClick={() => props.setSelectedChatId(user.id)}
          className={`flex gap-3 items-center cursor-pointer p-3 mb-2
          ${
            props.selectedChatId === user.id
              ? "bg-blue-50 border-l-4 border-blue-500" // 選択時は背景色と左に青い線
              : "hover:bg-gray-100" // それ以外はホバーの状態変化のみ
          }`}
        >
          <img
            src={user.participants[0].avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <p className="font-bold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-400 text-right">
                {format(user.lastMessage.timestamp, "HH:mm")}
              </p>
            </div>
            {/* truncateで入りきらない分を...で省略する */}
            <p className="text-sm text-gray-600 truncate">
              {user.lastMessage.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
