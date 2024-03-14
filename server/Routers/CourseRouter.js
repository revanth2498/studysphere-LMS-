const router = require("express").Router();
const CourseController = require("../Controllers/CourseController");
const {S3Client} = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require("dotenv");

router.post(
  "/addCourse",
  CourseController.addCourse
);

router.get(
  "/courses",
  CourseController.getCourses
);


router.delete(
  "/deleteCourse",
  CourseController.deleteCourse
);

router.put("/updateCourse", CourseController.updateCourse);

router.post("/makeAnnouncement", CourseController.makeAnnouncement);

router.get("/getAnnouncements", CourseController.getAnnouncements);

router.post("/createModule/:idcourse", CourseController.createModule);

router.post("/updateModule/:idmodule", CourseController.updateModule);

router.delete("/deleteModule/:idmodule", CourseController.deleteModule);


router.post("/createAssignment/:idcourse", CourseController.createAssignment);

router.post("/updateAssignment/:idassignment",CourseController.updateAssignment);

router.get("/getAssignments/:idcourse", CourseController.getAssignmentsByCourseId);

router.get("/getAssignmentsByUsername/:username", CourseController.getAssignmentsByUsername);

router.get("/getAnnouncementsByCourse/:idcourse", CourseController.getAnnouncementsByCourseId);

router.get("/getModulesByCourse/:idcourse", CourseController.getModulesByCourseId);

router.get("/getModulesByCourseFiles/:idcourse", CourseController.getModulesByCourseIWithFiles);

router.get("/getAssignmentsByCourseIWithFiles/:idcourse", CourseController.getAssignmentsByCourseIWithFiles);

router.get("/getAssignmentSubmissions/:idcourse", CourseController.getAssignmentsByCourseWithFilesAndSubmissions);

router.get("/getSubmissionsForAssignment/:assignmentid", CourseController.getAssignmentSubmissions);

router.post("/getCourseGrades/:idcourse", CourseController.getGradesOfSubmissionsByUser);


router.post("/assignGrade/:submissionid",CourseController.submitGrade);


dotenv.config();


const s3Client= new S3Client({
  region:process.env.AWS_REGION,
  credentials:{
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


console.log(s3Client)

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "_" + file.originalname);
    }
  })
});

const uploadAssignment = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME_Assignment,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "_" + file.originalname);
    }
  })
});

const uploadMultipleFiles = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME_Assignment,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "_" + file.originalname);
    }
  }),
  files: 2,
});



router.post("/createFileassignment/:idcourse", uploadAssignment.single('file'),CourseController.createAssignmentWithFile);


router.post("/uploadFileassignment/:idcourse", uploadMultipleFiles.array('files', 2),CourseController.uploadAssignmentbyuser);


router.post('/upload', upload.single('file'), CourseController.uploadFileTest);

router.post("/createFile/:idmodule", upload.single('file'),CourseController.uploadFileTestWithModule);

router.post("/createFilealongwithModule/:idcourse", upload.single('file'),CourseController.uploadFileTestWithCreateModule);



router.get("/delete/:announcementid",CourseController.deleteAnnouncement);

module.exports = router;

