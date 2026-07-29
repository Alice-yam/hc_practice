// 生徒・メンターの対応可能な相手を取得する

import {
  type User,
  type Student,
  type Mentor,
  type AvailableMentorNames,
  type AvailableStudentNames,
} from "../types";

export const getAvailableMentorNames = (
  users: User[],
): (AvailableMentorNames | AvailableStudentNames)[] => {
  // 生徒とメンターを分ける
  const students = users.filter((u): u is Student => u.role === "student");
  const mentors = users.filter((u): u is Mentor => u.role === "mentor");

  return users.map((user): AvailableMentorNames | AvailableStudentNames => {
    // 生徒の場合、対応可能なメンター
    if (user.role === "student") {
      const matchedMentor = mentors.filter(
        (mentor) =>
          user.taskCode >= mentor.availableStartCode &&
          user.taskCode <= mentor.availableEndCode,
      );
      return {
        ...user,
        availableMentorNames: matchedMentor.map((m) => m.name),
      };
    } else {
      // メンターの場合、対応可能な生徒
      const matchedStudent = students.filter(
        (student) =>
          student.taskCode >= user.availableStartCode &&
          student.taskCode <= user.availableEndCode,
      );
      return {
        ...user,
        availableStudentNames: matchedStudent.map((s) => s.name),
      };
    }
  });
};
