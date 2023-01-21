const projectModel = require("../models/project.model");
const { success, failed } = require("../utils/createResponse");
const {
  deleteGoogleDrive,
  uploadGoogleDriveProjectThumbnails,
} = require("../utils/googleDrive");

module.exports = {
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await projectModel.findBy("id", id);

      // jika project tidak ditemukan
      if (!project.rowCount) {
        failed(res, {
          code: 404,
          payload: `Project with Id ${id} not found`,
          message: "Delete Project Failed",
        });
        return;
      }

      await deleteGoogleDrive(project.rows[0].photo);
      await projectModel.removeById(id);

      success(res, {
        code: 200,
        payload: null,
        message: "Delete Project Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  updatePhotoProject: async (req, res) => {
    try {
      const { id } = req.params;

      const project = await projectModel.findBy("user_id", id);
      // jika project ditemukan
      if (project.rowCount) {
        let { photo } = project.rows[0];
        if (req.files) {
          if (req.files.photo) {
            // menghapus photo lama
            if (project.rows[0].photo) {
              await deleteGoogleDrive(project.rows[0].photo);
            }
            // mendapatkan name photo baru
            photo = await uploadGoogleDriveProjectThumbnails(
              req.files.photo[0]
            );
          }
        }
        await projectModel.changePhotoProject(project.rows[0].id, photo.id);

        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: "Update User Photo Failed",
        });
        return;
      }

      success(res, {
        code: 200,
        payload: null,
        message: "Update Project Photo Success",
      });
    } catch (error) {
      console.log(error);
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
