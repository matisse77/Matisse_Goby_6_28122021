const passwordValidator = require('password-validator');

// Create a schema
const pwdSchema = new passwordValidator();

// Add properties to it
pwdSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(26) // Maximum length 26
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = pwdSchema;
