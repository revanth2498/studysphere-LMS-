const CourseSchema = require("../Models/Course");
const Response = require("./ResponseService");
const addCourse = async (payload) => {
  try {
    console.log(payload);
    if (payload.courseName) {
      const status = await CourseSchema.create(payload);
      if (status) {
        return true;
      }
      return Response.Error("No course name provided");
    }
  } catch (err) {
    console.log(err.toString());
    return Response.Error("Error adding course");
  }
};

//my changes
const deleteCourse = async (courseID) => {
  try {
    const status = await CourseSchema.findByIdAndDelete({ _id: courseID });
    console.log(status);
    console.log(JSON.parse(JSON.stringify(status)));
    if (status) return Response.Success("Succesfully deleted course");
    else throw "Course schema returned false or null";
  } catch (err) {
    console.log(err.toString());
    return Response.Error("Error deleting course");
  }
};

module.exports = { addCourse, deleteCourse };
