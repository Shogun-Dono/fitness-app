/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#A40000",
                secondary: "#8B0000",
                tertiary: "#650000",

                bg: "#000000",
                bg2: "#202020",
                bg_dark_active: "#363636",

                text: {
                    light: "#000000",
                    dark: "#FFFFFF",
                }
            }
        },
    },
    plugins: [],
}

