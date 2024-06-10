import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GlobalFonts } from "@/styles/common/GlobalFonts.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { worker } from "./mocks/browser.ts";
if (import.meta.env.NODE_ENV !== "development") {
  await worker.start();
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalFonts />
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
