class UserController {
  static createNewUser(req, res, next) {
    try {
      console.log(req.body);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
