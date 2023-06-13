const { User } = require("../../models");
const { comparePassword } = require("../../helpers/encryption");
const { signToken } = require("../../helpers/signature");
const createLogs = require("../../logs/saveLogsData");

class userApiController {
  static async createNewUser(req, res, next) {
    try {
      const { username, password, confirmPassword, age } = req.body;

      if (password !== confirmPassword) {
        throw { name: "Passwords do not match" };
      }

      const newUser = await User.create({ username, password, age });

      const data = {
        action: 'api/register',
        description:`New user with id ${newUser.id} created`,
        createdAt: newUser.createdAt,
      }

      createLogs(data)

      res.status(201).json({
        statusCode: 201,
        data: {
          id: newUser.id,
          email: newUser.username,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw { name: "Username and password are required" };
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
        throw {
          name: "InvalidCredentials",
        };
      }

      const isPasswordValid = comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw {
          name: "InvalidCredentials",
        };
      }

      const accessToken = signToken({
        id: user.id,
      });

      const data = {
        action: 'api/login',
        description:`User with id ${user.id} login into app`,
        createdAt: new Date(),
      }

      createLogs(data)

      res.status(200).json({
        statusCode: 200,
        data: {
          username: user.username,
          access_token: accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      const data = {
        action: 'api/users',
        description:`User view user data`,
        createdAt: new Date(),
      }

      createLogs(data)

      res.status(200).json({
        statusCode: 200,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userApiController;
