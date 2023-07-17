import "./index.css";

import Glide from "@glidejs/glide";

import dayjs from "dayjs";

("use strict");

const HOURS = 1000 * 60 * 60;
const MINUTES = 1000 * 60;
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const promotionEndElement =
    document.getElementById("promotionEnd");

const campainDuration = 5;
const promotionStart = new dayjs("2023-06-15T00:00:00");
let currentTime = null;
let campainNumber;
let newCampainStartDay;
let today;
let campainEnd;

function calcCampainDuration() {
    campainNumber =
        Math.floor(
            Math.abs(promotionStart.diff(today, "d")) /
                campainDuration
        ) * 5;
    newCampainStartDay = promotionStart.add(
        campainNumber,
        "day"
    );

    campainEnd = newCampainStartDay.add(
        campainDuration,
        "day"
    );
    promotionEndElement.innerText =
        campainEnd.format("DD/MM/YYYY");
}

const updateTimer = () => {
    currentTime = currentTime
        ? currentTime.add(1000, "ms")
        : today;
    const difference = campainEnd.diff(currentTime);
    const remainingDays = Math.floor(
        difference / (HOURS * 24)
    );
    const remainingHours = Math.floor(
        (difference % (HOURS * 24)) / HOURS
    );
    const remainingMinutes = Math.floor(
        (difference % HOURS) / MINUTES
    );
    const remainingSeconds = Math.floor(
        (difference % MINUTES) / 1000
    );
    const formattedDays =
        remainingDays < 10
            ? `0${remainingDays}`
            : `${remainingDays}`;
    const formattedHours =
        remainingHours < 10
            ? `0${remainingHours}`
            : `${remainingHours}`;
    const formattedMinutes =
        remainingMinutes < 10
            ? `0${remainingMinutes}`
            : `${remainingMinutes}`;
    const formattedSeconds =
        remainingSeconds < 10
            ? `0${remainingSeconds}`
            : `${remainingSeconds}`;
    daysElement.innerText = formattedDays;
    hoursElement.innerText = formattedHours;
    minutesElement.innerText = formattedMinutes;
    secondsElement.innerText = formattedSeconds;
};

//TODO Atenção, remover o s do worldtime para que o sistema puxe a data sem utilzar o a data do PC do usuário
today = dayjs();
calcCampainDuration();
updateTimer();
setInterval(updateTimer, 1000);
accessControl(today);

// Fim da Contador de Tempo até o final da campanha

let vacancies = 90;
const vacanciesNumberElement =
    document.getElementById("vacancies");

async function accessControl(today) {
    if (typeof Storage !== "undefined") {
        if (localStorage.lastAccess) {
            const lastAccessDate = new dayjs(
                await JSON.parse(localStorage.lastAccess)
            );
            const lastAccessDifference = today.diff(
                lastAccessDate,
                "m"
            );
            let lastVacancies;
            if (lastAccessDifference <= 120) {
                lastVacancies =
                    vacancies - lastAccessDifference / 3;
            }
            if (
                lastAccessDifference > 120 &&
                lastAccessDifference <= 300
            ) {
                lastVacancies =
                    vacancies -
                    40 -
                    lastAccessDifference / 10;
            }
            if (lastAccessDifference > 300) {
                lastVacancies =
                    vacancies -
                    40 -
                    30 -
                    lastAccessDifference / 280;
            }
            lastVacancies =
                lastVacancies < 1 ? 1 : lastVacancies;
            vacanciesNumberElement.innerText =
                Math.floor(lastVacancies);
        } else {
            localStorage.lastAccess = JSON.stringify(today);
            vacanciesNumberElement.innerText = vacancies;
        }
    } else {
        vacanciesNumberElement.innerText = 43;
    }
}
// fim do contador de vagas

const btnMobileMenu =
    document.getElementById("btnMobileMenu");
const mobileMenu = document.getElementById("mobileMenu");

const faqs = document.getElementById("faq").children;

new Glide(".glide", {
    type: "carousel",
    autoplay: 2000,
    perView: 3,
    breakpoints: {
        1024: {
            perView: 2,
        },
        600: {
            perView: 1,
        },
    },
}).mount();

window.onload = () => {
    mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
    btnMobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
    for (const faq of faqs) {
        faq.addEventListener("click", (e) => {
            const p = faq.getElementsByTagName("p")[0];
            for (const nfaq of faqs) {
                if (
                    nfaq.getElementsByTagName("p")[0] !== p
                ) {
                    nfaq.getElementsByTagName(
                        "p"
                    )[0].classList.add("hidden");
                }
            }
            p.classList.toggle("hidden");
        });
    }
};
