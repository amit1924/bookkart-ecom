"use client"

import React, { useState } from 'react'
import jwt from 'jsonwebtoken';

import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signIn} from 'next-auth/react'
import classes from './login.module.css'
import Link from 'next/link'

const Login = () => {
  // Define state variables for email and password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // Access the Next.js router
  const router = useRouter()

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if password or email is empty
    if (password === "" || email === "") {
      toast.error("Fill all fields!") // Display an error toast message
      return
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!") // Display an error toast message
      return
    }

    try {
      // Attempt to sign in using credentials
      const res = await signIn('credentials', { email, password, redirect: false })
      console.log(res)

      if(res?.error == null){
        // Redirect to home page if login is successful
        router.push('/')
      } else {
        toast.error("Error occurred while logging in") // Display an error toast message
      }
    } catch (error) {
      console.log(error) // Log any errors that occur during the login process
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for email and password */}
          <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
          
          {/* Button to submit the form */}
          <button className={classes.submitButton}>
            Log in
          </button>

          {/* Link to navigate to registration page */}
          <Link href='/register' className={classes.loginNow}>
          Don&apos;t have an account? <br /> Register now.
          </Link>
        </form>
      </div>
      
      {/* Component to display toast notifications */}
      <ToastContainer />
    </div>
  )
}

export default Login // Export the Login component
