const User = require("../models/user")
async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({})
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id);
        return res.json(user);
}

async function handleUpdateUserById(req,res){
    await  User.findByIdAndUpdate(req.params.id, {lastName:"Changed"});
    return res.json({status:"success"});
}
async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"success"});
}

async function handleCreateNewUser(req,res){
    const body = req.body;
        // console.log("Body",body);
        if (
            !body ||
            !body.first_name ||
            !body.last_name ||
            !body.email ||
            !body.gender ||
            !body.job_title
        ) {
            return res.status(400).json({ status: "error", message: "All fields are required..." });
        }
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
        });
    
        console.log(result)
        return res.status(201).json({msg:"success",id:result._id})
}

module.exports = {
    handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUser
}