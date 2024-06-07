import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { StrictMode } from "react";
import { GlobalFonts } from "@/styles/common/GlobalFonts.ts";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <GlobalFonts />
    <App />
  </StrictMode>
);
