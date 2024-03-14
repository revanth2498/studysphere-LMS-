const router = require("express").Router();
const PermissionController = require("../Controllers/PermissionController");
const {
} = require("../Middlewares/InstructorIdentifierMiddleware");
router.post(
  "/changePermission",
  PermissionController.changePermission
);

router.post("/assignInstructorRole", PermissionController.assignInstructorRole);

module.exports = router;
