const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/UsersDB",{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    records: [ {
        disease: String,
        hospital: String,
        doctor: String,
        visited_on: String,
        prescription: String
    }]
})

const User = new mongoose.model("User", userSchema)
// const Record = new mongoose.model("Record",recordSchema)
app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }).then( (user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }).then( (user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save().then((err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

}) 
app.post("/Today", (req, res) => {
    const { email,disease,hospital,doctor,visited_on,prescription } = (req.body)
    
    User.findOne({ email: email }).then((user) => { user.records=[{ disease, hospital, doctor, visited_on, prescription }]; console.log(user)})
    console.log(User.findOne({ email: email })
    )
})
// app.get("/Today", (req, res) => {
//     User.find((err,data) =>{

//     })
//     const { email, disease, hospital, doctor, visited_on, prescription } = (req.body)
//     User.findOne({ email: email }).then((user) => { user.records = [{ disease, hospital, doctor, visited_on, prescription }]; console.log(user) })
//     console.log(User.findOne({ email: email }))
//     res.send(req.body)
// })

app.listen(9200,()=>{
    console.log("Started at 9200")
})
module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);