const userService = require("../services/userService.js");
const UserModel = require("../models/user");
exports.getAllUsers = async (req, res) => {
  var reqquery = null
  var query 
  if(req.query.q){
    reqquery = req.query.q
    const  q  = reqquery;
    query = {
      $or: [
        { name: { $regex: `.*${q}.*`, $options: 'i' } },
        { email: { $regex: `.*${q}.*`, $options: 'i' } },
      ],
  };
  }
  


  
  console.log(query)
  try {
    const users = await userService.getAllUser(query);
 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: err.message});
  }
};

exports.createUser = async (req, res) => {
  const { name, age, email, avatarUrl } = req.body;

  // Check if age is a number
  if (typeof age !== 'number') {
    return res.status(400).json({ error: 'Age must be a number' });
  }

  // Check email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Check if email already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = await userService.createUser({ name, age, email, avatarUrl });
    res.json({ data: newUser, status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    
    const user = await userService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const {  age, email } = req.body;
 console.log(age ,email)
  // Check if age is a number
  if (typeof age !== 'number') {
    return res.status(400).json({ error: 'Age must be a number' });
  }

  // Check email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser  = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if(!user){
      res.json({ data: req.params.id, status: "failed" });

    }
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
