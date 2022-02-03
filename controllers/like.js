const Sauce = require('../models/Sauce');

module.exports = (req, res, next) => {
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
