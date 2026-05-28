"use strict";

// id要素をjsですぐ使えるように定数で管理
const saveBtn = document.getElementById("save-btn"); // 保存ボタン
const inputList = document.getElementById("task-input"); // 入力欄
const addList = document.getElementById("add-list"); // タスクリスト
const totalCount = document.getElementById("total"); // 全てのタスク
const completedCount = document.getElementById("completed"); // 完了タスク
const activeCount = document.getElementById("active"); // 未完了タスク

// タスク数チェック
const updateCount = () => {
  // addListの子要素であるliの数を数え、
  // totalCountの中身を.textContentで書き換える
  totalCount.textContent = addList.children.length; // 全てのタスク数
  // チェックが入ってる数をカウント
  const checkedNum = addList.querySelectorAll(".check-box:checked").length;
  // カウントした数をcompletedTaskにいれる
  completedCount.textContent = checkedNum;
  // 未完了タスク = 全てのタスク - 完了タスク
  activeCount.textContent = addList.children.length - checkedNum;
};

// 保存ボタンをクリック //
saveBtn.addEventListener("click", () => {
  // 空文字が保存されないようにする
  if (inputList.value === "") return;
  // createElenemnt():指定したタグのHTML要素を生成
  const li = document.createElement("li");

  li.classList.add("task-item"); // liにクラス名を追加

  // // 追加したliの中身をHTML要素を使って変更(まだJS側のみの変更)
  // li.textContent = `
  //   <span class="task-left">
  //     <input type="checkbox" class="check-box"/>
  //     <span class="task-text">${inputList.value}</span>
  //   </span>
  //   <span class="task-right">
  //     <button class="edit-btn">編集</button>
  //     <button class="delete-btn">削除</button>
  //   </span>
  // `;

  // innerHTMLはscriptタグを入力されるXSSのリスクがあるため、textContentで入力値を入れる
  // 外側のspanタグ(left)
  const spanLeft = document.createElement("span");
  spanLeft.classList.add("task-left");
  // spanタグを挿入
  const span = document.createElement("span");
  span.textContent = inputList.value;
  span.classList.add("task-text");
  // inputタグを挿入
  const input = document.createElement("input");
  input.classList.add("check-box");
  input.setAttribute("type", "checkBox");
  // spanLeftの子要素としてinputとspanを追加
  spanLeft.appendChild(input);
  spanLeft.appendChild(span);

  // spanタグ(right)
  const spanRight = document.createElement("span");
  spanRight.classList.add("task-right");
  // buttonタグ(edit)
  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("edit-btn");
  buttonEdit.textContent = `編集`;
  // buttonタグ(delete)
  const buutonDelete = document.createElement("button");
  buutonDelete.classList.add("delete-btn");
  buutonDelete.textContent = `削除`;
  // spanRightの子要素としてbuttonを追加
  spanRight.appendChild(buttonEdit);
  spanRight.appendChild(buutonDelete);
  // liの子要素としてspanLeftとspanRightを追加
  li.appendChild(spanLeft);
  li.appendChild(spanRight);

  // delete-btnはliが出てこないと現れないから最初に見つけられない
  // .querySelectorで一致する要素を探す
  // → つまり、liの中からdelete-btnを探し出す
  const deleteBtn = li.querySelector(".delete-btn"); // 削除ボタン
  // 削除ボタンをクリック //
  deleteBtn.addEventListener("click", () => {
    // window.confirmで画面にポップアップを表示(window. は省略可)
    const result = window.confirm("本当に削除してもよろしいですか？");

    // if (result) {
    //   // liを削除(remove)
    //   li.remove();
    //   updateCount();
    // } else {
    //   return;
    // }
    // 以下のようにすると簡潔に書ける
    if (!result) return;
    li.remove();
    updateCount();
  });

  const editBtn = li.querySelector(".edit-btn"); // 編集ボタン
  const taskText = li.querySelector(".task-text"); // 入力欄
  // 編集ボタンをクリック //
  let isEditing = false; // falseの時、編集中ではない
  editBtn.addEventListener("click", () => {
    if (!isEditing) {
      isEditing = true; // trueにして、編集モードに切り替える
      // 現在の入力値をcurrentTextとして覚えておく
      const currentText = taskText.textContent;

      // ただの文字列だったtaskTextをinputタグでフォームに切り替える
      const inputEdit = document.createElement("input");
      inputEdit.classList.add("edit-input");
      inputEdit.setAttribute("type", "text");
      // 初期値としてcurrentTextをいれておく
      inputEdit.value = currentText;
      taskText.textContent = "";
      taskText.appendChild(inputEdit);

      // ボタン表記を"保存" に変える
      editBtn.textContent = "保存";
    } else {
      isEditing = false;
      const editInput = taskText.querySelector(".edit-input");
      taskText.textContent = editInput.value;
      editBtn.textContent = "編集";
    }
  });
  // 以下の処理のようにボタンのテキストを状態の判定に使うとボタンの表記を変えた時にバグが発生してしまうため、上記のように変数で状態を管理するのが良い

  // // edit.Btnが"編集"の時 ≒ 編集ボタンを押すとき
  // if (editBtn.textContent === "編集") {
  //   // 現在の入力値をcurrentTextとして覚えておく
  //   const currentText = taskText.textContent;

  //   // ただの文字列だったtaskTextをinputタグでフォームに切り替える
  //   // // この際、初期値としてcurrentTextをいれておく
  //   // taskText.innerHTML = `<input type="text" class="edit-input" value="${currentText}" />`;
  //   // innerHTMLをtextContentに切り替える
  //   const inputEdit = document.createElement("input");
  //   inputEdit.classList.add("edit-input");
  //   inputEdit.setAttribute("type", "text");
  //   inputEdit.value = currentText;
  //   taskText.textContent = "";
  //   taskText.appendChild(inputEdit);

  //   // ボタン表記を"保存" に変える
  //   editBtn.textContent = "保存";
  // } else {
  //   // → editBtnが編集表記じゃない時 = クリックして上記の操作を行ったとき

  //   // taskTextの中にさっきつくった edit-inputを取り出す
  //   const editInput = taskText.querySelector(".edit-input");
  //   // 編集後のtaskTextを.textContentでただの文字列に変換
  //   taskText.textContent = editInput.value;
  //   // ボタン表記を編集にもどす
  //   editBtn.textContent = "編集";
  // }

  const checkBox = li.querySelector(".check-box"); // チェックボックス
  // チェックボックスの状態が変化(change) ☑︎ or ◻︎ //
  checkBox.addEventListener("change", () => {
    // console.log(checkBox.checked);　→ checked状態でtrue
    updateCount();
  });

  // appendChild → addList(html.ul)の子要素としてHTML内(画面上)にliを追加
  addList.appendChild(li);
  // リスト追加後に入力欄を空欄にする
  inputList.value = "";

  updateCount();
});
