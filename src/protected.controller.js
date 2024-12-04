// protected.controller.js
const express = require('express');
const router = express.Router();

router.get('/secret', (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
