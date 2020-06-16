const express = require('express');
const { NOT_FOUND, IM_A_TEAPOT, GONE } = require('http-status-codes');


const router = express.Router();
const GeneratePlayground = require('../service/generatePlayground');
const {
  key, GAME_STATUS, updateStatusGame, getNewGameValue, gameValidator,
} = require('../service/game.helper');

const gridSize = 5;

const CURRENT_GAME = 'CURRENT_GAME';


router.post('/', [gameValidator], async (req, res) => {
  const { token } = req.body;
  const name = await req.userStore.get(token);

  if (!name) {
    res.status(NOT_FOUND);
    return res.json({ error: 'This token does not exist!' });
  }

  const K = key(token);
  const currentGame = await req.gameStore.get(K(CURRENT_GAME));

  const gameBoard = new GeneratePlayground();
  const scores = await req.scoreStore.get('scores') || [];

  if (!currentGame
    || [GAME_STATUS.INTERRUPTED, GAME_STATUS.FINISHED]
      .includes(currentGame.status)) {
    gameBoard.generate();
    const value = getNewGameValue(gameBoard);
    await req.gameStore.set(K(CURRENT_GAME), value);
    await req.scoreStore
      .set('scores', [...scores, {
        token, name, score: 0, ...value,
      }]);
  } else {
    gameBoard.setGameProps(currentGame.getProps);
    gameBoard.set(currentGame.board);
  }


  res.json({
    name,
    token,
    gridSize,
    board: gameBoard.getRevealedFields(),
  });
});

router.post('/discover', [gameValidator], async (req, res) => {
  const { token, holes = [] } = req.body;
  const name = await req.userStore.get(token);

  if (!name) {
    res.status(NOT_FOUND);
    return res.json({ error: 'This token does not exist!' });
  }

  const K = key(token);
  const currentGame = await req.gameStore.get(K(CURRENT_GAME));


  if (!currentGame || !currentGame.board) {
    res.status(NOT_FOUND);
    return res.json({ error: 'This game does not exist!' });
  }

  if ([GAME_STATUS.INTERRUPTED, GAME_STATUS.FINISHED].includes(currentGame.status)) {
    res.status(GONE);
    return res.json({ error: 'The game has been interrupted or finished!' });
  }

  const gameBoard = new GeneratePlayground();
  gameBoard.set(currentGame.board);
  gameBoard.setGameProps(currentGame.gameProps);

  try {
    holes.forEach((hole) => gameBoard.digHole(hole));
  } catch (error) {
    res.status(IM_A_TEAPOT);
    return res.json({ error });
  }

  let scores = await req.scoreStore.get('scores') || [];
  const foundScore = scores.find(({ id }) => id === currentGame.id);
  const newStatusGame = updateStatusGame(gameBoard);
  const updatedScore = { ...newStatusGame, score: 0 };

  if (foundScore) {
    updatedScore.score = foundScore.score + 1;
    scores = scores.map((item) => (item.id === currentGame.id
      ? ({
        ...item,
        ...updatedScore,
      })
      : item));
    await req.scoreStore.set('scores', scores);
  }

  await req.gameStore.set(K(CURRENT_GAME), {
    ...currentGame,
    ...newStatusGame,
  });

  res.json({
    ...updatedScore,
    board: gameBoard.getRevealedFields(),
  });
});

module.exports = router;
