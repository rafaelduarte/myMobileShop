const mongoose = require('mongoose');
const Phone = mongoose.model('Phone');

const getPhones = function (req, res) {
  Phone
    .find()
    .exec(function (err, phoneData) {
      if (err) {
        res
          .status(404)
          .json(err);
        return;
      }
      res
        .status(200)
        .json(phoneData);
    });
};

const createPhone = function (req, res) {
  Phone
    .create({
      name : req.body.name,
      brand : req.body.brand,
      price : req.body.price,
      description : req.body.description,
      specs : {
        cpu : req.body.cpu,
        ramSize : req.body.ramSize,
        storage : req.body.storage,
      },
      rating : req.body.rating,
      available : req.body.available,
      image : req.body.image,
    }, (err, phoneData) => {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        res
          .status(201)
          .json(phoneData);
      }
    });
};

const getSinglePhone = function (req, res) {
  Phone
    .findById(req.params.phoneId)
    .exec((err, phoneData) =>{
      if (!phoneData) {
        return res
          .status(404)
          .json({
            'message' : 'Phone not found.'
          });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      }
      res
        .status(201)
        .json(phoneData);
    });
};

const updatePhone = function (req, res) {
  if (!req.params.phoneId) {
    res
      .status(404)
      .json({
        'message' : 'phoneId is required to update.'
      });
    return;
  }
  Phone
    .findById(req.params.phoneId)
    .exec((err, phoneData) => {
      if (!phoneData) {
        res
          .status(404)
          .json({
            'message' : 'Phone not found.'
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      phoneData.name = req.body.name;
      phoneData.brand = req.body.brand;
      phoneData.price = req.body.price;
      phoneData.description = req.body.description;
      phoneData.specs = {
        cpu : req.body.cpu,
        ramSize : req.body.ramSize,
        storage : req.body.storage,
      };
      phoneData.rating = req.body.rating;
      phoneData.available = req.body.available;
      phoneData.image = req.body.image;
      phoneData.save((err, phoneData) => {
        if (err) {
          res
            .status(404)
            .json(err);
          return;
        } else {
          res
            .status(200)
            .json(phoneData);
        }
      });
    });
};

const deletePhone = function (req, res) {
  const phoneId = req.params.phoneId;
  if (phoneId) {
    Phone
      .findByIdAndDelete(phoneId)
      .exec((err, phoneData) => {
        if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        res
          .status(204)
          .json(null);
      });
  } else {
    res
      .status(404)
      .json({
        'message' : 'Phone not found.'
      });
  }
};

module.exports = {
  getPhones,
  createPhone,
  getSinglePhone,
  updatePhone,
  deletePhone
};
