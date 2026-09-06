const container =
    document.querySelector("#course-list");



function displayCourses(list) {


    container.innerHTML = "";


    list.forEach(course => {


        let card = document.createElement("div");


        card.classList.add("course");


        if (course.completed) {

            card.classList.add("completed");

        }



        card.innerHTML = `

<h3>${course.code}</h3>

<p>${course.name}</p>

<p>${course.credits} credits</p>

`;



        container.appendChild(card);


    });



    calculateCredits(list);


}



function calculateCredits(list) {


    let total = list.reduce(
        (sum, course) => sum + course.credits,
        0
    );


    document.querySelector("#credits").textContent = total;


}





document.querySelector("#all")
    .onclick = () => displayCourses(courses);



document.querySelector("#wdd")
    .onclick = () => displayCourses(
        courses.filter(c => c.code.startsWith("WDD"))
    );



document.querySelector("#cse")
    .onclick = () => displayCourses(
        courses.filter(c => c.code.startsWith("CSE"))
    );





document.querySelector("#currentyear")
    .textContent = new Date().getFullYear();



document.querySelector("#lastModified")
    .textContent =
    "Last Modified: " + document.lastModified;



displayCourses(courses);