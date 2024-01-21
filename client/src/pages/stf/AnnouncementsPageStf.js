import React, { useState } from "react";
import AnnouncementPost from "../../components/stf/announcement-post";
import AnnouncementsFilter from "../../components/stf/announcements-filter";
import AnnouncementsList from "../../components/stf/announcements-list";

function AnnouncementsPageStf() {
  const [filter, setFilter] = useState("ประกาศของฉัน");
  const [filterSort, setFilterSort] = useState("ประกาศล่าสุด");
  const [search, setSearch] = useState("");

  return (
    <>
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
      />
    </>
  );
}

export default AnnouncementsPageStf;
