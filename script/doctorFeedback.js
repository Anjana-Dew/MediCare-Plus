document.addEventListener("DOMContentLoaded", () => {
  fetchFeedback();
});

async function fetchFeedback() {
  try {
    const res = await fetch("php/getDoctorFeedback.php");
    const data = await res.json();

    const container = document.getElementById("feedbackContainer");
    container.innerHTML = "";

    if (data.status === "error") {
      container.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    if (data.feedback.length === 0) {
      container.innerHTML = "<p>No feedback received yet.</p>";
      return;
    }

    data.feedback.forEach(item => {
      const feedbackCard = document.createElement("div");
      feedbackCard.classList.add("feedback-card");

      feedbackCard.innerHTML = `
        <div class="feedback-header">
          <h3>Patient: Anonymous #${item.patient_id}</h3>
          <span class="rating">⭐ ${item.rating}/5</span>
        </div>
        <p class="comment">"${item.comment}"</p>
        <small>${new Date(item.feedback_date).toLocaleString()}</small>
      `;

      container.appendChild(feedbackCard);
    });
  } catch (err) {
    console.error("Error loading feedback:", err);
    document.getElementById("feedbackContainer").innerHTML =
      "<p>Failed to load feedback. Please try again later.</p>";
  }
}
