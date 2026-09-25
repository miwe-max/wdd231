const container = document.querySelector("#course-list");
const courseDetails = document.querySelector("#course-details");


function displayCourses(list) {

    container.innerHTML = "";

    list.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>${course.credits} credits</p>
        `;

        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        container.appendChild(card);

    });

    calculateCredits(list);

}


function displayCourseDetails(course) {

    courseDetails.innerHTML = `
        <button id="closeModal" aria-label="Close course details">❌</button>

        <h2>${course.code}</h2>

        <h3>${course.name}</h3>

        <p><strong>Credits:</strong> ${course.credits}</p>
    `;

    courseDetails.showModal();

    document.querySelector("#closeModal")
        .addEventListener("click", () => {
            courseDetails.close();
        });

}


courseDetails.addEventListener("click", (event) => {

    const dialogDimensions = courseDetails.getBoundingClientRect();

    const clickedOutside =
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom;

    if (clickedOutside) {
        courseDetails.close();
    }

});


function calculateCredits(list) {

    const total = list.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    document.querySelector("#credits").textContent = total;

}


document.querySelector("#all")
    .onclick = () => displayCourses(courses);


document.querySelector("#wdd")
    .onclick = () => displayCourses(
        courses.filter(course => course.code.startsWith("WDD"))
    );


document.querySelector("#cse")
    .onclick = () => displayCourses(
        courses.filter(course => course.code.startsWith("CSE"))
    );


document.querySelector("#currentyear")
    .textContent = new Date().getFullYear();


document.querySelector("#lastModified")
    .textContent = "Last Modified: " + document.lastModified;


displayCourses(courses);