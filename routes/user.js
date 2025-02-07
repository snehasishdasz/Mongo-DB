const express = require("express");
const router = express.Router();
const {handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUser} = require("../controllers/user")

//Routes

//* GET
// router.get("/", async(req, res) => {
//     const allDbUsers = await User.find({})
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
      
//     res.send(html);
// });

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)



router.route("/:id")
    //*GET data by ID
    .get(handleGetUserById)
    //*Update Data
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);
    //*POST
    router.post("/", handleCreateNewUser);


module.exports = router;

