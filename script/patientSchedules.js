document.addEventListener("DOMContentLoaded", () => {
  checkSessionAndLoadAppointments();

  // Back to homepage button (optional)
  const backHome = document.getElementById("backHome");
  if (backHome) {
    backHome.addEventListener("click", () => {
      window.location.href = "userHome.html";
    });
  }
});

async function checkSessionAndLoadAppointments() {
  try {
    // Check session
    const sessionRes = await fetch("./php/sessionData.php");
    const sessionData = await sessionRes.json();

    if (!sessionData.loggedIn) {
      alert("Please log in to view your appointments.");
      window.location.href = "login.html";
      return;
    }

    if (sessionData.role !== "patient") {
      alert("Only patients can access this page.");
      window.location.href = "login.html";
      return;
    }

    // Load appointments
    await loadAppointments();

  } catch (err) {
    console.error("Session check failed:", err);
  }
}

async function loadAppointments() {
  try {
    const res = await fetch("php/getPatientSchedules.php");
    const data = await res.json();

    const upcomingContainer = document.getElementById("upcoming-container");
    const pastContainer = document.getElementById("past-container");

    upcomingContainer.innerHTML = "";
    pastContainer.innerHTML = "";

    if (!data.success) {
      upcomingContainer.innerHTML = pastContainer.innerHTML =
        `<p>${data.message}</p>`;
      return;
    }

    const now = new Date();

    data.appointments.forEach(app => {
      const appDate = new Date(`${app.appointment_date}T${app.appointment_time}`);

      // 🚫 Skip cancelled appointments completely
      if (app.status === "Cancelled") return;

      // Decide section based on date
      const container = appDate >= now ? upcomingContainer : pastContainer;

      const card = document.createElement("div");
      card.classList.add("appointment-card");

      const statusClass = app.status.toLowerCase();

      card.innerHTML = `
        <div class="appointment-info">
          <h3>Dr. ${app.doctor_name}</h3>
          <p><strong>Specialization:</strong> ${app.specialization}</p>
          <p><strong>Date:</strong> ${app.appointment_date}</p>
          <p><strong>Time:</strong> ${app.appointment_time}</p>
          <span class="status-badge ${statusClass}">${app.status}</span>
        </div>
      `;

      // Show cancel button only for future appointments that are not cancelled
      if (appDate >= now && app.status !== "Cancelled") {
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel Appointment";
        cancelBtn.classList.add("cancel-btn");
        cancelBtn.onclick = () => cancelAppointment(app.appointment_id);
        card.appendChild(cancelBtn);
      }

      container.appendChild(card);
    });

    if (!upcomingContainer.hasChildNodes())
      upcomingContainer.innerHTML = "<p>No upcoming appointments.</p>";

    if (!pastContainer.hasChildNodes())
      pastContainer.innerHTML = "<p>No past appointments.</p>";

  } catch (err) {
    console.error("Error loading appointments:", err);
  }
}


function cancelAppointment(id) {
  if (!confirm("Are you sure you want to cancel this appointment?")) return;

  fetch("php/cancelAppointment.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appointment_id: id })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.status === "success") loadAppointments();
    })
    .catch(err => console.error("Error cancelling appointment:", err));
}
