import "./index.css";

import Glide from "@glidejs/glide";

import axios from "axios";

import dayjs from "dayjs";

("use strict");

const HOURS = 1000 * 60 * 60;
const MINUTES = 1000 * 60;
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

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
axios({
    method: "get",
    url: "https://api.api-ninjas.com/v1/worldtimes?city=brazilia",
    headers: {
        "X-Api-Key":
            "daxt47FMZl0RLCreYS5MFg==OYXWPzTj8ai4Mdzb",
    },
    responseType: "json",
})
    .then(function (response) {
        today = dayjs(response.data.datetime);
        calcCampainDuration();
        updateTimer();
        setInterval(updateTimer, 1000);
    })
    .catch((e) => {
        //TODO Remover esse logo, após a remoção do S do worldtime acima e antes de colocar em produção
        console.log(
            "Cai no erro, retornando dia atual do pc do usuário"
        );
        today = dayjs();
        calcCampainDuration();
        updateTimer();
        setInterval(updateTimer, 1000);
    });

// Fim da Contador de Tempo até o final da campanha

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
