const socket = io();

const url = new URL(window.location.href);
const params = url.searchParams;

const urlRoomId = parseInt(params.get('roomId'));
const urlName = params.get('name');

socket.on("connect", () => {
  socket.emit("join", { roomId: urlRoomId, name: urlName });
})

document.getElementById("frm-post").addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  if (msg.value === "") {
    return false;
  }
  
  socket.emit("post", { text: msg.value });

  msg.value = "";
});

socket.on("message", (msg) => {
  const list = document.getElementById("msglist");
  const li = document.createElement("li");
  li.innerHTML = `${msg.name}:${msg.text}`;
  list.insertBefore(li, list.firstChild);
});

window.addEventListener('load', () => {
  msg.focus();
})
