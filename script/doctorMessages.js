document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus().then(() => {
    loadChatList().then(() => {
      const savedChat = localStorage.getItem("selectedChatUser");
      if (savedChat) {
        openChat(savedChat);
      }
    });
  });
});


let selectedChatUser = null;

async function checkLoginStatus() {
  try {
    const res = await fetch("./php/sessionData.php", { cache: "no-store" });
    const data = await res.json();

    if (!data.loggedIn || data.role !== "doctor") {
      alert("Access denied. Doctors only.");
      window.location.href = "homePage.html";
    }

    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("role", data.role);
  } catch (err) {
    console.error("Error checking session:", err);
    window.location.href = "homePage.html";
  }
}

async function loadChatList() {
  const doctor_id = localStorage.getItem("user_id");

  try {
    const res = await fetch(`php/message.php?action=getDoctorChats&doctor_id=${doctor_id}`);
    const data = await res.json();

    const list = document.getElementById("chatList");
    list.innerHTML = "";

    if (data.length === 0) {
      list.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    data.forEach(chat => {
      const div = document.createElement("div");
      div.classList.add("chat-item");
      div.textContent = `Anonymous #${chat.patient_id}`;
      div.onclick = () => openChat(chat.patient_id);
      list.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading chat list:", err);
  }
}

async function openChat(patient_id) {
    localStorage.setItem("selectedChatUser",patient_id);
  selectedChatUser = patient_id;
  const doctor_id = localStorage.getItem("user_id");

  const res = await fetch(`php/message.php?action=getConversation&doctor_id=${doctor_id}&patient_id=${patient_id}`);
  const data = await res.json();

  const chatBody = document.getElementById("chatBody");
  chatBody.innerHTML = "";

  data.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("msg", msg.sender_id === doctor_id ? "sent" : "received");
    div.textContent = msg.message_text;
    chatBody.appendChild(div);
  });

  chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendReply() {
  const doctor_id = localStorage.getItem("user_id");
  const message = document.getElementById("replyInput").value.trim();

  if (!selectedChatUser || message === "") return;

  await fetch("php/message.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `action=sendReply&doctor_id=${doctor_id}&patient_id=${selectedChatUser}&message_text=${encodeURIComponent(message)}`
  });

  document.getElementById("replyInput").value = "";
  openChat(selectedChatUser);
}
