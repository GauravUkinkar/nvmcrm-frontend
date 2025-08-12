import { lazy } from "react";


const Home = lazy(() => import("../pages/Home/Home.jsx"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.jsx"));
const ActivityLogs = lazy(() => import("../pages/activityLogs/ActivityLogs.jsx"));
const ActionItems = lazy(() => import("../pages/actionItems/ActionItems.jsx"));
const BDTracker = lazy(() => import("../pages/bdTracker/BDTracker.jsx"));
const Properties = lazy(() => import("../pages/properties/Properties.jsx"));

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
  {
    path: "/properties",
    exact: true,
    name: "properties",
    component: Properties,
  },
  {
    path: "/bdTracker",
    exact: true,
    name: "bdTracker",
    component: BDTracker,
  },
  {
    path: "/actionItems",
    exact: true,
    name: "actionItems",
    component: ActionItems,
  },
  {
    path: "/activityLogs",
    exact: true,
    name: "activityLogs",
    component: ActivityLogs,
  },
];
