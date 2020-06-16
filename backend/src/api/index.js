const express = require('express');

const login = require('./login');
const game = require('./game');
const scoreBoard = require('./score-board');

const router = express.Router();

router.use('/login', login);
router.use('/game', game);
router.use('/board', scoreBoard);

module.exports = router;
