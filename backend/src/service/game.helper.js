const uuidv4 = require('uuid').v4;
const { body } = require('express-validator');


const GAME_STATUS = {
  STARTED: 'STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  INTERRUPTED: 'INTERRUPTED',
  FINISHED: 'FINISHED',
};

const key = (token) => (namespace) => `${namespace}_${token}`;

const getNewGameValue = (gameBoard) => ({
  id: uuidv4(),
  board: gameBoard.get(),
  status: GAME_STATUS.START,
  gameProps: gameBoard.getGameProps(),
});


const updateStatusGame = (gameBoard) => {
  const win = gameBoard.allTreasuresDiscovered();
  return ({
    board: gameBoard.get(),
    status: win ? GAME_STATUS.FINISHED : GAME_STATUS.IN_PROGRESS,
    win,
  });
};

const gameValidator = body('token')
  .not().isEmpty()
  .trim()
  .escape();

module.exports = {
  GAME_STATUS,
  key,
  getNewGameValue,
  updateStatusGame,
  gameValidator,
};
