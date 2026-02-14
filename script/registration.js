document.addEventListener("DOMContentLoaded", () => {
  // Check if user logged in
  fetch("./php/sessionData.php")
    .then(res => res.json())
    .then(data => {
      if (!data.loggedIn) {
        alert("Please log in to access registration.");
        window.location.href = "login.html";
      } else {
        console.log("Logged in as:", data.username);

        const form = document.getElementById("registrationForm");
        form.addEventListener("submit", (e) => {
          e.preventDefault();

          const formData = new FormData(form);
          formData.append("user_id", data.user_id); // add from session

          fetch("./php/registerPatient.php", {
            method: "POST",
            body: formData
          })
            .then(res => res.text())
            .then(msg => {
              alert(msg);
              form.reset();
            })
            .catch(err => console.error("Registration error:", err));
        });
      }
    })
    .catch(err => console.error("Session check error:", err));
});