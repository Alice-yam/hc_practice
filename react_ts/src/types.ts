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
export type StudentWithAvailableMentors = Student & {
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
export type MentorWithAvailableStudents = Mentor & {
  availableStudentNames: string[];
};

export type User = Student | Mentor;

// タブ切り替え用
export type UserFilterTab = "all" | "student" | "mentor";

// ソート用
export type SortKey = "studyMinutes" | "score" | "experienceDays" | "";
export type SortOrder = "asc" | "desc";

export type Role = "student" | "mentor";

// 共通form
export type CommonFormType = {
  role: Role;
  name: string;
  email: string;
  age: number | "";
  postCode: string;
  phone: string;
  hobbies: string;
  url: string;
};
// 生徒用form
export type StudentFormType = {
  studyMinutes: number | "";
  taskCode: number | "";
  studyLangs: string;
  score: number | "";
};
// メンター用form
export type MentorFormType = {
  experienceMonths: number | "";
  useLangs: string;
  availableStartCode: number | "";
  availableEndCode: number | "";
};
