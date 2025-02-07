const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
const port = 8000;

//**  Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mongo-db-01")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => console.log("Error:", err));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},{timestamps:true});

//Model
const User = mongoose.model("user", userSchema);

//Routes

//* GET
app.get("/users", async(req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
      
    res.send(html);
});

app.get("/api/users", async(req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers);
});



app.route("/api/users/:id")

    //*GET data by ID
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        return res.json(user);
    })

    //*Update Data
    .patch(async(req, res) => {
        await  User.findByIdAndUpdate(req.params.id, {lastName:"Changed"});
        return res.json({status:"success"});
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({status:"success"});
       
    });

    app.post("/api/users", async (req, res) => {
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
        return res.status(201).json({msg:"success"})
    });

app.listen(port, () => console.log(`Server stated at ${port}`));    