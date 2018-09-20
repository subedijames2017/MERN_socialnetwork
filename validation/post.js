const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.name = "Text field is required";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.name = "The tex must be greater then 10 character";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
