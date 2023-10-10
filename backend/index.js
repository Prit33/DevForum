const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const multer = require('multer')
const path=require('path')

const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')


//database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")
    }
    catch (err) {
        console.log(err)
    }
}

// middlewares
dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)
app.use("/images",express.static(path.join(__dirname,"/images")))


// //image upload
// const storage=multer.diskStorage({
//     destination:(req,file,fn)=>{
//         fn(null,'images')
//     },
//     filename:(req,file,fn)=>{
//         // fn(null,"image1.jpeg")
//         fn(null,req.body.img)
//     }
// })

// //image upload
// const upload=multer({storage:storage})

// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     res.status(200).json("Image has been uploaded!")
// })
//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, filename: (req, file, cb) => {
        // cb(null,"jeet123.jpg")
        cb(null, req.body.name)
    }
})
//image upload
const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    // console.log(req.body)
    res.status(200).json("Image has been uploaded!")
})



app.listen(process.env.PORT, () => {
    connectDB();
    console.log("app is running on port 5000")
})