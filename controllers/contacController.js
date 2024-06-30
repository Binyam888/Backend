const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/conatact
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const conatacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(conatacts);

  console.log("array_length", conatacts.length);
});

//@desc Create contacts
//@route POST /api/conatact
//@access public
const createContact = asyncHandler(async (req, res) => {
  {
    const { name, email, phone } = req.body;
     
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All feilds are mandotory");
    }

    

    const contacts = await Contact.create({
      name,
      email,
      phone,
      user_id:req.user.id
    });
    res.status(201).json({ message: `Contact created  for: `, contacts });
    console.log(`user details  `, contacts);
  }
});

//@desc get single contact
//@route GET /api/conatact/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("No contact Found")
  }
  res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/conatact/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route DELETE /api/conatact/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
   await Contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
  }
});

module.exports = {
  getContacts,
  deleteContact,
  updateContact,
  createContact,
  getContact,
};
