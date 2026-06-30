import { useState } from "react";
import "./App.css";
import { ChatList } from "./components/ChatList";
import { Message } from "./components/Message";
import { dummyChats } from "./data.js";

function App() {
  // 選択しているチャット。初期値は先頭スレッド(1)
  const [selectedChatId, setSelectedChatId] = useState("1");
  return (
    <>
      <div className="flex justify-between">
        <div className="w-1/3">
          <ChatList
            chat={dummyChats}
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
          />
        </div>
        <div className="w-2/3">
          <Message selectedChatId={selectedChatId} />
        </div>
      </div>
    </>
  );
}

export default App;
