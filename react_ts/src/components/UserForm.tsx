import { useState } from "react";
import type { Role, User } from "../types";

type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (newUser: User) => void;
};

export const UserForm = ({ isOpen, onClose, onAddUser }: UserFormProps) => {
  // 共通の State
  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [postCode, setPostCode] = useState("");
  const [phone, setPhone] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [url, setUrl] = useState("");

  // 生徒用のState
  const [studyMinutes, setStudyMinutes] = useState<number | "">("");
  const [taskCode, setTaskCode] = useState<number | "">("");
  const [studyLangs, setStudyLangs] = useState(""); // カンマ区切り
  const [score, setScore] = useState<number | "">("");

  // メンター用のState
  const [experienceMonths, setExperienceMonths] = useState<number | "">("");
  const [useLangs, setUseLangs] = useState("");
  const [availableStartCode, setAvailableStartCode] = useState<number | "">("");
  const [availableEndCode, setAvailableEndCode] = useState<number | "">("");

  if (!isOpen) return null;

  // 送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseUser = {
      id: Date.now(),
      name,
      email,
      age: Number(age) || 0,
      postCode,
      phone,
      hobbies: hobbies ? hobbies.split(",").map((s) => s.trim()) : [],
      url,
    };

    if (role === "student") {
      const newUser: User = {
        ...baseUser,
        role: "student",
        studyMinutes: Number(studyMinutes) || 0,
        taskCode: Number(taskCode) || 0,
        studyLangs: studyLangs
          ? studyLangs.split(",").map((s) => s.trim())
          : [],
        score: Number(score) || 0,
      };
      onAddUser(newUser);
    } else {
      const newUser: User = {
        ...baseUser,
        role: "mentor",
        experienceDays: (Number(experienceMonths) || 0) * 30, // 月数を日数に換算
        useLangs: useLangs ? useLangs.split(",").map((s) => s.trim()) : [],
        availableStartCode: Number(availableStartCode) || 0,
        availableEndCode: Number(availableEndCode) || 0,
      };
      onAddUser(newUser);
    }

    onClose(); // 送信後にモーダルを閉じる
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold mb-4">新規ユーザー追加</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ロール選択 */}
          <div>
            <label className="block text-sm font-medium mb-1">ロール</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                />
                生徒
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  value="mentor"
                  checked={role === "mentor"}
                  onChange={() => setRole("mentor")}
                />
                メンター
              </label>
            </div>
          </div>

          {/* 共通項目 */}
          <div>
            <label className="block text-sm font-medium mb-1">名前</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">年齢</label>
              <input
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full border rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">郵便番号</label>
              <input
                type="text"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                className="w-full border rounded px-3 py-1.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">電話番号</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">趣味</label>
            <input
              type="text"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          {/* 生徒専用の入力項目 */}
          {role === "student" && (
            <div className="border-t pt-3 space-y-3">
              <h3 className="font-semibold text-gray-700">生徒情報</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    勉強時間（分）
                  </label>
                  <input
                    type="number"
                    value={studyMinutes}
                    onChange={(e) =>
                      setStudyMinutes(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-full border rounded px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    課題番号
                  </label>
                  <input
                    type="number"
                    value={taskCode}
                    onChange={(e) =>
                      setTaskCode(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-full border rounded px-3 py-1.5"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  勉強中の言語
                </label>
                <input
                  type="text"
                  value={studyLangs}
                  onChange={(e) => setStudyLangs(e.target.value)}
                  className="w-full border rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  ハピネススコア
                </label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) =>
                    setScore(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full border rounded px-3 py-1.5"
                />
              </div>
            </div>
          )}

          {/* メンター専用の入力項目 */}
          {role === "mentor" && (
            <div className="border-t pt-3 space-y-3">
              <h3 className="font-semibold text-gray-700">メンター情報</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  実務経験
                </label>
                <input
                  type="number"
                  value={experienceMonths}
                  onChange={(e) =>
                    setExperienceMonths(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full border rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  使用言語
                </label>
                <input
                  type="text"
                  value={useLangs}
                  onChange={(e) => setUseLangs(e.target.value)}
                  className="w-full border rounded px-3 py-1.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    担当開始コード
                  </label>
                  <input
                    type="number"
                    value={availableStartCode}
                    onChange={(e) =>
                      setAvailableStartCode(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-full border rounded px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    担当終了コード
                  </label>
                  <input
                    type="number"
                    value={availableEndCode}
                    onChange={(e) =>
                      setAvailableEndCode(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-full border rounded px-3 py-1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ボタンエリア */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              追加する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
