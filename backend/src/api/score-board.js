const express = require('express');

const router = express.Router();

const prepareFormat = (scores) => scores.filter(({ score }) => !!score)
  // eslint-disable-next-line no-nested-ternary
  .sort((a, b) => (a.score > b.score
    ? 1
    : (
      a.score < b.score
        ? -1
        : 0
    )))
  .map(({ score, name: userName }, place) => ({ score, name: userName, place: place + 1 }))
  .slice(0, 10);

router.get('/', async (req, res) => {
  const scores = await req.scoreStore.get('scores') || [];

  res.json({
    scores: prepareFormat(scores),
  });
});


module.exports = router;
