import jwt from 'jsonwebtoken'
import { User } from '../models/User.model'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// register user 
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "all fields are required" });
    }

    try {
        const existingUser = await useReducer.findOne({ email });
        if (existingUser) { return res.status(400).json({ message: "Email already in use" }); }

        const user = await User.create({
            fullName, email, password, profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "error registering user", error: error.message });

    }
};

// Login User 
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required.." })
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials.." });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: "Invalid credentials", error: error.message });

    }


};

// Get user  Info 
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Fault to fetch user details..", error: error.message })
    }
};