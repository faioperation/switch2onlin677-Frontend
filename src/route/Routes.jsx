import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Conversations from "../pages/Conversations";
import Leads from "../pages/Leads";
import Settings from "../pages/Settings";
import Auth from "../layout/Auth";
import Login from "../pages/Authintication/Login";
import ForgetPassword from "../pages/Authintication/ForgetPassword";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [

            {
                index: true,
                element: <Dashboard></Dashboard>
            },
            {
                path: "analytics",
                element: <Analytics></Analytics>
            },
            {
                path: "conversation",
                element: <Conversations></Conversations>
            },
            {
                path: "leads",
                element: <Leads></Leads>
            },
            {
                path: "settings",
                element: <Settings></Settings>
            },

        ]
    },
    {
        path: "auth",
        element: <Auth></Auth>,
        children: [
          { path: "login", element: <Login></Login> },
          { path: "forget-password", element: <ForgetPassword></ForgetPassword> },
        ],
      },
]);