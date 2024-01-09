import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import StaffPage from "./pages/StaffPage";
import EntryPage from "./pages/EntryPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/student/courses",
    element: <StudentPage />,
  },
  {
    path: "/student/courses/:courseName/announcements",
    element: <AnnouncementsPage />,
  },
  {
    path: "/student/courses/:courseName/announcements/:announcementId/entry",
    element: <EntryPage />,
  },
  {
    path: "/staff",
    element: <StaffPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
