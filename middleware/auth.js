// Package allowing to create and verify an authentication token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Extract the token contained in the Authorization header
    // .split(): Bearer / Recover content after space
    const token = req.headers.authorization.split(' ')[1];
    // .verify(): Token decoding -> Will return an error if it is not valid
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
    // Extract the id contained in the token
    const userId = decodedToken.userId;
    req.auth = { userId };
    // Comparison of the user's id with that extracted from the token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable';
    } else {
      // Run authentication
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifié !' });
  }
};
