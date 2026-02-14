document.addEventListener("DOMContentLoaded", () => {

  fetch("./php/checkAdminSession.php")
    .then(res => res.json())
    .then(data => {
      if (data.status !== "success") {
        alert("Access denied!");
        window.location.href = "login.html";
      } else {
        document.getElementById("adminName").textContent = "Logged in as: Admin #" + data.user_id;
      }
    })
    .catch(() => {
      alert("Session error!");
      window.location.href = "login.html";
    });
});

const addDoctorForm = document.getElementById("addDoctorForm");
  addDoctorForm.addEventListener("submit", e => {
    e.preventDefault();

    const doctorData = {
      full_name: document.getElementById("full_name").value,
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      specialization: document.getElementById("specialization").value,
      qualification: document.getElementById("qualification").value,
      experience: document.getElementById("experience").value,
      consultation_fee: document.getElementById("consultation_fee").value,
      availability: document.getElementById("availability").value
    };

    fetch("./php/addDoctor.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData)
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.status === "success") {
        addDoctorForm.reset();
      }
    })
    .catch(err => {
      console.error("Add doctor failed:", err);
      alert("An error occurred while adding doctor!");
    });
  });

function showSection(id) {
  document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function logout() {
  fetch("./php/logout.php").then(() => window.location.href = "login.html");
}
// =================== VIEW DOCTORS ===================
function loadDoctors() {
  fetch("./php/getDoctors.php")
    .then(res => res.json())
    .then(doctors => {
      const tbody = document.querySelector("#doctorsTable tbody");
      tbody.innerHTML = "";
      doctors.forEach(doc => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${doc.doctor_id}</td>
          <td>${doc.full_name}</td>
          <td>${doc.specialization || "-"}</td>
          <td>${doc.email}</td>
          <td><button class="delete-btn" onclick="deleteDoctor(${doc.doctor_id})">🗑️ Delete</button></td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Error loading doctors:", err));
}

function deleteDoctor(id) {
  if (!confirm("Are you sure you want to delete this doctor?")) return;

  fetch("./php/deleteDoctor.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doctor_id: id })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.status === "success") loadDoctors();
    })
    .catch(err => console.error("Error deleting doctor:", err));
}
// =================== VIEW PATIENTS ===================
function loadPatients() {
  fetch("./php/getPatients.php")
    .then(res => res.json())
    .then(patients => {
      const tbody = document.querySelector("#patientsTable tbody");
      tbody.innerHTML = "";
      patients.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.patient_id}</td>
          <td>${p.full_name}</td>
          <td>${p.gender || "-"}</td>
          <td>${p.contact_number || "-"}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Error loading patients:", err));
}

document.querySelector("[onclick=\"showSection('viewPatients')\"]")
  .addEventListener("click", loadPatients);

document.querySelector("[onclick=\"showSection('viewDoctors')\"]")
  .addEventListener("click", loadDoctors);

// =================== VIEW REPORTS ===================
function loadReports() {
  fetch("./php/getReports.php")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#reportsTable tbody");
      tbody.innerHTML = "";

      if (data.status !== "success" || data.data.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6'>No reports found.</td></tr>";
        return;
      }

      data.data.forEach(rep => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${rep.report_id}</td>
          <td>${rep.patient_name || "Unknown"}</td>
          <td>${rep.doctor_name || "Unknown"}</td>
          <td>${rep.report_title}</td>
          <td>${new Date(rep.date_uploaded).toLocaleString()}</td>
          <td>
            <button onclick="deleteReport(${rep.report_id})" class="delete-btn">🗑️ Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Error loading reports:", err));
}

function deleteReport(id) {
  if (!confirm("Are you sure you want to delete this report?")) return;

  fetch("./php/deleteReport.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ report_id: id })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.status === "success") loadReports();
    })
    .catch(err => console.error("Error deleting report:", err));
}

document.querySelector("[onclick=\"showSection('viewReports')\"]")
  .addEventListener("click", loadReports);

  // =================== DASHBOARD ===================
function loadDashboard() {
  fetch("./php/getDashboardStats.php")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("dashboard-stats");
      if (data.status !== "success") {
        container.innerHTML = "<p>Failed to load stats.</p>";
        return;
      }

      const s = data.data;
      container.innerHTML = `
        <div class="stat-card"><img src="img/doctor.png"><h3>Total Doctors</h3><p>${s.total_doctors}</p></div>
        <div class="stat-card"><img src="img/admin.png"><h3>Total Admins</h3><p>${s.total_admins}</p></div>
        <div class="stat-card"><img src="img/patient.png"><h3>Total Patients</h3><p>${s.total_patients}</p></div>
        <div class="stat-card"><img src="img/appoinments.png"><h3>Total Appointments</h3><p>${s.total_appointments}</p></div>
        <div class="stat-card"><img src="img/completed.png"><h3>Completed Appointments</h3><p>${s.completed_appointments}</p></div>
        <div class="stat-card"><img src="img/feedbacks.png"><h3>Total Feedback</h3><p>${s.total_feedback}</p></div>
        <div class="stat-card"><img src="img/ratings.png"><h3>Avg Doctor Rating</h3><p>${s.avg_rating || 0}/5</p></div>
      `;
    })
    .catch((err) => {
      console.error("Error loading dashboard:", err);
      document.getElementById("dashboard-stats").innerHTML =
        "<p>Error loading dashboard.</p>";
    });
}

document.querySelector("[onclick=\"showSection('dashboard')\"]")
  .addEventListener("click", loadDashboard);

document.addEventListener("DOMContentLoaded", loadDashboard);
