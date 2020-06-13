const express = require('express');

const login = require('./login');
const game = require('./game');

const router = express.Router();

router.use('/login', login);
router.use('/game', game);

module.exports = router;
