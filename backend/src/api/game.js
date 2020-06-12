const express = require('express');
const { NOT_FOUND } = require('http-status-codes');
const uuidv4 = require('uuid').v4;

const router = express.Router();

// router.get('/', async(req, res) => {
//     const token = uuidv4();
//     const { name } = req.query;
//     const users = await req.store.get("users") || [];
//     await req.store.set("users", [...users, name]);
//     await req.store.set(token, name);

//     res.json({ token });
// });

const gridSize = 5;

const CURRENT_GAME = "CURRENT_GAME";

router.get('/', async(req, res) => {
    const { token } = req.query;
    const user = await req.userStore.get(token);

    if (!user) {
        res.status(NOT_FOUND);
        res.json({ error: "This token does not exist!" })
    }

    const K = key(token);
    const currentGame = await req.gameStore.get(K(CURRENT_GAME));

    const response = {
        gridSize,
        playground: [],
    }

    if (!currentGame) {

    }




    await req.store.set("users", [...users, name]);
    await req.store.set(token, name);

    res.json({ token });
});

const key = (token) => (namespace) => `${namespace}_${token}`;



module.exports = router;