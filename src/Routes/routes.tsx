import App from "@/App";
import Editproduct from "@/components/sportsItem/Editform";
// import AuthLayout from "@/Layout/AuthLayout";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import SalesHistory from "@/pages/SalesHistory/SalesHistory";
// import SalesManagement from "@/pages/SalesManagement/SalesManagement";
// import Editproduct from "@/pages/sports-tems/AddItem";
import Addproduct from "@/pages/sports-tems/AddItem";
// import AddItem from "@/pages/sports-tems/AddItem";
import Sportsitems from "@/pages/sports-tems/Sportsitems";
import { createBrowserRouter } from "react-router-dom";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Sportsitems></Sportsitems>,
      },
      {
        path: "sports-items",
        element: <Sportsitems></Sportsitems>,
      },
      {
        path: "add-item",
        element: <Addproduct></Addproduct>,
      },
      {
        path: "edit-product",
        element: <Editproduct></Editproduct>,
      },
      {
        path: "sales-history",
        element: <SalesHistory></SalesHistory>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
export default Router;
