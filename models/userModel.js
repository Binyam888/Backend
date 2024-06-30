const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  email: {
    type: String,
    required: [true, "please enter the email"],
    unique: [true, "email alredy exist"],
  },
  password: {
    type: String,
    required: [true, "please enter the password"],
  },
});

userSchema.pre("save", async function(next){
if(!this.isModified("password")){
  return next()
}
const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password,salt)
})

module.exports= mongoose.model("user",userSchema)
