const express = require("express");
var router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "post test pass" }));

module.exports = router;
