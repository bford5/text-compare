const { colors } = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		contaienr: {
			center: true,
			padding: "1.5rem",
			screens: {
				"2xl": "1360px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", ...fontFamily.sans],
			},
			colors: {
				...colors,
				"light-gold": "#f5bc51",
				"dark-gold": "#533519",
				"light-blue": "#416ED8",
				"dark-blue": "#234BA9",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
