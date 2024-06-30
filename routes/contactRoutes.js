const express = require("express");
const router = express.Router();
const {
  getContacts,
  deleteContact,
  updateContact,
  createContact,
  getContact,
} = require("../controllers/contacController");
const validation = require("../midileware/validateTokenHandler");

router.use(validation);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);

module.exports = router;
