const mongoose = require("mongoose");


const contactSchema = mongoose.Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"

    },
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true
    },
    phone: {
      type: Number,
      required: [true, "Please enter the number"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("contact", contactSchema);
