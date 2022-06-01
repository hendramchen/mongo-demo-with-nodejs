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

async function createCourse() {
  // to create a model, we need to pass in the schema
  // the model is a class that we can use to create documents
  const Course = mongoose.model("Course", courseSchema);
  // then we create objects from the model/Class
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["node", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
