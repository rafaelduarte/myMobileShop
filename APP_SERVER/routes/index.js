const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlAbout = require('../controllers/about');
const ctrlPhone = require('../controllers/phone');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/about', ctrlAbout.about);
router.get('/list', ctrlPhone.phoneList);
router.get('/phone/:phoneId', ctrlPhone.phoneInfo);
router.route('/new')
  .get(ctrlPhone.addNewPhone)
  .post(ctrlPhone.doAddNewPhone);

module.exports = router;
