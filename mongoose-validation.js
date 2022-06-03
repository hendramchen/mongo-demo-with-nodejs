const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/playground");
// validation come from mongoose not mongodb,
// mongoose is a library that we can use to validate data
// mongodb is ignoring validation
// we can both of validation (joi and mongoose)
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network"]
    },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        // can not use arrow function here, because we use `this` pointer
        required: function() {  
            return this.isPublished;
        },
        min: 10,
        max: 200,
    }
  });

  const Course = mongoose.model("Course", courseSchema);

  async function createCourse() {
    const course = new Course({
      name: "Angular Course",
      category: "web",
      author: "Mosh",
      tags: ["node", "frontend"],
      isPublished: true,
      price: 15
    });
  
    const result = await course.save();
    console.log(result);
  }

  createCourse();