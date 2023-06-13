const { User } = require("../models");

class UserController {
  static async createNewUser(req, res, next) {
    try {
      const { username, password, confirmPassword, age } = req.body;

      if (password !== confirmPassword) {
        throw { name: "Passwords do not match" };
      }

      const newUser = await User.create({ username, password, age });

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
}

module.exports = UserController;
