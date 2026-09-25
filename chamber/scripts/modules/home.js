// ==========================================
// BUSINESS SPOTLIGHT CARDS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const spotlightsMainBox = document.querySelector(".spotlights-main-box");

    if (!spotlightsMainBox) return;

    spotlightsMainBox.innerHTML = "";

    const createSpotCard = (index) => {
        const spotCard = document.createElement("div");
        spotCard.className = `spot-card spot-card-0${index}`;

        spotCard.innerHTML = `
            <div class="title-spot">
                <h4 id="business-name-0${index}"></h4>
                <h3 id="tag0${index}"></h3>
            </div>

            <div class="spot-img">
                <img
                    src=""
                    alt=""
                    id="img-0${index}-spot"
                    width="80"
                >
            </div>

            <div class="spot-data">
                <p><span id="phone-0${index}"></span></p>
                <p><a href="" id="url-0${index}"></a></p>
                <p><span id="member-since-0${index}"></span></p>
            </div>
        `;

        return spotCard;
    };

    for (let i = 1; i <= 3; i++) {
        spotlightsMainBox.appendChild(createSpotCard(i));
    }
});


// ==========================================
// LOAD BUSINESS SPOTLIGHT DATA
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
    const nameBusiness01 = document.querySelector("#business-name-01");
    const nameBusiness02 = document.querySelector("#business-name-02");
    const nameBusiness03 = document.querySelector("#business-name-03");

    const industry01 = document.querySelector("#tag01");
    const industry02 = document.querySelector("#tag02");
    const industry03 = document.querySelector("#tag03");

    const phone01 = document.querySelector("#phone-01");
    const phone02 = document.querySelector("#phone-02");
    const phone03 = document.querySelector("#phone-03");

    const url01 = document.querySelector("#url-01");
    const url02 = document.querySelector("#url-02");
    const url03 = document.querySelector("#url-03");

    const member01 = document.querySelector("#member-since-01");
    const member02 = document.querySelector("#member-since-02");
    const member03 = document.querySelector("#member-since-03");

    const img01 = document.querySelector("#img-01-spot");
    const img02 = document.querySelector("#img-02-spot");
    const img03 = document.querySelector("#img-03-spot");

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const shuffledData = [...data].sort(() => 0.5 - Math.random());

        const businessNames = [
            nameBusiness01,
            nameBusiness02,
            nameBusiness03
        ];

        const industries = [
            industry01,
            industry02,
            industry03
        ];

        const phones = [
            phone01,
            phone02,
            phone03
        ];

        const urls = [
            url01,
            url02,
            url03
        ];

        const members = [
            member01,
            member02,
            member03
        ];

        const imgs = [
            img01,
            img02,
            img03
        ];

        businessNames.forEach((nameElement, index) => {
            if (nameElement && shuffledData[index]) {
                nameElement.textContent = shuffledData[index].Name;
            }
        });

        industries.forEach((industry, index) => {
            if (industry && shuffledData[index]) {
                industry.textContent = shuffledData[index].Industry;
            }
        });

        phones.forEach((phone, index) => {
            if (phone && shuffledData[index]) {
                phone.textContent = `Phone: ${shuffledData[index].Phone}`;
            }
        });

        urls.forEach((url, index) => {
            if (url && shuffledData[index]) {
                url.href = shuffledData[index].Website;
                url.textContent = "Visit the website";
                url.target = "_blank";
                url.rel = "noopener noreferrer";
            }
        });

        members.forEach((member, index) => {
            if (member && shuffledData[index]) {
                member.textContent =
                    `Membership level: ${shuffledData[index].Membership}`;
            }
        });

        imgs.forEach((img, index) => {
            if (img && shuffledData[index]) {
                img.src = shuffledData[index].logo;
                img.alt = `${shuffledData[index].Name} logo`;
            }
        });

    } catch (error) {
        console.error("Error fetching member data:", error);
    }
});


// ==========================================
// OPENWEATHER SETTINGS
// ==========================================

const myKey = "d632f7967596f028fd38c82042195a34";

// Benin City, Edo State, Nigeria
const myLat = "6.3350";
const myLon = "5.6037";


// ==========================================
// CURRENT WEATHER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const urlWeather =
        `https://api.openweathermap.org/data/2.5/weather` +
        `?lat=${myLat}` +
        `&lon=${myLon}` +
        `&units=metric` +
        `&appid=${myKey}`;

    async function apiFetch() {
        try {
            const response = await fetch(urlWeather);

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();

            displayResults(data);

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }


    const displayResults = (data) => {
        const weatherMainBox = document.querySelector("#weather-main");

        if (!weatherMainBox) return;

        weatherMainBox.innerHTML = "";

        const iconSrc =
            `https://openweathermap.org/img/wn/` +
            `${data.weather[0].icon}@2x.png`;

        const description = data.weather[0].description;

        /*
         * OpenWeather gives the city's timezone as an offset
         * from UTC in seconds.
         *
         * This allows the weekday to represent Benin City
         * rather than relying on the visitor's computer timezone.
         */
        const cityTime = new Date(
            (data.dt + data.timezone) * 1000
        );

        const weekday = cityTime.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC"
        });

        weatherMainBox.innerHTML = `
            <div class="current-weather">

                <h2>
                    The Current Weather in:
                    <span id="city-name">${data.name}</span>
                </h2>

                <h4>${weekday}</h4>

                <div class="weather-content"></div>

                <p>
                    Temperature:
                    <span id="current-temp">
                        ${Math.round(data.main.temp)}°C
                    </span>
                </p>

                <figure>
                    <img
                        id="weather-icon"
                        src="${iconSrc}"
                        alt="${description}"
                    >
                    <figcaption>
                        ${description}
                    </figcaption>
                </figure>

            </div>
        `;
    };


    apiFetch();
});


// ==========================================
// 3-DAY WEATHER FORECAST
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast` +
        `?lat=${myLat}` +
        `&lon=${myLon}` +
        `&units=metric` +
        `&appid=${myKey}`;


    async function apiForecastFetch() {
        try {
            const response = await fetch(forecastUrl);

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const forecastData = await response.json();

            displayResultsForecast(forecastData);

        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    }


    const displayResultsForecast = (forecastData) => {
        const weatherForecast =
            document.querySelector("#weather-forecast");

        if (!weatherForecast) return;

        weatherForecast.innerHTML = "";


        // ------------------------------------------
        // GET CITY TIMEZONE
        // ------------------------------------------

        const timezoneOffset =
            forecastData.city?.timezone || 0;


        /*
         * Create today's calendar date for Benin City.
         *
         * Example:
         * 2026-09-25
         */
        const currentCityTime = new Date(
            Date.now() + timezoneOffset * 1000
        );

        const todayDate =
            currentCityTime.toISOString().split("T")[0];


        // ------------------------------------------
        // GROUP FORECASTS BY CALENDAR DAY
        // ------------------------------------------

        const forecastsByDate = {};


        forecastData.list.forEach((forecastItem) => {

            /*
             * Convert forecast Unix time into the local
             * time of the forecast city.
             */
            const cityDate = new Date(
                (forecastItem.dt + timezoneOffset) * 1000
            );


            const dateKey =
                cityDate.toISOString().split("T")[0];


            /*
             * We do not want today's remaining forecasts.
             * The requested forecast is for the NEXT 3 DAYS.
             */
            if (dateKey === todayDate) {
                return;
            }


            if (!forecastsByDate[dateKey]) {
                forecastsByDate[dateKey] = [];
            }


            forecastsByDate[dateKey].push({
                data: forecastItem,
                localDate: cityDate
            });
        });


        // ------------------------------------------
        // SORT THE FUTURE DATES
        // ------------------------------------------

        const futureDates =
            Object.keys(forecastsByDate)
                .sort()
                .slice(0, 3);


        // ------------------------------------------
        // SELECT MIDDAY FORECAST FOR EACH DAY
        // ------------------------------------------

        const dailyForecasts =
            futureDates.map((dateKey) => {

                const forecasts =
                    forecastsByDate[dateKey];


                /*
                 * Select the forecast closest to
                 * 12:00 noon local time.
                 *
                 * This is much better than simply
                 * taking the first forecast of each day.
                 */
                return forecasts.reduce(
                    (closestForecast, currentForecast) => {

                        const currentHour =
                            currentForecast.localDate.getUTCHours();

                        const closestHour =
                            closestForecast.localDate.getUTCHours();


                        const currentDifference =
                            Math.abs(currentHour - 12);

                        const closestDifference =
                            Math.abs(closestHour - 12);


                        if (
                            currentDifference <
                            closestDifference
                        ) {
                            return currentForecast;
                        }


                        return closestForecast;
                    }
                );
            });


        // ------------------------------------------
        // CREATE THE FORECAST CONTAINER
        // ------------------------------------------

        const forecast =
            document.createElement("article");

        forecast.className = "forecast";


        forecast.innerHTML = `
            <h3>3-Day Weather Forecast</h3>

            <div
                class="main-day-box"
                id="three-day-forecast"
            >
            </div>
        `;


        weatherForecast.appendChild(forecast);


        const mainDayBox =
            document.querySelector("#three-day-forecast");


        // ------------------------------------------
        // DISPLAY EACH OF THE THREE DAYS
        // ------------------------------------------

        dailyForecasts.forEach(
            (forecastItem) => {

                const dailyData =
                    forecastItem.data;

                const localDate =
                    forecastItem.localDate;


                // Actual weekday from forecast date
                const dayName =
                    localDate.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "long",
                            timeZone: "UTC"
                        }
                    );


                // Actual date
                const formattedDate =
                    localDate.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC"
                        }
                    );


                const description =
                    dailyData.weather[0].description;


                const iconSrc =
                    `https://openweathermap.org/img/wn/` +
                    `${dailyData.weather[0].icon}@2x.png`;


                const temperature =
                    Math.round(dailyData.main.temp);


                const dayBox =
                    document.createElement("div");

                dayBox.className = "day-box";


                dayBox.innerHTML = `
                    <h4>
                        ${dayName}
                    </h4>

                    <p class="forecast-date">
                        ${formattedDate}
                    </p>

                    <figure>

                        <img
                            src="${iconSrc}"
                            alt="${description}"
                            width="100"
                            height="100"
                            loading="lazy"
                        >

                        <figcaption>
                            ${description}
                        </figcaption>

                    </figure>

                    <p>
                        Temperature:
                        <span>
                            ${temperature}°C
                        </span>
                    </p>

                `;


                mainDayBox.appendChild(dayBox);
            });


        // ------------------------------------------
        // FALLBACK IF FORECAST CANNOT BE DISPLAYED
        // ------------------------------------------

        if (dailyForecasts.length === 0) {
            mainDayBox.innerHTML =
                "<p>Forecast information is currently unavailable.</p>";
        }
    };


    apiForecastFetch();
});


// ==========================================
// EVENTS
// ==========================================

async function getEvents() {
    try {
        const response = await fetch("data/events.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data.events;

    } catch (error) {
        console.error("Error fetching events:", error);

        return [];
    }
}


async function displayEvents() {
    const events = await getEvents();

    const eventsContainer =
        document.getElementById("events-list");


    if (!eventsContainer) return;


    eventsContainer.innerHTML = "";


    if (events.length === 0) {
        eventsContainer.innerHTML =
            "<p>No upcoming events at this time.</p>";

        return;
    }


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextEvents = events
        .filter((event) => {
            const eventDate = new Date(`${event.date}T00:00:00`);
            return eventDate >= today;
        })
        .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        })
        .slice(0, 3);


    nextEvents.forEach((event) => {
        const eventElement =
            document.createElement("div");

        eventElement.classList.add("event");


        eventElement.innerHTML = `
            <h3>${event.name}</h3>

            <p>
                Date:
                ${new Date(event.date).toDateString()}
            </p>
        `;


        eventsContainer.appendChild(
            eventElement
        );
    });
}


document.addEventListener(
    "DOMContentLoaded",
    () => {
        displayEvents();
    }
);