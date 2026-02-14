document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("dashboard")) {
    loadDoctorDashboard();
  }
});

async function loadDoctorDashboard() {
  try {
    const res = await fetch("php/getDoctorDashboardData.php");
    const data = await res.json();

    if (data.status !== "success") {
      console.warn(data.message || "Error loading dashboard data");
      return;
    }

    // Update stats
    document.getElementById("appointments-today").textContent = data.appointments_today;
    document.getElementById("total-patients").textContent = data.total_patients;
    document.getElementById("new-feedback").textContent = data.new_feedback;

    // Update today's appointments
    const appointmentList = document.querySelector(".appointment-list");
    appointmentList.innerHTML = "";
    if (data.todays_appointments.length === 0) {
      appointmentList.innerHTML = "<li>No appointments today.</li>";
    } else {
      data.todays_appointments.forEach(a => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${a.appointment_time}</strong> — ${a.full_name}`;
        appointmentList.appendChild(li);
      });
    }

    // Update recent feedback
    const feedbackContainer = document.querySelector(".feedback-preview");
    feedbackContainer.innerHTML = "";
    if (data.recent_feedback.length === 0) {
      feedbackContainer.innerHTML = "<p>No recent feedback.</p>";
    } else {
      data.recent_feedback.forEach(fb => {
        const fbDiv = document.createElement("div");
        fbDiv.classList.add("feedback-item");
        fbDiv.innerHTML = `
          <p>"${fb.comment}"</p>
          <span>- ${fb.full_name}, ⭐ ${fb.rating}/5</span>
        `;
        feedbackContainer.appendChild(fbDiv);
      });
    }

  } catch (err) {
    console.error("Error loading dashboard:", err);
  }
}
