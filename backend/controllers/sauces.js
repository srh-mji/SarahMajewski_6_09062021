// Get sauce model
const Sauce = require('../models/sauce');
// Get file system for image downloads and modifications
const fs = require('fs');

// Create new sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // remove automatically generated id
  delete sauceObject._id;
  // Create new instance of sauce 
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  // Save sauce in database
  sauce.save()
    .then(() => res.status(201).json({
      message: 'Sauce enregistrée !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};

// Modify sauce
exports.modifySauce = (req, res, next) => {
  let sauceObject = {};
  req.file ? (
    // // condition ? Instruction if true : Instruction if false
    Sauce.findOne({
      _id: req.params.id
    }).then((sauce) => {
      // delete old image 
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    }),
    sauceObject = {
      // add new image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  ) : (  
    // If modification doesn't contain a new image
    sauceObject = {
      ...req.body
    }
  )
  Sauce.updateOne({
      _id: req.params.id
    }, {
      ...sauceObject,
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Sauce modifiée !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};

// Delete one sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id
    })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: 'Sauce supprimée !'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};

// Get a single sauce, identified by id from the MongoDB database
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Get all the sauces from the MongoDB database
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

// "like" or "dislake" a sauce

exports.likeDislike = (req, res, next) => {
  // Like in body
  let like = req.body.like
  // Get userID
  let userId = req.body.userId
  // Get id sauce
  let sauceId = req.params.id

  if (like === 1) { // if like
    Sauce.updateOne(
      {
        _id: sauceId
      }, {
        // Push userliked and increments by 1 
        $push: {
          usersLiked: userId
        },
        $inc: {
          likes: +1
        },
      })
      .then(() => res.status(200).json({
        message: 'Like ajouté !'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  };

  if (like === -1) {
    Sauce.updateOne( // if dislike
        {
          _id: sauceId
        }, 
        // Push userdisliked and increments by 1 
        {
          $push: {
            usersDisliked: userId
          },
          $inc: {
            dislikes: +1
          }, 
        }
      )
      .then(() => {
        res.status(200).json({
          message: 'Dislike ajouté !'
        })
      })
      .catch((error) => res.status(400).json({
        error
      }))
  };

  if (like === 0) { // if cancel like or dislike
    Sauce.findOne({
        _id: sauceId
      })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { // cancel like
          Sauce.updateOne({
              _id: sauceId
            }, {
              // Pull userliked and increments by -1 
              $pull: {
                usersLiked: userId
              },
              $inc: {
                likes: -1
              }, 
            })
            .then(() => res.status(200).json({
              message: 'Like retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        };
        if (sauce.usersDisliked.includes(userId)) { // cancel dislike
          Sauce.updateOne({
              _id: sauceId
            }, {
              // Pull userdisliked and increments by -1 
              $pull: {
                usersDisliked: userId
              },
              $inc: {
                dislikes: -1
              }, 
            })
            .then(() => res.status(200).json({
              message: 'Dislike retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        };
      })
      .catch((error) => res.status(404).json({
        error
      }))
  }
}