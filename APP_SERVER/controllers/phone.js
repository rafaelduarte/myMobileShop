const request = require('request');

const _renderPhoneList = function (req, res, responseBody) {
  res.render('list-display', {
    title : 'Mobile Phones List',
    phones : responseBody,
  });
};

const phoneList = function (req, res) {
  const path = 'http://localhost:3000/api/phones';
  const requestOptions = {
    url : path,
    method : 'GET',
    json : {},
  };
  request(requestOptions, (err, response, body) => {
    _renderPhoneList(req, res, body);
  });
};

const currencyFormatted = function (amount) {
  var i = parseFloat(amount);
  if (isNaN(i)) {
    i = 0.0;
  }
  var minus = '';
  if (i < 0) {
    minus = '-';
  }
  i = Math.abs(i);
  i = parseInt((i + 0.005) * 100);
  i = i / 100;
  s = '' + i;
  if (s.indexOf('.') < 0) {
    s += '.00';
  }
  if (s.indexOf('.') == s.length - 2) {
    s += '0';
  }
  s = minus + s;
  return s;
};

const _renderDetailPage = function (req, res, responseBody) {
  responseBody.price = '$ ' + currencyFormatted(responseBody.price);
  responseBody.available = responseBody.available ? 'Yes' : 'No';
  res.render('phone-info', {
    title : 'Phone Details',
    currentPhone : responseBody,
  });
};

const phoneInfo = function (req, res) {
  const path = `http://localhost:3000/api/phones/${req.params.phoneId}`;
  const requestOptions = {
    url : path,
    method : 'GET',
    json : {},
  };
  request(requestOptions, (err, response, body) => {
    _renderDetailPage(req, res, body);
  });
};

const _renderCreatePage = function (req, res) {
  res.render('create-new-phone', {
    title: 'New Phone'
  });
};

const addNewPhone = function (req, res) {
  _renderCreatePage(req, res);
};

const doAddNewPhone = function (req, res) {
  const path = 'http://localhost:3000/api/phones/';
  const postdata = {
    name : req.body.name,
    brand : req.body.brand,
    price : req.body.price,
    description : req.body.description,
    cpu : req.body.cpu,
    ramSize : req.body.ramSize,
    storage : req.body.storage,
    rating : req.body.rating,
    available : req.body.available,
    image : req.body.image,
  };
  const requestOptions = {
    url: path,
    method: 'POST',
    json: postdata,
  };
  request(requestOptions, (err, response, body) => {
    if (response.statusCode === 201) {
      res.redirect('/list');
    } else {
      console.log('Error in doAddNewPhone method => err:', err);
      console.log('Error in doAddNewPhone method => body:', body);
    }
  });
};

module.exports = {
  phoneList,
  phoneInfo,
  addNewPhone,
  doAddNewPhone,
};
