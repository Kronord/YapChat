const { User } = require("../modules/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const registration = async ({ email, phone, name, surname, password }) => {
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return null
  };

  const user = new User({
    email,
    phone,
    name,
    surname,
    password,
  });

  await user.save();
  return {
    email: user.email,
    phone: user.phone,
    name: user.name,
    surname: user.surname,
  }
};

const login = async ({email, password}) => {
    const user = await User.findOne({email});
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    };

    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    await User.findByIdAndUpdate(user._id, {token});
    return token;
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, {token: null});
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = payload;
    const user = await User.findById(_id);

    return user.token !== token ? null : user;
  } catch (e) {
    return null;
  }
};

module.exports = {
    registration,
    login,
    logout,
    authenticateUser,
}