window.addEventListener("scroll", function() {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 380) { 
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("./php/sessionData.php")
    .then((res) => res.json())
    .then((data) => {
      const loginTab = document.querySelector(".nav-tabs a:not([href])"); 
      if (data.loggedIn && loginTab) {
        loginTab.textContent = "Log Out";
        loginTab.href = "./php/logout.php"; 
      } else if (loginTab) {
        loginTab.textContent = "Login";
        loginTab.href = "login.html"; 
      }
    })
    .catch((err) => console.error("Error checking session:", err));
});