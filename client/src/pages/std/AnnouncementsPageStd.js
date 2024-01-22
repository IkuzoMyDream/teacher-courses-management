import AnnouncementsList from "../../components/std/announcements-list";
import { useState } from "react";
import { DataProvider } from "../../utils/std-context";
import StudentNavbar from "../../components/std/student-navbar";
import { Spin } from "antd";
import AnnouncementsFilter from "../../components/std/announcements-filter";

function AnnouncementsPageStd() {
  const [filterSort, setFilterSort] = useState("ประกาศล่าสุด");
  const [search, setSearch] = useState("");
  const [isSpin, setIsSpin] = useState(true);
  return (
    <Spin spinning={isSpin}>
      <AnnouncementsFilter
        filterSort={filterSort}
        setFilterSort={setFilterSort}
        setSearch={setSearch}
      ></AnnouncementsFilter>
      <AnnouncementsList
        filterSort={filterSort}
        search={search}
        setIsSpin={setIsSpin}
      ></AnnouncementsList>
    </Spin>
  );
}

export default AnnouncementsPageStd;
