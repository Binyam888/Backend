const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@desc user registration
//@route POST /api/user/register
//@access public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All feilds are mandatory");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("email already exist");
  }

  const users = await User.create({
    name,
    email,
    password,
  });
  console.log(`user details ${users}`);
  res
    .status(201)
    .json({ message: "user created for", id: users.id, email: users.email });
});

//@desc user login
//@route POST /api/user/login
//@access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All feilds are mandatory");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //compare password with hashed password
    // const hashedPassword = await bcrypt.compare(password, user.password);
    // console.log("hashed password",hashedPassword);

    const accesToken = jwt.sign(
      {
        user: { name: user.name, id: user.id, email: user.email },
      },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ accesToken });
  } else {
    res.status(401);
    throw new Error("email or password mismach");
  }

  
});

//@desc get current user
//@route GET /api/user/current
//@access public

const current = asyncHandler(async (req, res) => {
    const userData = req.user
    const{name}=userData
  res.json({ name });
});

module.exports = { register, login, current };
