import { create } from "zustand";

type ThemeStore = {
	theme: "dark" | "light";
};

const setTheme = (theme: ThemeStore["theme"]) => {
	document.documentElement.classList.toggle("dark");
	localStorage.setItem("theme", theme);
};

const getTheme = () => {
	const theme = localStorage.getItem("theme");

	if (!theme) {
		document.documentElement.classList.add("dark");
		setTheme("dark");
		return "dark";
	}

	document.documentElement.classList.add(theme);
	console.log(theme);
	return theme as ThemeStore["theme"];
};

type ThemeAction = {
	toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore & ThemeAction>((set) => ({
	theme: getTheme(),
	toggleTheme: () =>
		set((state) => {
			state.theme === "dark" ? setTheme("light") : setTheme("dark");

			return { theme: state.theme === "dark" ? "light" : "dark" };
		}),
}));
