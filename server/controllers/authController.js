const { login, registration, logout } = require("../services/authServices");

const signUpController = async (req, res, next) => {
  try {
    const request = await registration(req.body);
    if (request === null) {
      res.status(409).json("Email in use");
    }
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

const signInController = async (req, res, next) => {
  try {
    const request = await login(req.body);
    if (request === null) {
      res.status(401).json("Email or password is wrong");
    }
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user._id);
    res.sendStatus(204)
  } catch (error) {
    next(error);
  }
}

module.exports = {signUpController, signInController, logoutController};
