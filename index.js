const mongoose = require("mongoose");
// how to connect to mongoose
// playground is a database name
// playground will automatically create a database if it doesn't exist
// mongoose.connect will return a promise
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
// to create document/database, the first thing we need to do is create a schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
// to create a model, we need to pass in the schema
// the model is a class that we can use to create documents
const Course = mongoose.model("Course", courseSchema);
// to create a document, we need to create an instance of the model
async function createCourse() {
  // we create objects from the model/Class
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["node", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
// comment out the createCourse function to create a object
// createCourse();
// this is a query method to find courses
async function getCourses() {
  // get all courses without filtering
  // const courses = await Course.find();
  // get all courses with filtering
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 }) // 1 is ascending, -1 is descending
    .select({ name: 1, tags: 1 }); // select only the name and tags fields
  console.log(courses);
}

// async function getCoursesWithComplexFilter() {
// eq is equal to
// ne is not equal to
// gt is greater than
// gte is greater than or equal to
// lt is less than
// lte is less than or equal to
// in is in
// nin is not in

// const courses = await Course
// .find({ price: { $gte: 10, $lte: 20 } })

// const courses = await Course
// .find({ price: { $in: [10, 15, 20] } })
// console.log(courses);

// const courses = await Course
// Start with Putu
// .find({ author: /^Putu/ })
// Ends with Parman
// .find({ author: /Parman$/i })
// Contains Eka
// .find({ author: /.*Eka.*/i })
// }

// about pagination
// async function getCourses(){
//   const pageNumber = 2;
//   const pageSize = 10;

//   const courses = await Course
//   .find({ author: 'Mosh' })
//   .skip((pageNumber - 1) * pageSize)
//   .limit(pageSize)
// }

// getCourses();

async function updateCourseFirstApproach(id) {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  const result = await course.save();
  console.log(result);
}

async function updateCourseSecondApproach(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

async function updateCourseThirdApproach(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// updateCourseFirstApproach('629762d47de482ebb4c67209');
// updateCourseSecondApproach("62976316c2bda3446f2c15b3");
removeCourse('62976316c2bda3446f2c15b3');