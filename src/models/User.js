// Import the 'mongoose' library for MongoDB interactions
import mongoose from "mongoose";

// Define a user schema with specific fields and their properties
const UserSchema = new mongoose.Schema({
    // Username field: Should be a string, required, and must be unique
    username: {
        type: String,
        required: true,
        unique: true
    },

    // Email field: Should be a string, required, and must be unique
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Password field: Should be a string and is required
    password: {
        type: String,
        required: true
    }
}, { 
    // Enable timestamps, which will automatically add 'createdAt' and 'updatedAt' fields
    timestamps: true
});

// Define the User model if it doesn't exist yet
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
