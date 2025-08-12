import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.jsx"));

export const routes = [
  {
    path: "/",
    exact: true,
    name: "home",
    component: Home,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "dashboard",
    component: Dashboard,
  },
];
