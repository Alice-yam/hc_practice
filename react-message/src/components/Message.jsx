import React, { useState } from "react";
import { dummyMessages } from "../data";
import { format } from "date-fns";

export const Message = (props) => {
  const [messages, setMessages] = useState(dummyMessages); // メッセージ全体
  const currentMessage = messages[props.selectedChatId]; // Listで選択されているユーザのID
  const [inputText, setInputText] = useState(""); // 入力したテキスト
  const [editingMessage, setEditingMessage] = useState(null); // どのメッセージを編集しているかの記憶。初期値はnull
  const [editText, setEditText] = useState(""); // 入力欄に打った文字を記憶

  // Enter、送信ボタンを押した時に使う、送信処理
  const sendNewMessage = () => {
    // 空文字、空白は送信不可
    if (inputText.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      sender: { id: "current" },
      content: inputText,
      timestamp: new Date(),
    };
    // newMessageをcurrentMessageの配列に追加(push)
    currentMessage.push(newMessage);
    // 入力欄を空にする
    setInputText("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white overflow-y-auto grow">
        {/* 選択されたユーザとのチャット一覧を表示させる */}
        {currentMessage.map((msg) => (
          <div
            key={msg.id}
            // 相手を左寄せ、自分を右寄せに
            className={`flex mb-4 ${
              // end: 右寄せ, start: 左寄せ
              msg.sender.id === "current" ? "justify-end" : "justify-start"
            }`}
          >
            {/* 相手側にはアイコンを表示 */}
            {/* currentでないときだけ(&&)の条件分岐 */}
            {msg.sender.id !== "current" && (
              <img
                src={msg.sender.avatar}
                alt={msg.sender.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
            )}

            {/* 吹き出し */}
            <div
              className={`flex flex-col ${msg.sender.id === "current" ? "items-end" : "items-start"}`}
            >
              <div
                // max-w-wsで自動で改行してくれるようになる
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender.id === "current"
                    ? "bg-blue-500 text-white rounded-tr-none" // 自分
                    : "bg-gray-100 text-gray-800 rounded-tl-none" //相手
                }`}
              >
                <p>{msg.content}</p>

                {/* 時間の表示 */}
                <p className="text-xs text-gray-400 text-right">
                  {format(msg.timestamp, "HH:mm")}
                </p>
              </div>

              {/* 削除ボタン */}
              {msg.sender.id === "current" && ( // 自分側にだけ表示
                <div className="flex gap-3 justify-end mt-1">
                  <button
                    className="text-xs text-red-600 mt-1 hover:underline text-right block"
                    onClick={() => {
                      if (window.confirm("本当に削除しますか？")) {
                        // 選択したメッセージ以外を残し、
                        const newMessages = currentMessage.filter(
                          (m) => m.id !== msg.id,
                        );
                        // それを新しい配列として上書き
                        setMessages({
                          ...messages,
                          [props.selectedChatId]: newMessages,
                        });
                      }
                    }}
                  >
                    削除
                  </button>

                  {/* 編集ボタン */}
                  <button
                    className="text-xs mt-1 hover:underline text-right block"
                    onClick={() => {
                      // Clickで二つを同時に起動させる
                      setEditingMessage(msg);
                      setEditText(msg.content);
                    }}
                  >
                    編集
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-2">
        {/* 入力欄 */}
        <textarea
          placeholder="メッセージを入力"
          value={inputText}
          className="grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          rows={1} // 初期の高さは1行分
          onKeyDown={(e) => {
            // Shift + Enterで改行、Enterのみで送信
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing // 変換中に送信されないようにする
            ) {
              // デフォルトのEnterで改行する動作をキャンセル
              e.preventDefault();
              // 送信処理
              sendNewMessage();
            }
          }}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* 送信ボタン */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-bold"
          onClick={(e) => sendNewMessage()}
        >
          送信
        </button>
      </div>

      {/* モーダルの表示 */}
      {/* 編集ボタンが押され、editingMessageにnull以外が入った時 */}
      {editingMessage && (
        <div className="fixed inset-0 flex bg-black/50 justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="p-4">メッセージを編集</h3>

            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              rows={3}
              value={editText} // 記憶している文章を予め表示
              onChange={(e) => setEditText(e.target.value)} // 書き換えられたら記憶を更新
            />

            <div className="flex justify-end gap-3 mt-4">
              {/* キャンセルボタン */}
              {/* nullに戻す */}
              <button
                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                onClick={() => setEditingMessage(null)}
              >
                キャンセル
              </button>

              {/* 保存ボタン */}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                onClick={() => {
                  const updateMessage = currentMessage.map((m) => {
                    if (m.id === editingMessage.id) {
                      // 中身を展開して、contentだけ上書きする
                      return {
                        ...m,
                        content: editText,
                      };
                    } else {
                      // 変更がなければそのまま返す
                      return m;
                    }
                  });
                  // 新しい配列として上書き
                  setMessages({
                    ...messages,
                    [props.selectedChatId]: updateMessage,
                  });
                  // 最後に編集中のデータをnullに戻しておく
                  setEditingMessage(null);
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
