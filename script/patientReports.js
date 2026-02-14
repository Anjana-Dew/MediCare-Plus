document.addEventListener("DOMContentLoaded", () => {
  fetch("./php/getPatientReports.php")
    .then(res => res.json())
    .then(data => {
      const tableBody = document.querySelector("#reportsTable tbody");

      if (data.status === "unauthorized") {
        alert("You must be logged in to access your medical reports.");
        window.location.href = "login.html";
        return;
      }

      if (data.status === "error") {
        alert(data.message);
        return;
      }

      if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No reports available.</td></tr>";
        return;
      }

      data.forEach(report => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${report.report_title}</td>
          <td>${report.doctor_name}</td>
          <td>${report.date_uploaded}</td>
          <td>
            <a href="uploads/reports/${report.report_file}" download>
              <button>Download</button>
            </a>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error loading reports:", err);
      alert("Failed to load reports.");
    });
});

