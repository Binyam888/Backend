const express = require("express");
const { register, login, current } = require("../controllers/userController");
const validation = require("../midileware/validateTokenHandler");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current",validation, current);

module.exports = router;
