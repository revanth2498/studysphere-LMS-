const router = require("express").Router();
const RequestController = require("../Controllers/RequestController");
router.post(
  "/approve/:reqid",
  RequestController.approveRequest
);

router.get(
  "/allRequests",
  RequestController.getActiveRequests
);


router.get(
  "/coursesInstructor/:instructorId",
  RequestController.getRequestsByInstructor
);


router.get(
  "/coursesInstructordeny/:instructorId",
  RequestController.getRequestsByInstructorDenied
);

router.post(
    "/delete",
    RequestController.deleteRequest
  );

router.post("/enrollStudents",RequestController.enrollStudents);

router.get("/enrolled",RequestController.displayEnrolledStudentCourses);


router.post(
  "/deny/:reqid",
  RequestController.denyRequest
);


router.get(
  "/coursesenrolled/:username",
  RequestController.displayEnrolledStudentCoursesByUsername
);


router.get(
  "/announcementsbycourse/:username",
  RequestController.displayEnrolledStudentAnnouncementsByUsername
);

router.get(
  "/userByCourse/:courseid",
  RequestController.userByCourse
);


module.exports = router;
