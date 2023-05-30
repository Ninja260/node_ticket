const express = require('express');
const router = express.Router();
const userConroller = require('../../../controllers/user');

router.get('/info', userConroller.get);

module.exports = router;