//-------------------------------------
// Socket.ioサーバへ接続
//-------------------------------------
const socket = io();

const url = new URL(window.location.href);
const params = url.searchParams;

const urlRoomId = params.get('roomId');
const urlName = params.get('name');

socket.on("connect", () => {
  socket.emit("join", { roomId: Math.floor(urlRoomId), name: urlName });
})

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
  
  // Socket.ioサーバへ送信
  socket.emit("post", { text: msg.value, roomId: 1234, name: 'user1' });

  // 発言フォームを空にする
  msg.value = "";
});

/**
 * [イベント] 誰かが発言した
 */
socket.on("message", (msg) => {
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
