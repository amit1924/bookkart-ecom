import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";

// Function to sign a JWT token
export function signJwtToken(payload, options = {}) {
    const secret = process.env.NEXTAUTH_SECRET; // Get the secret from environment variables
    const token = jwt.sign(payload, secret, options); // Sign the token with the payload, secret, and options
    return token; // Return the signed token
}

// Function to verify a JWT token
export async function verifyJwtToken(sessionToken) {
    try {
        const decoded = await decode({
            token: sessionToken,
            secret: process.env.NEXTAUTH_SECRET, // Get the secret from environment variables
        }); // Decode the token using the provided secret
        return decoded; // Return the decoded token
    } catch (error) {
        console.error("Error verifying " + error.message); // Log an error message if verification fails
        return null; // Return null if there's an error
    }
}
