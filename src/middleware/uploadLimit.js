const { failed } = require("../utils/createResponse");

module.exports = (req, res, next) => {
  try {
    if (req.files) {
      if (req.files.photo) {
        if (req.files.photo[0].size > 2000000) {
          failed(res, {
            code: 400,
            payload: "File photo too large, max 2mb",
            message: "Upload File Error",
          });
          return;
        }
      }
    }

    next();
  } catch (error) {
    failed(res, {
      code: 500,
      payload: error.message,
      message: "Internal Server Error",
    });
  }
};
