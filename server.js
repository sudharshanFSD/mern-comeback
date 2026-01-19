const express = require('express');
const app = express();
const connectDB = require('./db')
const User = require('./models/User');
const generateToken = require('./utils/generateToken');
const Note = require('./models/Note');
const protect = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Api Fetched");
})

connectDB();

app.post("/register",async(req,res)=>{
    try{
        const user = await User.create(req.body);
        res.json({message:"user Created",user:{
            id:user._id,
            name:user.name,
            email:user.email
        }});
    }catch(error){
        res.status(400).json({error:error.message})
    }
});

app.post('/login',async(req,res)=>{
    
        const{email,password}=req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        res.json({message:"Login Successful",
            token:generateToken(user._id)
        });
});

app.post('/notes',protect,async(req,res)=>{
    try{
        const note = await Note.create({
            user:req.user._id,
            title:req.body.title,
            content:req.body.content
        });
        res.json(note);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

app.get("/notes",protect,async(req,res)=>{
    try{
        const notes = await Note.find({user:req.user._id});
        res.json(notes);
    }catch(error){
        res.status(400).json({error:error.mesage});
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
});
