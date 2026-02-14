document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./php/getPatientData.php");
    const data = await response.json();

    if (data.success && data.patient) {
      document.querySelector(".checkup-container").style.display = "block";

      document.getElementById("patient-name").value = data.patient.full_name;
      document.getElementById("patient-email").value = data.patient.email;
      document.getElementById("patient-phone").value = data.patient.contact_number;
    } else {
      alert("You must be logged in to book a checkup.");
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Error loading user data:", error);
    alert("Something went wrong. Please log in again.");
    window.location.href = "login.html";
  }
});

// ----- Checkup price updater -----
const checkupType = document.getElementById("checkup-type");
const costDisplay = document.getElementById("checkup-cost");

checkupType.addEventListener("change", () => {
  const prices = {
    blood: "Rs. 3,000",
    xray: "Rs. 4,500",
    mri: "Rs. 125,000",
    ecg: "Rs. 8,500",
    fullbody: "Rs. 20,000"
  };
  costDisplay.textContent = prices[checkupType.value] || "-";
});

// ----- Form submission -----
const form = document.getElementById("checkup-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.reset();
  costDisplay.textContent = "-";
  successMessage.style.display = "block";
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
});
