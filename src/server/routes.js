const express = require('express');
const router = express.Router();

router.get('/videos', (req, res) => {
 res.send(200, [
    {"name": "game", "url": "test"}
 ])
});

module.exports=router;