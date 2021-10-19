const express = require('express');
const router = express.Router();

const ctrlPhone = require('../controllers/phone');

router.get('/phones', ctrlPhone.getPhones);
router.post('/phones', ctrlPhone.createPhone);
router.get('/phones/:phoneId', ctrlPhone.getSinglePhone);
router.put('/phones/:phoneId', ctrlPhone.updatePhone);
router.delete('/phones/:phoneId', ctrlPhone.deletePhone);

module.exports = router;
