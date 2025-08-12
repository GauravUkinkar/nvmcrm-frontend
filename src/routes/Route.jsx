import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.jsx"));
const ActivityLogs = lazy(() => import("../pages/activityLogs/ActivityLogs.jsx"));
const AddClient = lazy(() => import("../pages/add_client/AddClient.jsx"));

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
    path: "/activityLogs",
    exact: true,
    name: "activityLogs",
    component: ActivityLogs,
  },
  {
    path:"/addclients",
    exact:true,
    name:"addClients",
    component:AddClient
  }
];
