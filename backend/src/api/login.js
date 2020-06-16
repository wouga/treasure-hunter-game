const express = require('express');
const { CONFLICT } = require('http-status-codes');
const { body } = require('express-validator');
const uuidv4 = require('uuid').v4;

const router = express.Router();

const loginValidator = body('name')
  .not().isEmpty()
  .trim()
  .escape();

router.post('/', [loginValidator], async (req, res) => {
  const token = uuidv4();
  const { name } = req.body;
  const users = await req.userStore.get('users') || [];

  if (users.includes(name)) {
    res.status(CONFLICT);
    return res.json({ error: 'The username already exists. Please use a different username' });
  }

  await req.userStore.set('users', [...users, name]);
  await req.userStore.set(token, name);

  return res.json({ token });
});

module.exports = router;
