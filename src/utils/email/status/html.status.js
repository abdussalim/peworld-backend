const templateStatus = require("./template.status");

const htmlStatus = {
  successHtml: async (link, success, button) => {
    return templateStatus(link, success, button);
  },

  invalidTokenHtml: async (link, invalid, button) => {
    return templateStatus(link, invalid, button);
  },

  failedHtml: async (link, failed, button) => {
    return templateStatus(link, failed, button);
  },
};

module.exports = htmlStatus;
