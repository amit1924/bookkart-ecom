// Import necessary modules and models
import db from "@/lib/db"; // Import the db module for database connection
import bcrypt from 'bcrypt'; // Import the bcrypt library for password hashing
import User from "@/models/User"; // Import the User model (assuming it's defined in a file named 'User.js' in a folder named 'models')

// Define an asynchronous function named POST that handles HTTP POST requests
export async function POST(req) {
    try {
        // Connect to the database
        await db.connect();

        // Extract username, email, and password from the request body
        const { username, email, password: pass } = await req.json();

        // Check if a user with the provided email already exists
        const isExisting = await User.findOne({ email: email });

        if (isExisting) {
            // If a user with the provided email already exists, throw an error
            throw new Error("User already exists");
        }

        // Hash the provided password
        const hashedPassword = await bcrypt.hash(pass, 10);

        // Create a new user with the provided username, email, and hashed password
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Remove the password from the user object
        const { password, ...user } = newUser._doc;

        // Return the user object as a JSON response with a status code of 200 (OK)
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
        // If an error occurs, return the error message as a JSON response with a status code of 500 (Internal Server Error)
        return new Response(JSON.stringify(err.message), { status: 500 });
    }
}
