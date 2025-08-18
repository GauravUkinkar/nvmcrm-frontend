import { lazy } from "react";


const Home = lazy(() => import("../pages/Home/Home.jsx"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.jsx"));
const ActivityLogs = lazy(() => import("../pages/activityLogs/ActivityLogs.jsx"));
const ActionItems = lazy(() => import("../pages/actionItems/ActionItems.jsx"));
const BDTracker = lazy(() => import("../pages/bdTracker/BDTracker.jsx"));
const Properties = lazy(() => import("../pages/properties/Properties.jsx"));
const AddClient = lazy(() => import("../pages/add_client/AddClient.jsx"));
const AddEmployee = lazy(() => import("../pages/add_employee/AddEmployee.jsx"));
const Brokers = lazy(() => import("../pages/brokers/Brokers.jsx"));
const Employees = lazy(() => import("../pages/employees/Employees.jsx"));
const Clients= lazy(() => import("../pages/clients/Clients.jsx"));
const Projects= lazy(() => import("../pages/projects/Projects.jsx"));
const addProperties = lazy(() => import("../pages/add_properties/AddProperties.jsx"));
const addBroker = lazy(() => import("../pages/add_brokers/AddBroker.jsx"));
const addBDtracker = lazy(() => import("../pages/add_bdtracker/AddBdtracker.jsx"));
const addActionItems = lazy(() => import("../pages/add_actions/AddActionItems.jsx"));


export const routes = [

  {
    path: "/home",
    exact: true,
    name: "home",
    component: Home,
  },
  {
    path: "/",
    exact: true,
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/projects",
    exact: true,
    name: "projects",
    component: Projects,
  },
  {
    path: "/clients",
    exact: true,
    name: "clients",
    component: Clients,
  },
  {
    path: "/employees",
    exact: true,
    name: "employees",
    component: Employees,
  },
  {
    path: "/brokers",
    exact: true,
    name: "brokers",
    component: Brokers,
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
  {
    path:"/addclients",
    exact:true,
    name:"addClients",
    component:AddClient
  },
  {
    path:"/addemployee",
    exact:true,
    name:"addemployee",
    component:AddEmployee
  },
  {
    path:"/addproperties",
    exact:true,
    name:"addproperties",
    component:addProperties
  },
  {
    path:"/addbroker",
    exact:true,
    name:"addbroker",
    component:addBroker
  },
  {
    path:"/addBdTracker",
    exact:true,
    name:"addBdTracker",
    component:addBDtracker
  },
  {
    path:"/addactionitems",
    exact:true,
    name:"addactionitems",
    component:addActionItems
  },
];
