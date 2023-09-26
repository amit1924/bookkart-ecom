// Import the 'mongoose' library for MongoDB interactions
import mongoose from "mongoose";

// Define a review schema with specific fields and their properties
const ReviewSchema = new mongoose.Schema({
    // Rating field: Should be a number, required, and must be between 1 and 10
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },

    // Description field: Should be a string, required, and must be at least 8 characters long
    desc: {
        type: String,
        required: true,
        min: 8
    },

    // User ID field: Should be a MongoDB Object ID, and it must refer to a 'User'
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Book ID field: Should be a string and is required
    bookId: {
        type: String,
        required: true
    }
}, {
    // Enable timestamps, which will automatically add 'createdAt' and 'updatedAt' fields
    timestamps: true
});

// Export the review model: 
// If a model named 'Review' exists, use it; otherwise, create one with the defined schema
export default mongoose?.models?.Review || mongoose.model("Review", ReviewSchema);
