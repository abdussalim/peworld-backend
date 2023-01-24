const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const authModel = require("../models/auth.model");
const userModel = require("../models/user.model");
const jwtToken = require("../utils/generateToken");
const workerModel = require("../models/worker.model");
const sendEmail = require("../utils/email/send.email");
const recruiterModel = require("../models/recruiter.model");
const { success, failed } = require("../utils/createResponse");
const activateAccountEmail = require("../utils/email/activate.account.email");
const resetAccountPassword = require("../utils/email/reset.account.password");
const { APP_NAME, EMAIL_FROM, API_URL, CLIENT_URL } = require("../utils/env");
const htmlStatus = require("../utils/email/status/html.status");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userModel.findBy("email", req.body.email);
      if (user.rowCount) {
        failed(res, {
          code: 409,
          payload: "Email already exist",
          message: "Register Failed",
        });
        return;
      }

      const { name, email, phone, address, role, is_verified } = req.body;
      const password = await bcrypt.hash(req.body.password, 10);
      const token = crypto.randomBytes(30).toString("hex");

      const insertData = await authModel.register({
        id: uuidv4(),
        name,
        email,
        phone,
        address,
        password,
        role,
        is_verified,
        createdAt: new Date(),
      });

      if (role === "recruiter") {
        await recruiterModel.addRecruiter({
          id: uuidv4(),
          userId: insertData.rows[0].id,
        });
      } else {
        await workerModel.addWorker({
          id: uuidv4(),
          userId: insertData.rows[0].id,
        });
      }
      await authModel.updateToken(insertData.rows[0].id, token);

      // send email for activate account
      const templateEmail = {
        from: `"${APP_NAME}" <${EMAIL_FROM}>`,
        to: req.body.email.toLowerCase(),
        subject: "Activate Your Account!",
        html: activateAccountEmail(name, `${API_URL}/auth/activation/${token}`),
      };
      sendEmail(templateEmail);

      success(res, {
        code: 201,
        payload: null,
        message: "Register Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  activation: async (req, res) => {
    try {
      const { token } = req.params;
      const user = await userModel.findBy("user_token", token);

      if (!user.rowCount) {
        let invalidTokenHtml = await htmlStatus.invalidTokenHtml(
          `${CLIENT_URL}`,
          `Your token is  <span style="color: red; font-weight: bold;">Invalid</span>, Please contact us for additional information!`,
          "Go to Website"
        );
        res.send(invalidTokenHtml);
        return;
      }
      await authModel.activateEmail(user.rows[0].id, true);
      await authModel.updateToken(user.rows[0].id, "verified");

      let successHtml = await htmlStatus.successHtml(
        `${CLIENT_URL}/auth/login`,
        `Your account is <span style="color: red; font-weight: bold;">Verified</span>, Please login with click button below!`,
        "Go to Login"
      );
      res.send(successHtml);
      return;
    } catch (error) {
      let failedHtml = await htmlStatus.failedHtml(
        `${CLIENT_URL}`,
        `<span style="color: red; font-weight: bold;">${error.message}</span>, Please contact us for additional information!`,
        "Go to Website"
      );
      res.send(failedHtml);
      return;
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findBy("email", email);

      // jika user ditemukan
      if (user.rowCount > 0) {
        if (user.rows[0].is_verified === true) {
          const match = await bcrypt.compare(password, user.rows[0].password);
          // jika password benar
          if (match) {
            const jwt = await jwtToken({
              id: user.rows[0].id,
              role: user.rows[0].role,
            });
            success(res, {
              code: 200,
              payload: null,
              message: "Login Success",
              token: {
                jwt,
                id: user.rows[0].id,
                role: user.rows[0].role,
              },
            });
          }
        } else {
          failed(res, {
            code: 403,
            payload: "Please Activate Your Account First",
            message: "Login Failed",
          });
        }
        return;
      }

      failed(res, {
        code: 401,
        payload: "Wrong Email or Password",
        message: "Login Failed",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  forgot: async (req, res) => {
    try {
      const user = await userModel.findBy("email", req.body.email);
      if (user.rowCount) {
        const token = crypto.randomBytes(30).toString("hex");
        // update email token
        await authModel.updateToken(user.rows[0].id, token);

        // send email for reset password
        const templateEmail = {
          from: `"${APP_NAME}" <${EMAIL_FROM}>`,
          to: req.body.email.toLowerCase(),
          subject: "Reset Your Password!",
          html: resetAccountPassword(
            user.rows[0].name,
            `${CLIENT_URL}/auth/reset/${token}`
          ),
        };
        sendEmail(templateEmail);
      }

      success(res, {
        code: 200,
        payload: null,
        message: "Forgot Password Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  reset: async (req, res) => {
    try {
      const { token } = req.params;
      const user = await userModel.findBy("user_token", token);

      if (!user.rowCount) {
        failed(res, {
          code: 401,
          payload: "Token invalid",
          message: "Reset Password Failed",
        });
        return;
      }

      const password = await bcrypt.hash(req.body.password, 10);
      await authModel.resetPassword(user.rows[0].id, password);
      await authModel.updateToken(user.rows[0].id, "");

      success(res, {
        code: 200,
        payload: null,
        message: "Reset Password Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
