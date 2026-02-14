document.addEventListener("DOMContentLoaded", async () => {
    // Fetch doctors list
    const res = await fetch("php/getDoctorsList.php");
    const data = await res.json();
    const doctorSelect = document.getElementById("doctor");

    if (data.status === "success") {
      data.doctors.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.doctor_id;
        opt.textContent = `${doc.full_name} (${doc.specialization})`;
        doctorSelect.appendChild(opt);
      });
    }

    // Handle form submit
    document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const res = await fetch("php/submitFeedback.php", {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      const msg = document.getElementById("msg");
      msg.textContent = result.message;
      msg.style.color = result.status === "success" ? "green" : "red";

      if (result.status === "success") e.target.reset();
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Wait a bit to ensure session.js finished fetching session data
    setTimeout(() => {
      const role = localStorage.getItem("role");
      const backBtn = document.getElementById("backBtn");

      if (role === "patient" || role === "doctor") {
        backBtn.onclick = () => window.location.href = "userHome.html";
      } else {
        backBtn.onclick = () => window.location.href = "homepage.html";
      }
    }, 300); // small delay to allow session.js fetch to complete
  });

