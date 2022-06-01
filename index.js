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
  const courses = await Course
  .find({author: 'Mosh', isPublished: true})
  .limit(10)
  .sort({name: 1}) // 1 is ascending, -1 is descending
  .select({name: 1, tags: 1}); // select only the name and tags fields
  console.log(courses);
}

getCourses();
