import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home.jsx"));

export const routes = [
  {
    path: "/",
    exact: true,
    name: "home",
    component: Home,
  },
];
