const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema,
    // we can also require author field like this
    // author: {
    //     type: authorSchema,
    //     required: true
    // }
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Hendra";
  course.save();
  // or update directly on database
//   const course = await Course.updateOne(
//     { _id: courseId },
//     { $set: { author: { name: "Other name" } } }
//   );

// or we can remove sub document by using $unset
// const course = await Course.updateOne({ _id: courseId }, { $unset: { author: "" } });
}
// it will update only sub document (author)
updateAuthor("5c9d9d9d9d9d9d9d9d9d9d");

createCourse("Node Course", new Author({ name: "Mosh" }));

// we can also have sub document with object array
const CourseArr = mongoose.model(
    "Course",
    new mongoose.Schema({
      name: String,
      author: [authorSchema]
    })
  );

  async function createCourseArr(name, authors) {
    const course = new CourseArr({
      name,
      authors,
    });
  
    const result = await course.save();
    console.log(result);
  }

  createCourseArr('Node Js Course', [
    new Author({ name: 'Mosh' }),
    new Author({ name: 'Hendra' })
  ]);

  // we can add author to array by using push
  async function addAuthor(courseId, author) {
      const course = await CourseArr.findById(courseId);
      course.authors.push(author);
      course.save();
  }

  addAuthor('5c9d9d9d9d9d9d9d9d9d9d', new Author({ name: 'Test' }));

  async function removeAuthor(courseId, authorId) {
    const course = await CourseArr.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
  }

  removeAuthor('5c9d9d9d9d9d9d9d9d9d9d', '3c9d9d9d9d9d9d9d9d9d9d');