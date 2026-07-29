// 共通
export type CommonUser = {
  id: number;
  name: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
};

// 生徒
export type Student = CommonUser & {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
};
// 生徒の対応可能なメンター名
export type AvailableMentorNames = Student & {
  availableMentorNames: string[];
};

// メンター
export type Mentor = CommonUser & {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
};
// メンターの対応可能な生徒名
export type AvailableStudentNames = Mentor & {
  availableStudentNames: string[];
};

export type User = Student | Mentor;

// タブ切り替え用
export type TabType = "all" | "student" | "mentor";

// ソート用
export type SortKey = "studyMinutes" | "score" | "experienceDays" | "";
export type SortOrder = "asc" | "desc";

export type Role = "student" | "mentor";
