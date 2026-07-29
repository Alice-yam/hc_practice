import type {
  AvailableMentorNames,
  AvailableStudentNames,
  TabType,
} from "../types";

type UserTableProps = {
  users: (AvailableMentorNames | AvailableStudentNames)[];
  activeTab: TabType;
};

export const UserTable = ({ users, activeTab }: UserTableProps) => {
  const showStudentCols = activeTab === "all" || activeTab === "student";
  const showMentorCols = activeTab === "all" || activeTab === "mentor";
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {/* 共通 */}
            <th className="border p-2">名前</th>
            <th className="border p-2">ロール</th>
            <th className="border p-2">メールアドレス</th>
            <th className="border p-2">年齢</th>
            <th className="border p-2">郵便番号</th>
            <th className="border p-2">電話番号</th>
            <th className="border p-2">趣味</th>
            <th className="border p-2">URL</th>

            {/* 生徒用 */}
            {showStudentCols && (
              <>
                <th className="border p-2">勉強時間</th>
                <th className="border p-2">課題番号</th>
                <th className="border p-2">勉強中の言語</th>
                <th className="border p-2">ハピネススコア</th>
                <th className="border p-2">対応可能なメンター</th>
              </>
            )}

            {/* メンター用 */}
            {showMentorCols && (
              <>
                <th className="border p-2">実務経験月数</th>
                <th className="border p-2">現場で使っている言語</th>
                <th className="border p-2">担当できる課題番号初め</th>
                <th className="border p-2">担当できる課題番号終わり</th>
                <th className="border p-2">対応可能な生徒</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* 共通 */}
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.age}</td>
              <td className="border p-2">{user.postCode}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.hobbies.join(", ")}</td>
              <td className="border p-2">
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {user.url}
                </a>
              </td>

              {/* 生徒用 */}
              {showStudentCols &&
                (user.role === "student" ? (
                  <>
                    <td className="border p-2">{user.studyMinutes}分</td>
                    <td className="border p-2">{user.taskCode}</td>
                    <td className="border p-2">{user.studyLangs.join(", ")}</td>
                    <td className="border p-2">{user.score}</td>
                    <td className="border p-2">
                      {user.availableMentorNames.length > 0
                        ? user.availableMentorNames.join(", ")
                        : "なし"}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                  </>
                ))}

              {/* メンター用 */}
              {showMentorCols &&
                (user.role === "mentor" ? (
                  <>
                    <td className="border p-2">
                      {Math.floor(user.experienceDays / 30)}ヶ月
                    </td>
                    <td className="border p-2">{user.useLangs.join(", ")}</td>
                    <td className="border p-2">{user.availableStartCode}</td>
                    <td className="border p-2">{user.availableEndCode}</td>
                    <td className="border p-2">
                      {user.availableStudentNames.length > 0
                        ? user.availableStudentNames.join(", ")
                        : "なし"}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                    <td className="border p-2 text-center">-</td>
                  </>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
