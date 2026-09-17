var actual = new Date();

function mostrarCalendario(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var primerDiaSemana = now.getDay(); // No adjustment needed, Sunday is 0
    var ultimoDiaMes = last.getDate();
    var dia = 0;
    var resultado = "<tr>"; // No background color here
    var diaActual = 0;
    console.log(ultimoDiaMes);
    var last_cell = primerDiaSemana + ultimoDiaMes;

    // hacemos un bucle hasta 42 (6 filas de 7 días)
    for (var i = 1; i <= 42; i++) {
        if (i == primerDiaSemana + 1) {
            // determinamos en qué día empieza
            dia = 1;
        }
        if (i <= primerDiaSemana || i >= last_cell) {
            // celda vacía
            resultado += "<td>&nbsp;</td>";
        } else {
            // mostramos el día
            if (
                dia == actual.getDate() &&
                month == actual.getMonth() + 1 &&
                year == actual.getFullYear()
            )
                resultado += "<td class='hoy'>" + dia + "</td>";
            // Día actual con la clase 'hoy'
            else
                resultado +=
                    "<td style='background-color: silver;'>" + dia + "</td>"; // Solo aplica el fondo en los días
            dia++;
        }
        if (i % 7 == 0) {
            if (dia > ultimoDiaMes) break;
            resultado += "</tr><tr>\n";
        }
    }
    resultado += "</tr>";

    var meses = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Calculamos el siguiente mes y año
    var nextMonth = month + 1;
    var nextYear = year;

    if (month + 1 > 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }

    // Calculamos el anterior mes y año
    var prevMonth = month - 1;
    var prevYear = year;

    if (month - 1 < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }

    // Actualizamos el contenido del caption y el tbody
    document
        .getElementById("calendar")
        .getElementsByTagName("caption")[0].innerHTML =
        "<div>" +
        meses[month - 1] +
        " / " +
        year +
        "</div>" +
        "<div>" +
        "<button class='calendar-nav' aria-label='Previous month' onclick='mostrarCalendario(" +
        prevYear +
        "," +
        prevMonth +
        ")'>&lt;</button> " +
        "<button class='calendar-nav' aria-label='Next month' onclick='mostrarCalendario(" +
        nextYear +
        "," +
        nextMonth +
        ")'>&gt;</button>" +
        "</div>";
    document
        .getElementById("calendar")
        .getElementsByTagName("tbody")[0].innerHTML = resultado;
}

// Inicializar el calendario con el mes actual
mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".cards-container");

    fetch("data/discover.json")
        .then(response => response.json())
        .then(cards => {
            cards.forEach(card => {
                const cardElement = document.createElement("div");
                cardElement.className = "card";

                const content = `
                    <img src="images/${card.image}" alt="${card.title}" loading="lazy">
                    <h3>${card.title}</h3>
                    <p class="address">${card.address}</p>
                    <p class="description">${card.description}</p>
                    <button class="learn-more">Learn More</button>
                `;
                cardElement.innerHTML = content;
                container.appendChild(cardElement);
            });
        })
        .catch(error => console.error("Error loading cards:", error));
});

document.addEventListener('DOMContentLoaded', function () {
    const visitMessageEl = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();

    let message;

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastDate = new Date(lastVisit);
        const diffTime = currentDate - lastDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffTime < 86400000) { // Less than 1 day
            message = 'Back so soon! Awesome!';
        } else {
            message = `You last visited ${diffDays} day${diffDays !== 1 ? 's' : ''} ago.`;
        }
    }

    // Update localStorage with current visit
    localStorage.setItem('lastVisit', currentDate.toISOString());

    // Display message
    if (visitMessageEl) {
        visitMessageEl.textContent = message;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});