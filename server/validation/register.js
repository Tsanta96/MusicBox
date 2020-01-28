const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    const messages = {};
    data.name = validText(data.name) ? data.name : "";
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
    // data.password2 = validText(data.password2) ? data.password2 : "";

    if (Validator.isEmpty(data.name)) {
      messages[0] = "Name cannot be blank";
    }
  
    if (!Validator.isEmail(data.email)) {
      messages[1] = "Email is invalid";
    }
  
    if (Validator.isEmpty(data.email)) {
      messages[2] = "Email field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 16 })) {
        messages[3] = "Password must be between 8 and 16 characters";
    }

    if (Object.keys(messages).length > 0 ) {
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