const { User } = require("../modules/userModule");

const getAll = async () => {
  const allUsers = await User.find({});
  return allUsers;
};

// Logic for work with users friend list
const getFriendsList = async (id) => {
  const user = await User.findById(id);
  return user.friends;
};

const addFriend = async (currentUser, data) => {
  const { _id, friends } = currentUser;
  for (const friend of friends) {
    if (friend._id === data._id) {
      return null;
    }
  }
  friends.push(data);
  await User.findByIdAndUpdate(_id, { friends });
  return friends;
};

const deleteFriend = async (currentUser, data) => {
  const { _id, friends } = currentUser;
  for (const friend of friends) {
    if (friend._id === data._id) {
      friends.splice(friends.indexOf(friend));
      await User.findByIdAndUpdate(_id, { friends });
      return "Friend delete";
    };
  };
  return null;
};

module.exports = { getAll, addFriend, deleteFriend, getFriendsList };
