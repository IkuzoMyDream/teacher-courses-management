import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// student
import LoginPage from "./pages/LoginPage";
import StudentPage from "./pages/std/StudentPage";
import AnnouncementsPageStd from "./pages/std/AnnouncementsPageStd";
import EntryPage from "./pages/std/EntryPage";

// staff
import StaffPage from "./pages/stf/StaffPage";
import AnnouncementsPageStf from "./pages/stf/AnnouncementsPageStf";
import EntriesPageStf from "./pages/stf/EntriesPageStf";

import PrivateRoutes from "./utils/PrivateRoutes";

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
              element={<AnnouncementsPageStd />}
              path="/student/courses/:courseName/announcements"
            ></Route>
            <Route
              element={<EntryPage />}
              path="/student/courses/:courseName/announcements/:announcementId/entry"
            ></Route>
          </Route>
          <Route element={<PrivateRoutes allowedRole={"Staff"} />}>
            <Route
              element={<StaffPage></StaffPage>}
              path="/staff/courses"
            ></Route>
            <Route
              element={<AnnouncementsPageStf />}
              path="/staff/courses/:courseName/announcements"
            ></Route>
            <Route
              element={<EntriesPageStf />}
              path="/staff/courses/:courseName/announcements/:announcementId/entries"
            ></Route>
          </Route>
          <Route element={<LoginPage />} path="/"></Route>
          <Route element={<LoginPage />} path="/login"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
