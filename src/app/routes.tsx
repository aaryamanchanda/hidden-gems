import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { GemDetail } from "./pages/GemDetail";
import { Submit } from "./pages/Submit";
import { About } from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "explore", Component: Explore },
      { path: "gem/:id", Component: GemDetail },
      { path: "submit", Component: Submit },
      { path: "about", Component: About },
      { path: "*", Component: Home },
    ],
  },
]);
