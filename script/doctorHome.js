 document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");

  // Load patients in dropdown
  fetch("./php/getPatients.php")
    .then(res => res.json())
    .then(data => {
      const patientSelect = document.getElementById("patientName");
      data.forEach(patient => {
        const opt = document.createElement("option");
        opt.value = patient.patient_id;
        opt.textContent = patient.full_name;
        patientSelect.appendChild(opt);
      });
    });

  // Handle upload form submit
uploadForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("Upload form submitted");

  const patientId = document.getElementById("patientName").value;
  const reportTitle = document.getElementById("reportTitle").value.trim();
  const reportFile = document.getElementById("reportFile").files[0];

  if (!patientId || !reportTitle || !reportFile) {
    alert("Please fill in all fields and select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("patient_id", patientId);
  formData.append("report_title", reportTitle);
  formData.append("report_file", reportFile);

  fetch("./php/uploadReport.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if (data.status === "success") {
      uploadForm.reset();
    }
  })
  .catch(err => {
    console.error("Upload failed:", err);
    alert("Error uploading report. Please check console for details.");
  });
});

});
 function showSection(id) {
      document.querySelectorAll(".content-section").forEach((sec) => {
        sec.classList.remove("active");
      });
      document.getElementById(id).classList.add("active");
      document.getElementById("section-title").textContent =
      document.querySelector(`[onclick="showSection('${id}')"]`).textContent.trim();
    }