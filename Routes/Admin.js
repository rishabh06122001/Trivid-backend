const express = require("express");
const router = express.Router();

const {
  getDetailsAdmin,
  updateDetailsAdmin,
  getAdminList,
} = require("../Controllers/Admin");
const { auth } = require("../middlewares/Auth");

router.get("/admin/details", auth, getDetailsAdmin);
router.patch("/admin/details/update", auth, updateDetailsAdmin);
router.get("/admin/get-admin-list", auth, getAdminList);
module.exports = router;
