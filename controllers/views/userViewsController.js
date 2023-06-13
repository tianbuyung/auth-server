const { User } = require("../../models");
const { comparePassword } = require("../../helpers/encryption");
const { signToken } = require("../../helpers/signature");
const createLogs = require("../../logs/saveLogsData");

class UserViewsController {
  static getHomePage(req, res) {
    res.redirect('/register');
  }

  static getRegisterPage(req, res) {
    const { errors } = req.query;
    let errorsMessage = '';
    
    if (errors) {
      errorsMessage = JSON.parse(errors);
    }

    res.render("register", {title: "Register", errors: errorsMessage});
  }

  static async createNewUser(req, res) {
    try {
      const { username, password, confirmPassword, age } = req.body;

      if (password !== confirmPassword) {
        throw { name: "Passwords do not match" };
      }

      const newUser = await User.create({ username, password, age });

      const data = {
        action: 'Register',
        description:`New user with id ${newUser.id} created`,
        createdAt: newUser.createdAt,
      }

      createLogs(data)

      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        const errors = error.errors.map(error => error.message);
        res.redirect(`/register?errors=${JSON.stringify(errors)}`);
      } else {
        res.redirect(`/register?errors=${JSON.stringify(error.name)}`);
      }
    }
  }

  static getLoginPage(req, res) {
    const { errors } = req.query;
    let errorsMessage = '';
    
    if (errors) {
      errorsMessage = JSON.parse(errors);
    }

    res.render("login", {title: "Login", errors: errorsMessage});
  }

  static async loginUser(req, res) {
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

      res.redirect("/users");
    } catch (error) {
      res.redirect(`/login?errors=${JSON.stringify(error.name)}`);
    }
  }

  static async getUsersPage(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      res.render("users", { title: "Users", users });
    } catch (error) {
      res.render('errorsHandler', { error });
    }
  }
}

module.exports = UserViewsController;
