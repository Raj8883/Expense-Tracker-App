
import express from 'express'
import { protect } from '../Middlewares/auth.middleware.js';
import { registerUser, loginUser, getUserInfo } from '../controllers/auth.controller.js'

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });

    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename
        }`;
    res.status(200).json({ imageUrl });

});

export default router;