const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
    const messages = {};
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
  
    if (!Validator.isEmail(data.email)) {
      messages[0] = "Email is invalid";
    }
  
    if (Validator.isEmpty(data.email)) {
      messages[1] = "Email field is required";
    }
  
    if (Validator.isEmpty(data.password)) {
      messages[2] = "Password field is required";
    }

    if (Object.keys(messages).length > 0) {
      throw {
        message: messages,
        isValid: false
      }
    }
  
    return {
      message: "",
      isValid: true
    };
};