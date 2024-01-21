import React, { useState } from "react";
import AnnouncementPost from "../../components/stf/announcement-post";
import AnnouncementFilter from "../../components/stf/announcement-filter";
import AnnouncementsList from "../../components/stf/announcements-list";

function AnnouncementsPageStf() {
  const [filter, setFilter] = useState("ประกาศของฉัน");
  const [filterSort, setFilterSort] = useState("ประกาศล่าสุด");

  return (
    <>
      <AnnouncementPost />
      <AnnouncementFilter
        filter={filter}
        setFilter={setFilter}
        filterSort={filterSort}
        setFilterSort={setFilterSort}
      />
      <AnnouncementsList filter={filter} filterSort={filterSort} />
    </>
  );
}

export default AnnouncementsPageStf;
