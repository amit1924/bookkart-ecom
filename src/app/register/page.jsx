"use client"

import React, { useState } from 'react'; // Import necessary modules
import classes from './register.module.css'; // Import CSS module
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { signIn } from 'next-auth/react'; // Import the signIn function from next-auth/react

const Register = () => {
    // Define state variables for username, email, and password
    const [username, setUsername] = useState(""); // Initialize username state
    const [email, setEmail] = useState(""); // Initialize email state
    const [password, setPassword] = useState(""); // Initialize password state

    // Define a function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if any field is empty
        if (username === "" || email === "" || password === "") {
            toast.error("Please enter all details"); // Display an error toast message
            return; // Exit the function
        }

        // Check if password is at least 6 characters long
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters"); // Display an error toast message
            return; // Exit the function
        }

        try {
            // Send a POST request to register the user
            const res = await fetch("https://bookkart-ecom-git-main-amit1924.vercel.app/api/register", {

                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });

            if (res.ok) {
                // Show success message if registration is successful
                toast.success("Successfully registered the user"); 

                // Redirect to login page after registration
                setTimeout(() => {
                    signIn(); 
                }, 1500);
            } else {
                toast.error("Registration failed"); // Display an error toast message
            }
        } catch (e) {
            // Handle any errors that occur during the registration process
            console.log(e.message); // Log the error message
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Register</h2>

                {/* Form for user registration */}
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder="Username.." onChange={(e) => setUsername(e.target.value)} />
                    <input type='email' placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className={classes.submitButton}>Register</button>

                    {/* Button to navigate to registration page */}
                    <button className={classes.registerNow} onClick={() => signIn()}>
                        don&apos;t have your account?<br /> Register Now
                    </button>
                </form>

            </div>

            {/* Component to display toast notifications */}
            <ToastContainer />
        </div>
    )
}

export default Register; // Export the Register component
