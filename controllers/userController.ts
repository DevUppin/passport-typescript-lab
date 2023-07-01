import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  try {
    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return user;
      } else {
        throw new Error("Password is incorrect");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
