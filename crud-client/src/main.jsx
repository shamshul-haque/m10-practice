import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Update from "./Update";
import Users from "./Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <Users />,
    loader: () => fetch("http://localhost:5000/users"),
  },
  {
    path: "/update/:id",
    element: <Update />,
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
