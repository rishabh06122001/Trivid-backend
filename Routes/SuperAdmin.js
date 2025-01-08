const express = require("express");
const router = express.Router();

const {
  getDetailsSuper,
  updateDetailsSuper,
  updatePandit,
  getAdminList,
  updateAdmin,
} = require("../Controllers/SuperAdmin");
const { auth } = require("../middlewares/Auth");

router.get("/superadmin/details", auth, getDetailsSuper);
router.patch("/superadmin/details/update", auth, updateDetailsSuper);
router.get("/superadmin/get-admin-list", auth, getAdminList);

//update pandit details
router.patch("/superadmin/update/pandit/:id", auth, updatePandit);
router.patch("/superadmin/admin-update/:id", auth, updateAdmin);

module.exports = router;
