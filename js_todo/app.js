"use strict";

// id要素をjsですぐ使えるように定数で管理
const saveBtn = document.getElementById("save-btn"); // 保存ボタン
const inputList = document.getElementById("input-list"); // 入力欄
const addList = document.getElementById("add-list"); // タスクリスト
const totalCount = document.getElementById("total"); // 全てのタスク
const completedTask = document.getElementById("completed"); // 完了タスク
const activeTask = document.getElementById("active"); // 未完了タスク

// タスク数チェック
const countCheck = () => {
  // addListの子要素であるliの数を数え、
  // totalCountの中身を.textContentで書き換える
  totalCount.textContent = addList.children.length; // 全てのタスク数
  // チェックが入ってる数をカウント
  const checkedNum = addList.querySelectorAll(".check-box:checked").length;
  // カウントした数をcompletedTaskにいれる
  completedTask.textContent = checkedNum;
  // 未完了タスク = 全てのタスク - 完了タスク
  activeTask.textContent = addList.children.length - checkedNum;
};

// 保存ボタンをクリック //
saveBtn.addEventListener("click", () => {
  // createElenemnt():指定したタグのHTML要素を生成
  const li = document.createElement("li");

  li.classList.add("task-item"); // liにクラス名を追加
  // 追加したliの中身をHTML要素を使って変更(まだJS側のみの変更)
  li.innerHTML = `
    <span class="task-left">
      <input type="checkbox" class="check-box"/>
      <span class="task-text">${inputList.value}</span>
    </span>
    <span class="task-right">
      <button class="edit-btn">編集</button>
      <button class="delete-btn">削除</button>
    </span>
  `;

  // delete-btnはliが出てこないと現れないから最初に見つけられない
  // .querySelectorで一致する要素を探す
  // → つまり、liの中からdelete-btnを探し出す
  const deleteBtn = li.querySelector(".delete-btn"); // 削除ボタン
  // 削除ボタンをクリック //
  deleteBtn.addEventListener("click", () => {
    // window.confirmで画面にポップアップを表示(window. は省略可)
    const result = window.confirm("本当に削除してもよろしいですか？");
    if (result) {
      // liを削除(remove)
      li.remove();
      countCheck();
    } else {
      return;
    }
  });

  const editBtn = li.querySelector(".edit-btn"); // 編集ボタン
  const taskText = li.querySelector(".task-text"); // 入力欄
  // 編集ボタンをクリック //
  editBtn.addEventListener("click", () => {
    // edit.Btnが"編集"の時 ≒ 編集ボタンを押すとき
    if (editBtn.textContent === "編集") {
      // 現在の入力値をcurrentTextとして覚えておく
      const currentText = taskText.textContent;
      // ただの文字列だったtaskTextをinputタグでフォームに切り替える
      // この際、初期値としてcurrentTextをいれておく
      taskText.innerHTML = `<input type="text" class="edit-input" value="${currentText}" />`;
      // ボタン表記を"保存" に変える
      editBtn.textContent = "保存";
    } else {
      // → editBtnが編集表記じゃない時 = クリックして上記の操作を行ったとき

      // taskTextの中にさっきつくった edit-inputを取り出す
      const editInput = taskText.querySelector(".edit-input");
      // 編集後のtaskTextを.textContentでただの文字列に変換
      taskText.textContent = editInput.value;
      // ボタン表記を編集にもどす
      editBtn.textContent = "編集";
    }
  });

  const checkBox = li.querySelector(".check-box"); // チェックボックス
  // チェックボックスの状態が変化(change) ☑︎ or ◻︎ //
  checkBox.addEventListener("change", () => {
    // console.log(checkBox.checked);　→ checked状態でtrue
    countCheck();
  });

  // appendChild → addList(html.ul)の子要素としてHTML内(画面上)にliを追加
  addList.appendChild(li);
  // リスト追加後に入力欄を空欄にする
  inputList.value = "";

  countCheck();
});
