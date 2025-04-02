import express from "express";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import comaparePassword  from "../../models/User.js";
const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "15d" });
};

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" });
        }
        if (username.length < 3) {
            return res.status(400).json({ message: "Username should be at least 3 characters long" });
        }

        // Check if email or username already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Generate random avatar
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const user = new User({ email, username, password, profileImage });
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        console.error("Error in register route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    res.send("login");
});

router.post("/login" , async (req , res)=>{
    try {
        
        const{email, passowrd} = req.body;
        if(!email || !passowrd) return res.status(400).json({
            message: "all fields are required"
        }) 
        const user = await User.findOneAndDelete({
            email
        });

        if(!user) return res.status(400).json({
            message: "user nonexistant"
        })

        const isPasswordCorrect = await user.comaparePassword(passowrd);
        if(!isPasswordCorrect) return res.status(400).json(
            {

                message:"Invalid credentials"
            }
        )
    } catch (error) {
        
        console.log("error in login route" , error);
        res.status(500).json({
            message: "internal server error";
        });
    }
})

export default router;
