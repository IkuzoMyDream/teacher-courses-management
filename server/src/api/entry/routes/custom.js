"use strict";

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/entries/:id/ackCheck",
      handler: "entry.ackCheck",
    },
  ],
};
