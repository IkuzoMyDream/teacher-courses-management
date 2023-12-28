"use strict";

/**
 * entry controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::entry.entry", ({ strapi }) => ({
  async ackCheck(ctx) {
    const entityId = ctx.params.id;
    try {
      let ack = await strapi.entityService.findOne(
        "api::entry.entry",
        entityId
      );
      ack = await strapi.entityService.update("api::entry.entry", entityId, {
        data: {
          ack_datetime: new Date().toISOString(),
        },
      });

      ctx.body = {
        ok: 1,
        ack: ack.ack_datetime,
      };
    } catch (err) {
      ctx.body = err;
    }
  },
}));
