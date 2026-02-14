fetch("./php/sessionData.php")
  .then((res) => res.json())
  .then((data) => {
    if (data.loggedIn) {
      console.log("User logged in as:", data.username);

      // Fetch patient details separately from database
      fetch("./php/getPatientData.php")
        .then((res) => res.json())
        .then((patientData) => {
          console.log("Patient data fetched:", patientData);

          if (!patientData.success) {
            alert(
              "You are logged in, but not registered as a patient.\nPlease complete the Online Patient Registration to book an appointment."
            );
            // Optionally redirect them to registration page:
            window.location.href = "registration.html";
            return;
          }

          // ✅ If registered patient, display their details
          document.getElementById("patient-name").textContent =
            patientData.patient.full_name || patientData.patient.name || "N/A";
          document.getElementById("patient-email").textContent =
            patientData.patient.email || "N/A";
          document.getElementById("patient-phone").textContent =
            patientData.patient.contact_number ||
            patientData.patient.phone ||
            "N/A";
        })
        .catch((err) => console.error("Error fetching patient data:", err));

      // Store logged-in user info for later use
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);
    } else {
      alert("Please log in to book an appointment.");
      window.location.href = "login.html";
    }
  })
  .catch((err) => console.error("Session check failed:", err));

// Listen for department selection to fetch doctors
document.getElementById("department").addEventListener("change", function () {
  const department = this.value;
  const doctorList = document.getElementById("doctor-list");

  if (department) {
    fetch(`./php/getDoctorsByDept.php?department=${department}`)
      .then((res) => res.json())
      .then((doctors) => {
        if (doctors.length > 0) {
          doctorList.innerHTML = `
            <h3>Available Doctors</h3>
            ${doctors
              .map(
                (doc) => `
                  <div class="doctor-card">
                    <p><strong>${doc.name}</strong></p>
                    <p>Consultation Fee: Rs. ${doc.consultation_fee}</p>
                    <label>
                      <input type="radio" name="doctor_id" value="${doc.doctor_id}" required> Select
                    </label>
                  </div>
                `
              )
              .join("")}
          `;
        } else {
          doctorList.innerHTML =
            "<p>No doctors available for this department.</p>";
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  } else {
    doctorList.innerHTML = "<p>Please select a department to view doctors.</p>";
  }
});
   
