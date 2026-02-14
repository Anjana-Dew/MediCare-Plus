document.addEventListener("DOMContentLoaded", () => {
  // Run only if the appointments section is visible
  const appointmentsSection = document.getElementById("appointments");
  if (appointmentsSection) {
    loadDoctorAppointments();
  }
});

async function loadDoctorAppointments() {
  try {
    const res = await fetch("php/doctorAppointments.php", { cache: "no-store" });
    const data = await res.json();

    const container = document.querySelector("#appointments .placeholder-box");
    container.innerHTML = ""; // Clear default placeholder

    if (data.error) {
      container.innerHTML = `<p class="error">${data.error}</p>`;
      return;
    }

    if (data.length === 0) {
      container.innerHTML = `<p>No appointments found.</p>`;
      return;
    }

    // Create appointment list
    data.forEach(app => {
    const card = document.createElement("div");
    card.classList.add("appointment-card");
    card.innerHTML = `
        <h3>${app.patient_name}</h3>
        <p><strong>Date:</strong> ${app.appointment_date}</p>
        <p><strong>Time:</strong> ${app.appointment_time}</p>
        <p><strong>Status:</strong> <span class="status">${app.status}</span></p>
        <p><strong>Email:</strong> ${app.patient_email}</p>
        ${app.status === "Completed" ? 
        '<button class="done-btn" disabled>✅ Completed</button>' : 
        `<button class="done-btn" onclick="markCompleted(${app.appointment_id}, this)">Mark as Completed</button>`}`;
  container.appendChild(card);
});


  } catch (err) {
    console.error("Error loading appointments:", err);
  }
}
async function markCompleted(appointmentId, button) {
  if (!confirm("Mark this appointment as completed?")) return;

  try {
    const res = await fetch("php/markAppointmentCompleted.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `appointment_id=${appointmentId}`
    });

    const data = await res.json();
    if (data.status === "success") {
      button.textContent = "✅ Completed";
      button.disabled = true;
      button.previousElementSibling.querySelector(".status").textContent = "Completed";
    } else {
      alert(data.message || "Failed to update status");
    }
  } catch (err) {
    console.error("Error updating appointment:", err);
  }
}

