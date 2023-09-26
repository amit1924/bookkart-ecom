"use client"

// Importing necessary modules and components
import React, { useCallback, useEffect, useState } from 'react';
import classes from './reviewModal.module.css'; // Importing CSS module for styling
import { AiOutlineClose } from 'react-icons/ai'; // Importing close icon
import { useSession } from 'next-auth/react'; // Importing useSession hook from NextAuth

// ReviewModal component definition
const ReviewModal = ({
  handleHideModal, // Function to handle modal hiding
  bookId // ID of the book for which the review is being written
}) => {
  const { data: session } = useSession(); // Getting user session information
  const [rating, setRating] = useState(1); // State for the review rating (default: 1)
  const [desc, setDesc] = useState(""); // State for the review description (default: empty string)

  // Function to handle the 'Escape' key press event
  const escapeFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      handleHideModal(); // Call the function to hide the modal
    }
  });

  // Adding event listener for the 'Escape' key press when the component mounts
  useEffect(() => {
    document.addEventListener("keydown", escapeFunction, false);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", escapeFunction, false);
    }
  }, [escapeFunction]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      if (!rating || !desc) {
        return; // If rating or description is missing, do nothing
      }

      const headers = {
        "Authorization": `Bearer ${session?.user?.accessToken}`, // Authorization header with user access token
        "Content-Type": "application/json" // Content-Type header for JSON data
      }

      const body = {
        rating: Number(rating), // Convert rating to a number
        desc, // Review description
        bookId, // ID of the book being reviewed
        userId: session?.user?._id // User ID from the session information
      }

      const res = await fetch("http://localhost:3000/api/review", {
        headers, // Set request headers
        method: "POST", // HTTP method: POST
        body: JSON.stringify(body) // Convert body data to JSON string
      });

      console.log(await res.json()); // Log the response data

      if (res.ok) {
        window.location.reload(); // Reload the page to reflect the updated review
        handleHideModal(); // Call the function to hide the modal
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during the process
    }
  }

  // JSX content for the ReviewModal component
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>
          Write a review
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="number" step={0.1} min={1} max={10} onChange={(e) => setRating(e.target.value)} placeholder="8.5" />
          <input type="text" onChange={(e) => setDesc(e.target.value)} placeholder="This book is a pleas...." />
          <button>
            Submit
          </button>
        </form>
        <AiOutlineClose
          className={classes.closeIcon}
          size={20}
          onClick={handleHideModal} // Click handler to close the modal
        />
      </div>
    </div>
  )
}

export default ReviewModal; // Export the ReviewModal component
