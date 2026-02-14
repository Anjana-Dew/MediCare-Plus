document.addEventListener("DOMContentLoaded", () => {
  fetch("./php/sessionData.php")
    .then((res) => res.json())
    .then((data) => {
      const logoLinks = document.querySelectorAll(".logo-container"); // find all logos
      const usernameElement = document.getElementById("username-display");
      const doctorNameElement = document.getElementById("doctor-name");

      if (data.loggedIn) {
        console.log("Logged in as:", data.username);

        // Change all logo links to userHome.php
        logoLinks.forEach((link) => {
          if (data.role === "doctor") link.href = "doctorHome.html";
          else link.href = "userHome.html";
        });

        // Show username (for userHome)
        if (usernameElement) {
          usernameElement.textContent = data.username;
        }

        // Show doctor name (for doctorHome)
        if (doctorNameElement) {
          doctorNameElement.textContent = `Dr. ${data.username}`;
        }

        // Save user data globally
        localStorage.setItem("username", data.username);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("role", data.role);
      } else {
        console.log("Not logged in");

        // Redirect logo to homepage.html
         logoLinks.forEach((link) => (link.href = "homepage.html"));
        localStorage.clear();

      }
    })
    .catch((err) => console.error("Error checking session:", err));
});