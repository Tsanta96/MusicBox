const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const keys = require("../../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
    try {
      const { message, isValid } = validateRegisterInput(data);
  
      if (!isValid) {
        throw new Error(JSON.stringify(message));
      }
      const { name, email, password } = data;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User(
        {
          name,
          email,
          password: hashedPassword
        },
        err => {
          if (err) throw err;
        }
      );
  
      user.save();
      // we'll create a token for the user
      const token = jwt.sign({ id: user._id }, keys.secretOrKey);
  
      // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
      return { token, loggedIn: true, ...user._doc, password: null };
    } catch (err) {
        throw err.message;
    }
  };

const logout = async data => {
    try {
      const { _id } = data;
  
      const loggedInUser = await User.findById(_id);
  
      if (!loggedInUser) {
        throw new Error("This user does not exist");
      }

      const token = "";
  
      return { token, loggedIn: false, ...loggedInUser._doc, password: null };
    } catch (err) {
      throw err;
    }
};

const login = async data => {
    try {
      const { message, isValid } = validateLoginInput(data);
  
      if (!isValid) {
        throw new Error(JSON.stringify(message));
      }
  
      const { email, password } = data;
  
      const user = await User.findOne({ email });
      if (!user) throw new Error("This user does not exist");
  
      const isValidPassword = await bcrypt.compareSync(password, user.password);
      if (!isValidPassword) throw new Error("Invalid password");
  
      const token = jwt.sign({ id: user.id }, keys.secretOrKey);

      return { token, loggedIn: true, ...user._doc, password: null };
    } catch (err) {
      throw err.message;
    }
};

const verifyUser = async data => {
    try {
      // we take in the token from our mutation
      const { token } = data;
      // we decode the token using our secret password to get the
      // user's id
      const decoded = jwt.verify(token, process.env.secretOrKey);
      const { id } = decoded;
  
      // then we try to use the User with the id we just decoded
      // making sure we await the response
      const fullUser = await User.findById(id).then(user => {
        return user;
      });

      const loggedIn = fullUser ? true : false;
      return { loggedIn, _id: id, name: fullUser.name, email: fullUser.email };
    } catch (err) {
      return { loggedIn: false };
    }
};

module.exports = { register, logout, login, verifyUser };