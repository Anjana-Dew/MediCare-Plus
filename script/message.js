let isLoggedIn = false;

    function checkLoginStatus() {
        const user_id = localStorage.getItem('user_id');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');

     if (!user_id || !username) {
        alert('Please log in to continue.');
        window.location.href = 'login.html';
        return;
    }

     if (role !== 'patient') {
        alert('Only patients can use this feature.');
        window.location.href = 'login.html';
        return;
    }

    isLoggedIn = true;
    }


    async function handleBack(event) {
  event?.preventDefault();

  try {
    const res = await fetch("./php/sessionData.php", { cache: "no-store" });
    const data = await res.json();

    if (data.loggedIn) {
      if (data.role === "doctor") {
        window.location.href = "doctorHome.html";
      } else if (data.role === "patient" || data.role === "user") {
        window.location.href = "userHome.html";
      } else {
        window.location.href = "homePage.html";
      }
    } else {
      window.location.href = "homePage.html";
    }
  } catch (err) {
    console.error("Error checking session:", err);
    window.location.href = "homePage.html";
  }
}

// Ensure only logged-in users can access this page
async function checkLoginStatus() {
  try {
    const res = await fetch("./php/sessionData.php", { cache: "no-store" });
    const data = await res.json();

    if (!data.loggedIn) {
      alert("Please log in to access the messaging feature.");
      window.location.href = "homePage.html";
      return;
    }

    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user_id", data.user_id);
  } catch (err) {
    console.error("Error checking session:", err);
    window.location.href = "homePage.html";
  }
}


    async function loadMessages() {
      const user = {
        user_id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role')
        };
      if (!user) return;

      const response = await fetch('./php/message.php?action=getMessages&user_id=' + user.user_id);
      const data = await response.json();

      const container = document.getElementById('messagesContainer');
      container.innerHTML = '';

      data.forEach(msg => {
        const div = document.createElement('div');
        div.classList.add('message', msg.sender_id === user.user_id ? 'sent' : 'received');
        div.textContent = msg.message_text;
        container.appendChild(div);
      });

      container.scrollTop = container.scrollHeight;
    }
   
   let isSending = false;

async function sendMessage() {
    if (isSending) return; 
    isSending = true;

    const user = {
        user_id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role')
    };

    const message = document.getElementById('messageInput').value.trim();
    if (message === '') {
        isSending = false;
        return;
    }

    try {
        await fetch('./php/message.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=sendMessage&user_id=${user.user_id}&message_text=${encodeURIComponent(message)}`
        });

        document.getElementById('messageInput').value = '';
        await loadMessages();
    } catch (err) {
        console.error("Error sending message:", err);
    }

    isSending = false;
}