//-------------------------------------
// Socket.ioサーバへ接続
//-------------------------------------
const socket = io();

/**
 * [イベント] フォームが送信された
 */
document.querySelector("#frm-post").addEventListener("submit", (e) => {
  // 規定の送信処理をキャンセル(画面遷移しないなど)
  e.preventDefault();

  // 入力内容を取得する
  const msg = document.querySelector("#msg");
  if (msg.value === "") {
    return false;
  }
  const user_name = document.querySelector("#user_name");
  if (user_name.value === "") {
    user_name.value = 'user1';
  }

  // Socket.ioサーバへ送信
  socket.emit("post", { text: msg.value, name: user_name.value });

  // 発言フォームを空にする
  msg.value = "";
});

/**
 * [イベント] 誰かが発言した
 */
socket.on("room", (msg) => {
  const list = document.querySelector("#msglist");
  const li = document.createElement("li");
  li.innerHTML = `${msg.name}:${msg.text}`;
  list.insertBefore(li, list.firstChild);
});

/**
 * [イベント] ページの読込み完了
 */
window.addEventListener('load', () => {
  msg.focus();
})
