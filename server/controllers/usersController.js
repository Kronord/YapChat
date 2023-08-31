const {
  getAll,
  addFriend,
  deleteFriend,
  getFriendsList,
} = require("../services/usersServices");
const { errorOrResponce } = require("../errors");

const getAllController = async (req, res, next) => {
  try {
    const users = await getAll();
    if (!users) {
      res
        .status(401)
        .json(
          errorOrResponce("401 Unauthorized", { message: "Not authorized" })
        );
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const addFriendController = async (req, res, next) => {
  try {
    const { user, body } = req;
    const request = await addFriend(user, body);
    if (!request) {
      res
        .status(400)
        .json(
          errorOrResponce("400 Bad request", {
            message: "You have this user in friend list!",
          })
        );
    }
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

const deleteFriendController = async (req, res, next) => {
  try {
    const { user, body } = req;
    const request = await deleteFriend(user, body);
    if (!request) {
      res
        .status(400)
        .json(
          errorOrResponce("400 Bad request", {
            message: "You don`t have this user in friend list!",
          })
        );
    }
    res.status(200).json(request);
  } catch (error) {}
};

module.exports = { getAllController, addFriendController, deleteFriendController };
