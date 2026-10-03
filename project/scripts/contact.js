document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact")

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const data = Object.fromEntries(formData)

        // Store form data in localStorage
        localStorage.setItem("contactFormData", JSON.stringify(data))

        // Redirect to success page
        window.location.href = "contact-success.html"
    })
})