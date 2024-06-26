import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    }
}, { timestamps: true }); // Corrected option

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
