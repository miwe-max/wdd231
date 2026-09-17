const urlParams = new URLSearchParams(window.location.search);

document.getElementById("first-name").textContent =
    urlParams.get("firstName") || "N/A";
document.getElementById("last-name").textContent =
    urlParams.get("lastName") || "N/A";
document.getElementById("email").textContent = urlParams.get("email") || "N/A";
document.getElementById("mobile-number").textContent =
    urlParams.get("phone") || "N/A";
document.getElementById("business-name").textContent =
    urlParams.get("organization") || "N/A";

// MODIFIED TIMESTAMP HANDLING ⬇️
const submittedTimestamp = urlParams.get("timestamp");
const timestampDisplay = document.getElementById("timestamp");

if (submittedTimestamp) {
    const formLoadDate = new Date(submittedTimestamp);
    const submissionDate = new Date();

    // Format for Ghana locale (en-GH)
    timestampDisplay.textContent = formLoadDate.toLocaleString('en-GH', {
        dateStyle: 'long',
        timeStyle: 'short'
    });

    // NEW: Security check for submission delay ⬇️
    const timeDifference = submissionDate - formLoadDate;
    if (timeDifference > 3600000) { // 1 hour = 3,600,000 ms
        timestampDisplay.innerHTML += `<br><small>(Submission received ${Math.floor(timeDifference / 3600000)} hours after form load)</small>`;
    }
} else {
    timestampDisplay.textContent = "Not recorded - form loaded without timestamp";
}