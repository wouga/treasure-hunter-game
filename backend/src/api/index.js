const express = require('express');

const login = require('./login');
const game = require('./game');

const router = express.Router();

// router.get('/', async(req, res) => {
//     const value = req.query.value;
//     const storedValue = await req.store.get("value");
//     res.json({
//         message: `value: ${value}`,
//         storedMSG: `value: ${storedValue}`,
//     });
//     await req.store.set("value", value, 5000);
// });

router.use('/login', login);
router.use('/game', game);

module.exports = router;