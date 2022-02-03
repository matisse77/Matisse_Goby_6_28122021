const Sauce = require('../../models/Sauce');

module.exports = (req, res, next) => {
  // find(): Returns an array containing all the sauces present in the database
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
