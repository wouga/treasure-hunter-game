const express = require('express');
const uuidv4 = require('uuid').v4;
const { NOT_FOUND, IM_A_TEAPOT, GONE } = require('http-status-codes');


const router = express.Router();
const GeneratePlayground = require('../service/generatePlayground');

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

const updateScore = (gameBoard) => {
  const win = gameBoard.allTreasuresDiscovered();
  return ({
    score: 0,
    board: gameBoard.get(),
    status: win ? GAME_STATUS.FINISHED : GAME_STATUS.IN_PROGRESS,
    win,
  });
};

const gridSize = 5;

const CURRENT_GAME = 'CURRENT_GAME';


router.post('/', async (req, res) => {
  const { token } = req.body;
  const name = await req.userStore.get(token);

  if (!name) {
    res.status(NOT_FOUND);
    res.json({ error: 'This token does not exist!' });
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
    await req.scoreStore.set('scores', [...scores, {
      token,
      name,
      score: 0,
      ...value,
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


router.post('/discover', async (req, res) => {
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

  const win = gameBoard.allTreasuresDiscovered();

  let scores = await req.scoreStore.get('scores') || [];
  const foundScore = scores.find(({ id }) => id === currentGame.id);
  console.log({ foundScore, currentGame });
  const updatedScore = updateScore(gameBoard);

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
    board: gameBoard.get(),
    status: win ? GAME_STATUS.FINISHED : GAME_STATUS.IN_PROGRESS,
  });

  res.json({
    win,
    score: updatedScore.score,
    scores: scores
      .filter(({ score }) => !!score)
      // eslint-disable-next-line no-nested-ternary
      .sort((a, b) => (a.score > b.score ? 1 : (a.score < b.score ? -1 : 0)))
      .map(({ score, name: userName }, place) => ({ score, name: userName, place: place + 1 })),
    board: gameBoard.getRevealedFields(),
  });
});

module.exports = router;
