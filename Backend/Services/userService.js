const UserModel = require("../models/user");

exports.getAllUser = async (query) => {
  try {
   if(query){
     const users = await UserModel.find(query).limit(10);

    return users;
   }
   const users = await UserModel.find();

    return users;
   
  } catch (error) {
    throw new Error("Failed to retrieve users");
  }
};

exports.createUser = async (user) => {
  console.log(user)
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

exports.getUserById = async (id) => {

  return await UserModel.findById(id);
};

exports.updateUser = async (id, user) => {
  console.log(user)
  return await UserModel.findByIdAndUpdate(id, user);
};

exports.deleteUser= async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
