// Import NextAuth and its credentials provider
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Import necessary modules and functions
import User from "@/models/User"; // Import the User model
import { signJwtToken } from "@/lib/jwt"; // Import the function for signing JWT tokens
import bcrypt from 'bcrypt'; // Import the bcrypt library for password hashing
import db from "@/lib/db"; // Import the database connection module

// Define the authentication handler using NextAuth
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "John Doe" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;

                // Connect to the database
                await db.connect();

                // Find a user with the provided email
                const user = await User.findOne({ email });

                // If no user found, throw an error
                if (!user) {
                    throw new Error("Invalid input");
                }

                // Compare the provided password with the hashed password in the database
                const comparePass = await bcrypt.compare(password, user.password);

                // If passwords don't match, throw an error
                if (!comparePass) {
                    throw new Error("Invalid input");
                } else {
                    // If authentication is successful, create a JWT token
                    const { password, ...others } = user.toObject(); // Exclude password from user data
                    const accessToken = signJwtToken(others, { expiresIn: "6d" }); // Sign a JWT token with user data

                    return {
                        ...others, // Return user data (excluding password)
                        accessToken // Return the JWT token as 'accessToken'
                    };
                }
            }
        })
    ],
    pages: {
        signIn: "/login" // Redirect to '/login' page for sign-in
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Add user's accessToken and _id to the JWT token
                token.accessToken = user.accessToken;
                token._id = user._id;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                // Set user's _id and accessToken in the session
                session.user._id = token._id;
                session.user.accessToken = token.accessToken;
            }

            return session;
        }
    }
})

// Export the authentication handler for both GET and POST requests
export { handler as GET, handler as POST }
