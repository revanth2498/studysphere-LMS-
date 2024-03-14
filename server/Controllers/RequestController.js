var Request = require('../Models/Request');
var Course = require('../Models/Course');
var Enroll = require('../Models/Enrollments');
var User=require('../Models/User');
var Temporary=require('../Models/DummyCourse');
const getActiveRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).send({ requests });
    }
    catch (e) {
        res.status(500).send({ message: 'error' })
    }

}


const getRequestsByInstructor = async (req, res) => {
    try {        
            const instructorId = req.params.instructorId;        
            const requests = await Request.find({ instructorId: instructorId, approved: true });
            const reqs = requests.map(req => ({
              "courseCode": req.courseCode,
              "instructorId": req.instructorId,
              "courseName": req.courseName
            }));           
            console.log(reqs);

const courseSubjects = [];
   for (var req of requests) {
    var courseSubject = await Course.findOne({
      code: req.courseCode,
      instructorId: req.instructorId,
      name: req.courseName
    });
    courseSubjects.push(courseSubject);
   }
            console.log(courseSubjects)
            res.status(200).json(courseSubjects);
        }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }
}

const getRequestsByInstructorDenied = async (req, res) => {
    try {        
        
            const instructorId = req.params.instructorId;        
            const requests = await Request.find({ instructorId: instructorId, approved: false });
            const reqs = requests.map(req => ({
              "courseCode": req.courseCode,
              "instructorId": req.instructorId,
              "courseName": req.courseName
            }));           
            console.log(reqs);
// const courseSubjects = [];
//    for (var req of requests) {
//     var courseSubject = await Course.findOne({
//       code: req.courseCode,
//       instructorId: req.instructorId,
//       name: req.courseName
//     });
//     courseSubjects.push(courseSubject);
//    }
            res.status(200).json(reqs);
        }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }
}






const approveRequest = async (req, res) => {
    console.log("hi")
    var requestId = req.params.reqid;
    console.log(requestId)
    var request= await Request.findOne({_id: requestId});
    console.log(request)
        if(request.requestType=='Creation'){
            try {
                console.log("creation")
                
                var co=await Course.findOneAndUpdate({code:request.courseCode,instructorId:request.instructorId},{
                    $set: {approved: true}},{returnOriginal: false})
                console.log(co)                
                var resmodified=await Request.findOneAndUpdate({_id: requestId},{
                    $set: {approved: "true"}},{returnOriginal: false});
                console.log(resmodified)
                res.status(200).send({ status: 'success', message: 'Request approved' });
                return;
            }
            catch (e) {
                console.log(e)
                res.status(500).send({ message: 'error' })
            }

        }
        else if(request.requestType=='Updation'){
            try {
                data=await Temporary.findOne({courseCode:request.courseCode})
                await Course.findOneAndUpdate({ code:request.courseCode, ...data,approved: true });
                await Request.findOneAndUpdate({_id: requestId,approved:"True"});
                res.status(200).send({ status: 'success', message: 'Request approved' });
                return;
            }
            catch (e) {
                res.status(500).send({ message: 'error' })
            } 

        }
}


const denyRequest = async (req, res) => {
    console.log("denyy")
    var requestId = req.params.reqid;
    console.log(requestId)
    var request= await Request.findOne({_id: requestId});
    console.log(request)
            try {
                console.log("creation")
                var co=await Course.findOneAndDelete({code:request.courseCode,instructorId:request.instructorId});
                console.log(co)
                var resmodified=await Request.findOneAndUpdate({_id: requestId},{
                    $set: {approved: "false"}},{returnOriginal: false});
                console.log(resmodified)
                res.status(200).send({ status: 'success', message: 'Request denied' });
                return;
            }
            catch (e) {
                console.log(e)
                res.status(500).send({ message: 'error' })
            }
}













const deleteRequest = async (req, res) => {
    const { courseId } = req.body;
    const course = await Course.findOne({ code: courseId });
    if (!course) {
        res.status(400).send({ message: 'course not found' })
        return;
    }
    else{
        try {
            await Course.findOneAndDelete({ code:courseId});
            await Request.deleteOne({courseCode: courseId});
            res.status(200).send({ status: 'success', message: 'Request approved' });
            return;
        }
        catch (e) {
            res.status(500).send({ message: 'error' })
        }

    }
}



const enrollStudents= async (req, res) => {
    const { coursecode,studentUsername,instructorId } = req.body;
    var courseSubject= await Course.findOne({code:coursecode,instructorId:instructorId})
    var studentExists= await Enroll.findOne({studentUsername: studentUsername})
    var user= await User.findOne({username: studentUsername})
    console.log(courseSubject)
    console.log(user)
    if (!courseSubject ) {
        res.status(400).send({ message: 'course not found' })
        return;
    }
    if(studentExists) {
        try {
            var enrolled=await Enroll.findOneAndUpdate({studentUsername:studentUsername},{
                $push: {course: courseSubject._id}},{returnOriginal: false})
            console.log(enrolled)          
            res.status(200).send({status: 'success', message: 'Course added to student'});
            return;
        }
        catch (e) {
            console.log(e)
            res.status(500).send({ message: 'error'})            
        }
    }
    else{
        try {            
            const enrolled = await new Enroll({
                studentUsername:studentUsername,
                course:[courseSubject._id]
            });
            var ans=await enrolled.save()
            console.log(ans)          
            res.status(200).send({status: 'success', message: 'Course added to student'});
            return;
        }
        catch (e) {
            console.log(e)
            res.status(500).send({ message: 'error'})
        }
    }
}


const displayEnrolledStudentCourses=async(req,res)=>{   
        try {
            const students=await Enroll.find().populate('course')
            console.log(students)
            res.status(200).json(students);
            return;
        }
        catch (e) {
            console.log(e)
            res.status(500).send({ message: 'error' })
        }
};

const displayEnrolledStudentCoursesByUsername=async(req,res)=>{   
    try {
        var username = req.params.username;
        console.log(username)
        const student=await Enroll.findOne({studentUsername:username}).populate('course')
        // const student = await Enroll.findOne({ studentUsername: username }).populate({
        //     path: "course",
        //     populate: {
        //       path: "announcements",
        //       model: "Announcement", // Assuming your Announcement model is named "Announcement"
        //     },
        //   });          
        console.log(student)
        res.status(200).json(student.course);
        return;
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }
};


const displayEnrolledStudentAnnouncementsByUsername=async(req,res)=>{   
    try {
        var username = req.params.username;
        console.log(username)
        //const student=await Enroll.findOne({studentUsername:username}).populate('course')
        const student = await Enroll.findOne({ studentUsername: username }).populate({
            path: "course",
            populate: {
              path: "announcements",
              model: "Announcement", // Assuming your Announcement model is named "Announcement"
            },
          });          
        console.log(student)
        res.status(200).json(student.course);
        return;
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }
};


const userByCourse=async(req,res)=>{   
    try {
        var courseid = req.params.courseid;
        const enrollment=await Enroll.find({course:courseid}).populate('course')

        res.status(200).json(enrollment.map(en=>en.studentUsername));
       return;
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' })
    }
};



module.exports = {
    getActiveRequests,
    approveRequest,
    deleteRequest,
    enrollStudents,
    displayEnrolledStudentCourses,
    denyRequest,
    displayEnrolledStudentCoursesByUsername,
    getRequestsByInstructor,
    getRequestsByInstructorDenied,
    displayEnrolledStudentAnnouncementsByUsername,
    userByCourse
}