const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // Remove _id because Mongoose creates an _id field by default
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersdisLiked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  // find(): Returns an array containing all the sauces present in the database
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    // Like
    case 1:
      // updateOne(): Update the model with the new values of the specified fields
      Sauce.updateOne(
        { _id: req.params.id },
        {
          // $addToSet: Increment the userLiked array with the value of the designated element
          $addToSet: { usersLiked: req.body.userId },
          // $inc: Create the field and set the field to the specified value
          $inc: { likes: +1 },
        }
      )
        .then(() => res.status(200).json({ message: 'like !' }))
        .catch((error) => res.status(400).json({ error }));
      break;
    // Cancel like and dislike
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
            )
              .then(() =>
                res.status(200).json({ message: 'like / dislike canceled !' })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() =>
                res.status(200).json({ message: 'like / dislike canceled !' })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;
    // Dislike
    case -1:
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $addToSet: { usersDisliked: req.body.userId },
          $inc: { dislikes: +1 },
        }
      )
        .then(() => {
          res.status(200).json({ message: 'Dislike !' });
        })
        .catch((error) => res.status(400).json({ error }));
      break;
    default:
      console.log(error);
  }
};
