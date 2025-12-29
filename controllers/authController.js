const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, address, role, } = req.body
        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role
        })
        await newUser.save()
        return res.status(200).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: " Server error" })
    }
}

const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" })

        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });

        }
        console.log(user)
        const jwtToken = jwt.sign({ id:user._id },process.env.jwt_Token, { expiresIn: '1h' })
        res.status(200).json({
            message: "Login Succesful",
            token: jwtToken
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" })

    }

};

module.exports = { signUp, SignIn };