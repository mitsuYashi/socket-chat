const socket = io();
const room = document.getElementById("room");
const user_name = document.getElementById("user_name");

document.getElementById("room-post").addEventListener("submit", (e) => {
  e.preventDefault();

  if (user_name.value === "") {
    user_name.value = "user1";
  }

  room.value === "" ? (room.value = 0000) : null;
  socket.emit("join", {
    roomId: Math.floor(room.value),
    name: user_name.value,
  });

  window.location.href = window.location + "chat?roomId=" + Math.floor(room.value) + "&name=" + user_name.value;
});
