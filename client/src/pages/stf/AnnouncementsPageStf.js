import React, { useState } from "react";
import AnnouncementPost from "../../components/stf/announcement-post";
import AnnouncementsFilter from "../../components/stf/announcements-filter";
import AnnouncementsList from "../../components/stf/announcements-list";
import { Spin } from "antd";

function AnnouncementsPageStf() {
  const [filter, setFilter] = useState("ประกาศของฉัน");
  const [filterSort, setFilterSort] = useState("ประกาศล่าสุด");
  const [search, setSearch] = useState("");
  const [isSpin, setIsSpin] = useState(true);
  return (
    <Spin spinning={isSpin}>
      <AnnouncementPost />
      <AnnouncementsFilter
        filter={filter}
        setFilter={setFilter}
        filterSort={filterSort}
        setFilterSort={setFilterSort}
        setSearch={setSearch}
      />
      <AnnouncementsList
        filter={filter}
        filterSort={filterSort}
        search={search}
        setIsSpin={setIsSpin}
      />
    </Spin>
  );
}

export default AnnouncementsPageStf;
