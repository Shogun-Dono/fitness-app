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

                bg: "#0F0F0F",
                bg2: "#171717",
            }
        },
    },
    plugins: [],
}

