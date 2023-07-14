// const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "index.html",
        "./src/**/*.{js,jsx,ts,tsx,vue,html}",
    ],
    theme: {
        extend: {
            colors: {
                azulescuro: {
                    200: "#131D7C",
                    500: "#11196A",
                    900: "#0E1458",
                },
                azulclaro: {
                    100: "#EEF0FB",
                    200: "#CDD3F3",
                    300: "#9CA8E7",
                    500: "#3A53CF",
                    700: "#2C43B5",
                    900: "#1D267D",
                },
                violeta: {
                    50: "#F5EBFE",
                    100: "#ECD8FD",
                    200: "#E2C5FC",
                    300: "#E2C5FC",
                    400: "#D9B1FB",
                    500: "#CF9EFA",
                    600: "#CF9EFA",
                    700: "#B264F7",
                    800: "#A951F6",
                    900: "#9F3DF5",
                },
                roxo: {
                    100: "#6D56B3",
                    300: "#634CA9",
                    500: "#5B469B",
                    700: "#533F8D",
                    900: "#4A397F",
                },
            },
            plugins: [],
        },
    },
};
