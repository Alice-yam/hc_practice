// ReactライブラリからuseStateフックをimport
import { useState } from "react";

const App = () => {
  // todosはこれからタスクを初期値のからの配列[]に追加していく
  const [todos, setTodos] = useState([]);
  // 文字列を入れる場所なので初期値は空文字""
  const [inputText, setInputText] = useState("");

  // -- 追加 -- //
  const addTodo = () => {
    if (inputText === "") return; // 入力欄が空の時は何もしない
    // idとして重複しないDate関数を使用、isDoneは初期値falseでタスク未完了を表す
    const addTask = { id: Date.now(), text: inputText, isDone: false };
    setTodos([...todos, addTask]);

    // 入力欄を空にする
    setInputText("");
  };

  // -- タスク一覧 -- //
  // それぞれのタスクの数を .lengthで取得
  const totalCount = todos.length; // 全て
  const completedCount = todos.filter((todo) => todo.isDone).length; // 完了済み
  const activeCount = todos.filter((todo) => !todo.isDone).length; // 未完了

  // -- チェックボックス -- //
  // isDoneの真偽を入れ替える
  const toggleTodo = (id) => {
    const toggleTask = todos.map((todo) => {
      // 押されたチェックボックスのisDoneの真偽を反転する
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      // 何も押されてないものはそのまま返す
      return todo;
    });
    // 新しい配列として作り直す
    setTodos(toggleTask);
  };

  // -- 削除 -- //
  const deleteTodo = (id) => {
    // いいえならそのままreturn
    if (!window.confirm("本当に削除してもよろしいですか？")) return;
    // 削除ボタンが押されていないものだけを残す
    const deleteTask = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTask);
  };

  // -- 編集 -- //
  // 編集対象のタスクのidを入れておく箱(最初は何もしてないのでnull)
  const [editId, setEditId] = useState(null);
  // 編集中の文字を入れておく箱
  const [editText, setEditText] = useState("");

  const editTodo = () => {
    const editTask = todos.map((todo) => {
      if (todo.id === editId) {
        // ④編集したeditText の内容をeditTaskに返す
        return { ...todo, text: editText };
      }
      // 編集されなければそのまま返す
      return todo;
    });
    // 新しい配列として登録する
    setTodos(editTask);
    // 最後にidにnullを入れることで保存ボタンに戻す
    setEditId(null);
  };

  return (
    <>
      <h1>ToDo List</h1>
      <p>全てのタスク: {totalCount}</p>
      <p>完了済み: {completedCount}</p>
      <p>未完了: {activeCount}</p>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={addTodo}>保存</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => toggleTodo(todo.id)}
            />
            {/* ②編集ボタンが押された時にidが変わり、再レンダリングが起こる */}
            {/* そして、editIdが一致することで、inputで編集モードに */}
            {editId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              // ⑤editTodoでnullが代入されたためspanに戻る
              <span>{todo.text}</span>
            )}

            <button
              onClick={() => {
                // ③保存ボタンが押され、idが一致することで、editTodo()を実行
                if (editId === todo.id) {
                  editTodo();
                } else {
                  // ①idが不一致 → 初期値のnullの時(編集ボタンが押された)
                  // Clickされた箇所の配列todoのtextをeditTextに保存
                  setEditText(todo.text);
                  // ↑ 同様にClickされた箇所のidをeditIdに保存
                  setEditId(todo.id);
                }
              }}
            >
              {/* editIdの初期値はnullであるため通常は"編集"が表示される */}
              {/* idが一致 = 編集ボタンが押された時、保存ボタンに変わる */}
              {editId === todo.id ? "保存" : "編集"}
            </button>

            {/* editId !== todo.idがtrueの時、削除ボタンを表示 */}
            {/* つまり、idの不一致の時 = 編集中でないときに削除ボタンを表示 */}
            {/* 編集中は削除ボタンを表示しない */}
            {editId !== todo.id && (
              <button onClick={() => deleteTodo(todo.id)}>削除</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
