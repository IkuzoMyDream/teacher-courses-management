import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import StudentPage from "./pages/StudentPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import EntryPage from "./pages/EntryPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import StaffPage from "./pages/StaffPage";
import useLocalState from "./utils/useLocalStorage";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes allowedRole={"Student"} />}>
            <Route
              element={<StudentPage></StudentPage>}
              path="/student/courses"
            ></Route>
            <Route
              element={<AnnouncementsPage />}
              path="/student/courses/:courseName/announcements"
            ></Route>
            <Route
              element={<EntryPage />}
              path="/student/courses/:courseName/announcements/:announcementId/entry"
            ></Route>
          </Route>
          <Route element={<PrivateRoutes allowedRole={"Staff"} />}>
            <Route element={<StaffPage></StaffPage>} path="/staff"></Route>
          </Route>
          <Route element={<LoginPage />} path="/"></Route>
          <Route element={<LoginPage />} path="/login"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
