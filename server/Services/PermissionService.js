const { json } = require("express");
const AuthService = require("./AuthService");
const Responses = require("./ResponseService");

const changePermission = async (A, B, toRole) => {
  console.log("Here");
  try {
    const rolesMapping = { admin: 3, instructor: 2, student: 1 };
    const BUser = await AuthService.getuserById(B);
    if (!BUser) {
      return Responses.Error(
        "Cannot get the user whose role is to be changed!"
      );
    }
    if (
      rolesMapping[A.role] > rolesMapping[BUser.role] &&
      rolesMapping[toRole] <= rolesMapping[A.role]
    ) {
      const status1 = await AuthService.updateUser(BUser.username, {
        role: toRole,
      });
      if (status1) {
        return Responses.Success("Successfully changed the role!");
      }
    } else {
      return Responses.Error(
        "You cannot upgrade an user to a role superior than your's!"
      );
    }
  } catch (err) {
    console.log(err.toString());
    return Responses.Error("Some error occurred while changing roles!");
  }
};

module.exports = { changePermission };
