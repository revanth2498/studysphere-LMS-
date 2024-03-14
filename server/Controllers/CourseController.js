const Response = require("../Services/ResponseService");
const CourseService = require("../Services/CourseService");
var Course = require("../Models/Course");
var Request = require("../Models/Request");
var Temporary = require("../Models/DummyCourse");
var Announcement=require("../Models/Announcement")
var Module=require("../Models/moduleSchema");
var Assignment=require("../Models/assignmentSchema");
var Enroll=require('../Models/Enrollments')
var Document=require('../Models/Document')
var Submission=require('../Models/SubmissionSchema')
const mongoose=require('mongoose')
const File=require('../Models/File');
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");



const multer = require('multer');
const { config } = require("dotenv");

const upload = multer({ dest: 'uploads/' });



const addCourse = async (req, res) => {
  console.log("hi");
  const coursePayload = req.body;
  const courseExists = await Course.findOne({
    code: coursePayload.code,
    instructorId: coursePayload.instructorId,
  });
  console.log(courseExists);
  if (courseExists) {
    res.status(401).send({ message: "Course already exists" });
    return;
  }
  const course = await new Course(coursePayload);
  const request = await new Request({
    courseCode: coursePayload.code,
    requestType: "Creation",
    instructorId: coursePayload.instructorId,
    courseName: coursePayload.name,
  });
  try {
    await course.save(course);
    res
      .status(200)
      .send({ message: "Course created and pending for approval" });
    await request.save(request);
    return;
  } catch (err) {
    console.log(err.toString());
    return res.json(Response.Error("Error adding course"));
  }
};

const updateCourse = async (req, res) => {
  const payload = req.body;
  const course = await Course.findOne({ code: payload.code });
  if (!course) {
    res.status(401).send({ message: "Course not found" });
  }
  try {
    const temporary = await new Temporary(coursePayload);
    temporary.save();

    const request = await new Request({
      courseCode: payload.code,
      requestType: "Updation",
      instructorId: coursePayload.instructorId,
    });
    //const restoupdate=await Course.findOneAndUpdate({code:payload.code,...payload, approved:false});
    console.log(restoupdate);
    await request.save();
    res.status(200).send({ message: "Request sent" });
    return;
  } catch (err) {
    console.log(err);
    return res.json(Response.Error("Error updating course"));
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseID = req.body.courseID;
    const status = await CourseService.deleteCourse(courseID);
    return res.json(status);
  } catch (err) {
    console.log(err.toString());
    return res.json(Response.Error("Error deleting course"));
  }
};



const getCourses = async (req, res) => {
  try {
      const requests = await Course.find({approved:true});
      res.status(200).send({ requests });
  }
  catch (e) {
      res.status(500).send({ message: 'error' })
  }
}


const makeAnnouncement = async (req, res) => {
  try{
    const announcementPayload = req.body;
    const courseTofind = await Course.findById({_id:announcementPayload.courseId})
      const announcement = await Announcement.findOne({instructorId:announcementPayload.instructorId,
        name:courseTofind.name,
        text:announcementPayload.text});
      if(announcement){
        res.status(401).send({ message: "same announcement already exists" });
        return;
      }
      const announcementLoad = await new Announcement({...announcementPayload,name:courseTofind.name});
      const announcementId=await announcementLoad.save(announcementLoad);
      console.log(announcementId)
      var courseAnnouncement=await Course.findOneAndUpdate({instructorId:announcementId.instructorId,
        name:announcementId.name,approved:"true"},
        {$push: {announcements: announcementId._id}},{returnOriginal: false})
    console.log(courseAnnouncement)          
    res.status(200).send({status: 'success', message: 'Announcement added to course'});
    return;
    }
    catch (err){
      console.log(err);
      return res.json(Response.Error("Error adding course"));
    }
}


const deleteAnnouncement = async (req, res) => {
  console.log("hi")
  var announcementid = req.params.announcementid;
  try {
              console.log("deletion")
              var co=await Announcement.findOneAndDelete({_id:announcementid})                
              res.status(200).send({ status: 'success', message: 'Announcement deleted' });
              return;
          }
          catch (e) {
              console.log(e)
              res.status(500).send({ message: 'error' })
          }
}      

const createModule = async (req, res) => {
  try{    
    const courseid = req.params.idcourse;
    const modulePayload=req.body
      const course = await Course.findOne({_id:courseid});
      if(!course){
        res.status(401).send({ message: "Course does not exist" });
        return;
      }
      console.log("inside create module")
      console.log(course)
      console.log(modulePayload)
      const module = await new Module({...modulePayload,courseCode:course.name});
      const returnedmodule=await module.save(module);
      console.log(returnedmodule)
      var moduleattached=await Course.updateOne({_id:courseid,approved:"true"},
        {$push: {modules: module._id}},{returnOriginal: false})
    console.log(moduleattached)          
    res.status(200).send({status: 'success', message: 'Module added to course'});
    return;
    }
    catch (err){
      console.log(err);
      return res.json(Response.Error("Error adding course"));
    }
}




const getAnnouncements = async (req, res) => {
  try{
          const courses=await Course.find().populate('announcements')
          console.log(courses)
          res.status(200).json(courses);
          return;
    }
    catch (err){
      console.log(err);
      return res.json(Response.Error("Error adding course"));
    }
}


const createAssignment = async (req, res) => {
  try{    
    const courseid = req.params.idcourse;
    const assignmentPayload=req.body
      const course = await Course.findOne({_id:courseid});
      if(!course){
        res.status(401).send({ message: "Course does not exist" });
        return;
      }
      console.log(course)
      console.log(assignmentPayload)
      const assignment = await new Assignment({
        assignmentName: assignmentPayload.assignmentName,
        assignmentContentDisplayed:assignmentPayload.assignmentContentDisplayed,
        deadline: assignmentPayload.deadline,
        courseName:course.name,
        courseCode:course.code,
        instructorId:course.instructorId,
        semester:course.semester,
        courseId:course._id,
      });
      const returnedAssignment=await assignment.save(assignment);
      console.log(returnedAssignment)
      var assignmentattached=await Course.updateOne({_id:courseid,approved:"true"},
        {$push: {assignments: returnedAssignment._id}},{returnOriginal: false})
    console.log(assignmentattached)          
    res.status(200).send({status: 'success', message: 'Assignment created and added to course'});
    return;
    }
    catch (err){
      console.log(err);
      return res.json(Response.Error("Error adding Assignment"));
    }
}



const updateModule = async (req, res) => {
  try{    
    const idmodule = req.params.idmodule;
    const modulePayload=req.body
      const module = await Module.findOne({_id:idmodule});
      if(!module){
        res.status(401).send({message: "Module does not exist"});
        return;
      }
      console.log(module)
      console.log(modulePayload)
      const updatedModule = await Module.findOneAndUpdate(
        { _id: idmodule },
        { $set: modulePayload },
        { new: true }
      );
      console.log(updatedModule)
      var moduleattached=await Course.updateOne({_id:module.courseId,approved:"true"},
        {$push: {modules: updatedModule._id}},{returnOriginal: false})
    console.log(moduleattached)          
    res.status(200).send({status: 'success', message: 'Module updated and added to course'});
    return;
    }
    catch (err){
      console.log(err);
      return res.json(Response.Error("Error adding Module"));
    }
}


const deleteModule = async (req, res) => {
  try {
    const idmodule = req.params.idmodule;

    const deletedModule = await Module.findOneAndDelete({ _id: idmodule });
    if (!deletedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    const moduleDetached = await Course.updateOne(
      { _id: deletedModule.courseId, approved: "true" },
      { $pull: { modules: deletedModule._id } }
    );

    return res.status(200).json({ status: 'success', message: 'Module deleted and removed from course' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting module' });
  }
};



const updateAssignment = async (req, res) => {
  try{    
    const idassignment = req.params.idassignment;
    const assignmentPayload=req.body
      const assignment = await Assignment.findOne({_id:idassignment});
      if(!assignment){
        res.status(401).send({ message: "Assingment does not exist" });
        return;
      }
      console.log(assignment)
      console.log(assignmentPayload)
      const updatedAssignment = await Assignment.findOneAndUpdate(
        { _id: idassignment },
        { $set: assignmentPayload },
        { new: true }
      );
      console.log(updatedAssignment)
      var assignmentattached=await Course.updateOne({_id:assignment.courseId,approved:"true"},
        {$push: {assignments: updatedAssignment._id}},{returnOriginal: false})
    console.log(assignmentattached)          
    res.status(200).send({status: 'success', message: 'Assignment updated and added to course'});
    return;
    }
    catch (err){
      console.log(err);
      return res.json(Response.Error("Error adding Assignment"));
    }
}







const getAssignmentsByUsername=async(req,res)=>{   
  try {
      var username = req.params.username
      console.log(username)
      const student = await Enroll.findOne({ studentUsername: username }).populate({
          path: "course",
          populate: {
            path: "assignments",
            model: "Assignment", 
          },
        });          
      if (student) {
        const courses = student.course;      
        if (courses && courses.length > 0) {
          const assignments = courses.map(course => course.assignments);
          const assignmentsFiltered=assignments.filter(assignment => assignment.length>0)          
          const mergedAssignmentsFiltered = [].concat(...assignmentsFiltered);
          console.log(mergedAssignmentsFiltered)
          res.status(200).json(mergedAssignmentsFiltered);
        }else{
          console.log("No courses found for the student.");
          res.status(404).json({ message: "No courses found for the student." });
        }
      }else{
        console.log("Student not found or not enrolled in any courses.");
        res.status(404).json({ message: "Student not found or not enrolled in any courses." });
      }
  return;
  }
  catch (e) {
      console.log(e)
      res.status(500).send({ message: 'error' })
  }
};



const getAssignmentsByCourseId=async(req,res)=>{   
try {
    var courseid = req.params.idcourse;
    console.log(courseid)
    const courseAssignments=await Course.findOne({_id:courseid}).populate('assignments') 
    console.log(courseAssignments)
    res.status(200).json(courseAssignments);
    return;
}
catch (e) {
    console.log(e)
    res.status(500).send({ message: 'error' })
}    
};

const getAnnouncementsByCourseId=async(req,res)=>{   
  try {
      var courseid = req.params.idcourse;
      console.log(courseid)
      const courseAnnouncements=await Course.findOne({_id:courseid}).populate('announcements') 
      console.log(courseAnnouncements.announcements)
      res.status(200).json(courseAnnouncements.announcements);
      return;
  }
  catch (e) {
      console.log(e)
      res.status(500).send({ message: 'error' })
  }    
  };
  

  const getModulesByCourseId=async(req,res)=>{   
    try {
        var courseid = req.params.idcourse;
        console.log(courseid)
        const courseModules=await Course.findOne({_id:courseid}).populate('modules') 
        console.log(courseModules.modules)
        res.status(200).json(courseModules.modules);
        return;
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }    
    };

    const getModulesByCourseIWithFiles = async (req, res) => {
      try {
        const courseid = req.params.idcourse;
        const courseModules = await Course.findOne({ _id: courseid }).populate({
          path: 'modules',
          populate: {
            path: 'file', 
            model: 'File'
          }
        });
        res.status(200).json(courseModules.modules);
      } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'error' });
      }
    };
    

    const getAssignmentsByCourseIWithFiles = async (req, res) => {
      try {
        const courseid = req.params.idcourse;
        const courseModules = await Course.findOne({ _id: courseid }).populate({
          path: 'assignments',
          populate: {
            path: 'assignmentFile', 
            model: 'File'
          }
        });
        res.status(200).json(courseModules.assignments);
      } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'error' });
      }
    };
    


    const getAssignmentsByCourseWithFilesAndSubmissions = async (req, res) => {
      try {
        const courseid = req.params.idcourse;
        const courseAssignments = await Assignment.find({ courseId: courseid })
          .populate({
            path: 'submissions',
            populate: [
              {
                path: 'studentSubmittedFile',
                model: 'File' 
              },
              {
                path: 'studentSubmittedMedia',
                model: 'File' 
              }
            ]
          })
          .populate('assignmentFile');        
        res.status(200).json(courseAssignments);
      } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'error' });
      }
    };

    const getAssignmentSubmissions = async (req, res) => {
      try {
        const assignmentid = req.params.assignmentid;
        const submittedAssignments = await Assignment.find({ _id: assignmentid })
          .populate({
            path: 'submissions',
            populate: [
              {
                path: 'studentSubmittedFile',
                model: 'File' 
              },
              {
                path: 'studentSubmittedMedia',
                model: 'File' 
              }
            ]
          })
          .populate('assignmentFile');        
        res.status(200).json(submittedAssignments);
      } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'error' });
      }
    };

    const submitGrade=async(req,res)=>{
      try{
      const submissionid=req.params.submissionid;
      const submission=await Submission.findOne({_id:submissionid})
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      submission.grade = req.body.grade; 
    // Save the updated submission
    await submission.save();
    console.log(submission)
    return res.status(200).json({ submission});
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
  }

    
    
 
    
    










    const uploadFileTest = async (req, res) => {
      try {
        const newFile = new File({
          filename: req.file.originalname,
          s3_key: req.file.key,
          url: req.file.location
        });
        await newFile.save();
        res.send(`File uploaded successfully. File URL: ${req.file.location}`);
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
      }
    };

    const uploadFileTestWithModule = async (req, res) => {
      try {
        const moduleid = req.params.idmodule;
      const module = await Module.findOne({_id:moduleid});
      if(!module){
        res.status(401).send({ message: "Module does not exist" });
        return;
      }
      console.log(module)
      const newFile = new File({
        filename: req.file.originalname,
        s3_key: req.file.key,
        url: req.file.location
      });
      await newFile.save();
      console.log(newFile)
      var fileattached=await Module.updateOne({_id:moduleid},
        {$push: {file: newFile._id}},{returnOriginal: false})
    console.log(fileattached)          
    res.status(200).send({status: 'success', message: 'Module added to course'});
    return;
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
      }
    };


    //Code to upload file
    const uploadFileTestWithCreateModule = async (req, res) => {
      try {
        console.log("uploadFileTestWithCreateModule")
        const courseid = req.params.idcourse;
        const modulePayload = req.body;
        const newFile = new File({
          filename: req.file.originalname,
          s3_key: req.file.key,
          url: req.file.location
        });
        await newFile.save();    
        const course = await Course.findOne({ _id: courseid });
        if (!course) {
          return res.status(401).send({ message: "Course does not exist" });
        }
        const module = new Module({ ...modulePayload, courseCode: course.name });
        module.file = newFile._id; 
        await module.save();   
        course.modules.push(module._id);
        await course.save();
        res.status(200).send({ status: 'success', message: 'Module added to course' });
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
      }
    };
    
    const createAssignmentWithFile = async (req, res) => {
      try {
        const courseid = req.params.idcourse;
        const assignmentPayload=req.body
        const newFile = new File({
          filename: req.file.originalname,
          s3_key: req.file.key,
          url: req.file.location
        });
        await newFile.save();
          const course = await Course.findOne({_id:courseid});
          if(!course){
            res.status(401).send({ message: "Course does not exist" });
            return;
          }
          const assignment = await new Assignment({
            assignmentName: assignmentPayload.assignmentName,
            assignmentContentDisplayed:assignmentPayload.assignmentContentDisplayed,
            deadline: assignmentPayload.deadline,
            courseName:course.name,
            courseCode:course.code,
            instructorId:course.instructorId,
            semester:course.semester,
            courseId:course._id,
            assignmentFile:newFile._id
          });
          const returnedAssignment=await assignment.save(assignment);
          console.log(returnedAssignment)
          var assignmentattached=await Course.updateOne({_id:courseid,approved:"true"},
            {$push: {assignments: returnedAssignment._id}},{returnOriginal: false})
        console.log(assignmentattached)          
        res.status(200).send({status: 'success', message: 'Assignment created and added to course'});
        return;
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
      }
    };


    const uploadAssignmentbyuser = async (req, res) => {
      try {
        console.log("inside upload assignment by user")
        console.log(req.files)
        const files = req.files;
        const courseid = req.params.idcourse;
        const assignmentSubmissionPayload=req.body
        const file1=files[0];
        const file2=files[1];
        const newFile1 = new File({
          filename: file1.originalname,
          s3_key: file1.key,
          url: file1.location
        });
        await newFile1.save();
        if(file2){
        const newFile2 = new File({
          filename: file2.originalname,
          s3_key: file2.key,
          url: file2.location
        });
        await newFile2.save();
          const assignment = await Assignment.findOne({assignmentName:assignmentSubmissionPayload.assignmentName});
          if(!assignment){
            res.status(401).send({ message: "Assignment does not exist" });
            return;
          }
        }
          const submission = await new Submission({
            studentusername: assignmentSubmissionPayload.username,
            studentSubmittedFile: newFile1._id,
            studentSubmittedText: assignmentSubmissionPayload.textEntry,
            studentSubmittedMedia: file2 ? newFile2._id:null,
            assignmentName:assignmentSubmissionPayload.assignmentName,
            courseCode:courseid
          });
          const submitted=await submission.save(submission);
          console.log(submitted)
          console.log('attaching to the assignment the submissions')
          var assignmentAttached=await Assignment.findOneAndUpdate({assignmentName:assignmentSubmissionPayload.assignmentName},
            {$push: {submissions: submitted._id}},{returnOriginal: false})
        console.log(assignmentAttached)          
        res.status(200).send({status: 'success', message: 'Assignment created and added to course'});
        return;
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
      }
    };


    const getGradesOfSubmissionsByUser=async(req,res)=>{
      try{
        const courseid=req.params.idcourse
        const user=req.body.user
        console.log(courseid)
        console.log(user)
        const submissions = await Submission.find({ courseCode: courseid,studentusername:user });
        res.status(200).json(submissions);
      }
      catch(error){
        console.error('Error getting submissions');
        res.status(500).send('Failed to get submission grades');
      }
    }




dotenv.config();



  

module.exports = {addCourse, deleteCourse, updateCourse, getCourses,makeAnnouncement,getAnnouncements,
  createModule,createAssignment,getAssignmentsByUsername,getAssignmentsByCourseId,updateAssignment,
  updateModule,getAnnouncementsByCourseId,deleteAnnouncement,getModulesByCourseId,uploadFileTest,
createAssignmentWithFile,getModulesByCourseIWithFiles,uploadFileTestWithModule,uploadFileTestWithCreateModule,
uploadAssignmentbyuser,getAssignmentsByCourseIWithFiles,getAssignmentsByCourseWithFilesAndSubmissions,
getAssignmentSubmissions,submitGrade,getGradesOfSubmissionsByUser,deleteModule};
