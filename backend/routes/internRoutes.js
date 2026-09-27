const express = require("express");
const router = express.Router();
const {
  getInterns,
  getInternById,
  createIntern,
  updateIntern,
  deleteIntern,
} = require("../controllers/internController");

router.get("/", getInterns);
router.get("/:id", getInternById);
router.post("/", createIntern);
router.put("/:id", updateIntern);
router.delete("/:id", deleteIntern);

module.exports = router;
