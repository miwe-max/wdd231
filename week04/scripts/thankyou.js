const results = document.querySelector("#results");

const params = new URLSearchParams(window.location.search);


const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const birthdate = params.get("birthdate");
const course = params.get("course");
const contact = params.get("contact");
const comments = params.get("comments");


results.innerHTML = `
  <p><strong>First Name:</strong> ${firstName}</p>

  <p><strong>Last Name:</strong> ${lastName}</p>

  <p><strong>Email:</strong> ${email}</p>

  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

  <p><strong>Birthdate:</strong> ${birthdate || "Not provided"}</p>

  <p><strong>Course:</strong> ${course}</p>

  <p><strong>Preferred Contact:</strong> ${contact}</p>

  <p><strong>Comments:</strong> ${comments || "No comments provided"}</p>
`;