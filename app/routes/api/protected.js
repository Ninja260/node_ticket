const express = require('express');
const router = express.Router();
const ticketRouter = require('./module/ticket');
const userRouter = require('./module/user');
const authMiddleware = require('./middleware/authMiddleware');

router.use(authMiddleware);
router.use('/ticket', ticketRouter);
router.use('/user', userRouter);

module.exports= router;
