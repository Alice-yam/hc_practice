"use strict";

const now = new Date();
let month;

if (process.argv.length === 2) {
  month = now.getMonth() + 1; // 0が1月のため+1する
} else if (process.argv.length === 4) {
  // オプションが適切に入力されているかチェック
  if (process.argv[2] !== "-m") {
    console.error("入力エラー");
    process.exit(1);
  }
  month = Number(process.argv[3]);
}
// 1 ~ 12以外を入力するとエラー
if (month < 1 || month > 12 || month === undefined) {
  console.error("入力エラー");
  process.exit(1);
}

// console.log(month);

// 上で得たmonthをまたJS上で使えるように-1して元に戻す
const firstDay = new Date(2026, month - 1, 1);
// 該当月の1日が何曜日か調べる(0が日曜日)
const weekDays = firstDay.getDay();
// ⚪︎月の0日とすると先月の最終日が何日かわかる(30 or 31 or 28 or 29)
const lastDay = new Date(2026, month, 0);

// カレンダーのレイアウト
console.log(`      ${month}月 2026      `);
console.log(`日 月 火 水 木 金 土`);

// 1日の曜日によって最初の空欄の数を調整
let calendarLine = "";
for (let i = 0; i < weekDays; i++) {
  calendarLine += "   "; // console.log()にすると改行される
}

// 1桁の日付は前後にスペース、2桁の日付は後ろにのみスペース

for (let date = 1; date <= lastDay.getDate(); date++) {
  // dateの文字列を2桁にして足りない分を" "で埋める
  let daySpace = String(date).padStart(2, " ");
  calendarLine += daySpace + " ";
  // if (date < 10) {
  //   // date = ` ${date}`;
  //   calendarLine += " " + date + " "; //から、足していって横に並ばせる
  // } else {
  //   calendarLine += date + " "; //こっちも同様に足す
  // }

  // 1週間ごとに改行させる
  if ((weekDays + date) % 7 === 0) {
    console.log(calendarLine);
    calendarLine = "";
  }
}

console.log(calendarLine);
