import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// student
import LoginPage from "./pages/LoginPage";
import StudentPage from "./pages/std/StudentPage";
import AnnouncementsPageStd from "./pages/std/AnnouncementsPageStd";
import EntryPage from "./pages/std/EntryPage";
import StudentNavbar from "./components/std/student-navbar";
import { DataProviderStd } from "./utils/std-context";

// staff
import StaffPage from "./pages/stf/StaffPage";
import AnnouncementsPageStf from "./pages/stf/AnnouncementsPageStf";
import EntriesPageStf from "./pages/stf/EntriesPageStf";
import StaffNavbar from "./components/stf/staff-navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import { DataProviderStf } from "./utils/stf-context";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <PrivateRoutes
              allowedRole={"Student"}
              navbar={StudentNavbar}
              dataprovider={DataProviderStd}
            />
          }
        >
          <Route
            element={<StudentPage></StudentPage>}
            path="/student/courses"
          ></Route>
          <Route
            element={<AnnouncementsPageStd />}
            path="/student/courses/:courseName"
          ></Route>
          <Route
            element={<EntryPage />}
            path="/student/courses/:courseName/:announcementTitle"
          ></Route>
        </Route>
        <Route
          element={
            <PrivateRoutes
              allowedRole={"Staff"}
              navbar={StaffNavbar}
              dataprovider={DataProviderStf}
            />
          }
        >
          <Route
            element={<StaffPage></StaffPage>}
            path="/staff/courses"
          ></Route>
          <Route
            element={<AnnouncementsPageStf />}
            path="/staff/courses/:courseName"
          ></Route>
          <Route
            element={<EntriesPageStf />}
            path="/staff/courses/:courseName/:announcementTitle"
          ></Route>
        </Route>
        <Route element={<LoginPage />} path="/"></Route>
        <Route element={<LoginPage />} path="/login"></Route>
      </Routes>
    </Router>
  );
}

export default App;
