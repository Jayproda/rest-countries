import "./App.css";
import { useEffect, useState } from "react";
import CountryExplorer from "./components/CountryExplorer";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const nextTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container mx-auto flex items-center justify-between">
          <h1>Where in the world?</h1>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${nextTheme} mode`}
            aria-pressed={theme === "dark"}
            onClick={() => setTheme(nextTheme)}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </header>

      <main className="content-panel" aria-label="Countries explorer">
        <CountryExplorer />
      </main>
    </div>
  );
}

export default App;
