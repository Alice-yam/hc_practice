import { useState } from "react";
import type { Role, User } from "../types";

type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (newUser: User) => void;
};

export const UserForm = ({ isOpen, onClose, onAddUser }: UserFormProps) => {
  // 共通の State
  // const [role, setRole] = useState<Role>("student");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [age, setAge] = useState<number | "">("");
  // const [postCode, setPostCode] = useState("");
  // const [phone, setPhone] = useState("");
  // const [hobbies, setHobbies] = useState("");
  // const [url, setUrl] = useState("");
  // ↓ 以上をまとめて管理するように修正
  const [commonForm, setCommonForm] = useState({
    role: "student" as Role,
    name: "",
    email: "",
    age: "" as number | "",
    postCode: "",
    phone: "",
    hobbies: "",
    url: "",
  });

  // 生徒用のState
  // const [studyMinutes, setStudyMinutes] = useState<number | "">("");
  // const [taskCode, setTaskCode] = useState<number | "">("");
  // const [studyLangs, setStudyLangs] = useState(""); // カンマ区切り
  // const [score, setScore] = useState<number | "">("");
  // ↓ 以上をまとめて管理するように修正
  const [studentForm, setStudentForm] = useState({
    studyMinutes: "" as number | "",
    taskCode: "" as number | "",
    studyLangs: "", // カンマ区切り
    score: "" as number | "",
  });

  // メンター用のState
  // const [experienceMonths, setExperienceMonths] = useState<number | "">("");
  // const [useLangs, setUseLangs] = useState("");
  // const [availableStartCode, setAvailableStartCode] = useState<number | "">("");
  // const [availableEndCode, setAvailableEndCode] = useState<number | "">("");
  // ↓ 以上をまとめて管理するように修正
  const [mentorForm, setMentorForm] = useState({
    experienceMonths: "" as number | "",
    useLangs: "",
    availableStartCode: "" as number | "",
    availableEndCode: "" as number | "",
  });

  if (!isOpen) return null;

  // 送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseUser = {
      id: Date.now(),
      name: commonForm.name,
      email: commonForm.email,
      age: Number(commonForm.age) || 0,
      postCode: commonForm.postCode,
      phone: commonForm.phone,
      hobbies: commonForm.hobbies
        ? commonForm.hobbies.split(",").map((s) => s.trim())
        : [],
      url: commonForm.url,
    };

    if (commonForm.role === "student") {
      const newUser: User = {
        ...baseUser,
        role: "student",
        studyMinutes: Number(studentForm.studyMinutes) || 0,
        taskCode: Number(studentForm.taskCode) || 0,
        studyLangs: studentForm.studyLangs
          ? studentForm.studyLangs.split(",").map((s) => s.trim())
          : [],
        score: Number(studentForm.score) || 0,
      };
      onAddUser(newUser);
    } else {
      const newUser: User = {
        ...baseUser,
        role: "mentor",
        experienceDays: (Number(mentorForm.experienceMonths) || 0) * 30, // 月数を日数に換算
        useLangs: mentorForm.useLangs
          ? mentorForm.useLangs.split(",").map((s) => s.trim())
          : [],
        availableStartCode: Number(mentorForm.availableStartCode) || 0,
        availableEndCode: Number(mentorForm.availableEndCode) || 0,
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
                  checked={commonForm.role === "student"}
                  onChange={() =>
                    setCommonForm((prev) => ({ ...prev, role: "student" }))
                  }
                />
                生徒
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  value="mentor"
                  checked={commonForm.role === "mentor"}
                  onChange={() =>
                    setCommonForm((prev) => ({ ...prev, role: "mentor" }))
                  }
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
              value={commonForm.name}
              onChange={(e) =>
                setCommonForm((prev) => ({ ...prev, name: e.target.value }))
              }
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
              value={commonForm.email}
              onChange={(e) =>
                setCommonForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">年齢</label>
              <input
                type="number"
                value={commonForm.age}
                onChange={(e) =>
                  setCommonForm((prev) => ({
                    ...prev,
                    age: e.target.value === "" ? "" : Number(e.target.value),
                  }))
                }
                className="w-full border rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">郵便番号</label>
              <input
                type="text"
                value={commonForm.postCode}
                onChange={(e) =>
                  setCommonForm((prev) => ({
                    ...prev,
                    postCode: e.target.value,
                  }))
                }
                className="w-full border rounded px-3 py-1.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">電話番号</label>
            <input
              type="text"
              value={commonForm.phone}
              onChange={(e) =>
                setCommonForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">趣味</label>
            <input
              type="text"
              value={commonForm.hobbies}
              onChange={(e) =>
                setCommonForm((prev) => ({ ...prev, hobbies: e.target.value }))
              }
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={commonForm.url}
              onChange={(e) =>
                setCommonForm((prev) => ({ ...prev, url: e.target.value }))
              }
              className="w-full border rounded px-3 py-1.5"
            />
          </div>

          {/* 生徒専用の入力項目 */}
          {commonForm.role === "student" && (
            <div className="border-t pt-3 space-y-3">
              <h3 className="font-semibold text-gray-700">生徒情報</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    勉強時間（分）
                  </label>
                  <input
                    type="number"
                    value={studentForm.studyMinutes}
                    onChange={(e) =>
                      setStudentForm((prev) => ({
                        ...prev,
                        studyMinutes:
                          e.target.value === "" ? "" : Number(e.target.value),
                      }))
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
                    value={studentForm.taskCode}
                    onChange={(e) =>
                      setStudentForm((prev) => ({
                        ...prev,
                        taskCode:
                          e.target.value === "" ? "" : Number(e.target.value),
                      }))
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
                  value={studentForm.studyLangs}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      studyLangs: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  ハピネススコア
                </label>
                <input
                  type="number"
                  value={studentForm.score}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      score:
                        e.target.value === "" ? "" : Number(e.target.value),
                    }))
                  }
                  className="w-full border rounded px-3 py-1.5"
                />
              </div>
            </div>
          )}

          {/* メンター専用の入力項目 */}
          {commonForm.role === "mentor" && (
            <div className="border-t pt-3 space-y-3">
              <h3 className="font-semibold text-gray-700">メンター情報</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  実務経験
                </label>
                <input
                  type="number"
                  value={mentorForm.experienceMonths}
                  onChange={(e) =>
                    setMentorForm((prev) => ({
                      ...prev,
                      experienceMonths:
                        e.target.value === "" ? "" : Number(e.target.value),
                    }))
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
                  value={mentorForm.useLangs}
                  onChange={(e) =>
                    setMentorForm((prev) => ({
                      ...prev,
                      useLangs: e.target.value,
                    }))
                  }
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
                    value={mentorForm.availableStartCode}
                    onChange={(e) =>
                      setMentorForm((prev) => ({
                        ...prev,
                        availableStartCode:
                          e.target.value === "" ? "" : Number(e.target.value),
                      }))
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
                    value={mentorForm.availableEndCode}
                    onChange={(e) =>
                      setMentorForm((prev) => ({
                        ...prev,
                        availableEndCode:
                          e.target.value === "" ? "" : Number(e.target.value),
                      }))
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
