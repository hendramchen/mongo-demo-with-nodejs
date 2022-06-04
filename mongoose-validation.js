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
        enum: ["web", "mobile", "network"],
        lowercase: true // to set value category to lowercase
        // uppercase: true // to set value category to uppercase
        // trim: true // to remove padding spaces
    },
    author: String,
    // custom validator
    // we can avoid this input []
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                // value is not null and value is not empty
                return v && v.length > 0;
            },
            // we can define a message here
            message: "A course should have at least one tag."
        }
    },
    // async validator
    // it is used to validate file upload that required asyncrhonous
    // tags: {
    //     type: Array,
    //     validate: {
    //         isAsync: true,
    //         validator: function(v, callback) {
    //             setTimeout(() => {
    //                 const result = v && v.length > 0;
    //                 callback(result);
    //             }, 4000);
    //         },
    //         message: "A course should have at least one tag."
    //     }
    // },
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
        // set will be call automatically when we create a new course
        // get will be call automatically when we get a course from database
        // get: v => Math.round(v),
        // set: v => Math.round(v)
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