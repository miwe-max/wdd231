document.addEventListener("DOMContentLoaded", () => {
    const formDataElement = document.getElementById("form-data")
    const storedData = localStorage.getItem("contactFormData")

    if (storedData) {
        const data = JSON.parse(storedData)
        formDataElement.innerHTML = `
            <h2>Submitted Information:</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong> ${data.message}</p>
        `

        // Clear the stored data
        localStorage.removeItem("contactFormData")
    } else {
        formDataElement.innerHTML = "<p>No form data found.</p>"
    }
})