"use client";

// Import necessary modules and components
import React, { useEffect, useState } from "react"; // Importing React and required hooks
import { BsFillCartFill } from "react-icons/bs"; // Importing cart icon
import Image from "next/image"; // Importing Image component from Next.js
import ReviewModal from "@/app/components/reviewModal/ReviewModal"; // Importing ReviewModal component
import classes from "./details.module.css"; // Importing CSS module for styling
import ReviewCard from "@/app/components/reviewCard/ReviewCard"; // Importing ReviewCard component
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from Redux
import { addBook } from "@/app/redux/cartSlice"; // Importing addBook action from Redux slice

const Details = (ctx) => {
  // Extracting book id from the route parameters
  const id = ctx.params.id;
  const URL = `https://openlibrary.org/works/${id}.json`; // Constructing URL for fetching book details
  const dispatch = useDispatch(); // Creating a dispatch function
  const [book, setBook] = useState({}); // Initializing state for book details
  const [reviews, setReviews] = useState([]); // Initializing state for reviews
  const [showModal, setShowModal] = useState(false); // Initializing state for modal visibility

  // Calculating price based on pages (five dollars per 100 pages)
  const price = ((book?.pages / 100) * 5).toFixed(2);

  // Fetching book details on component mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();

        // if book has no pages specified, make them 350 by default
        let pages = null;
        if (data?.excerpts) {
          pages = data?.excerpts[0]?.pages;
        } else {
          pages = 350;
        }

        const details = {
          title: data.title,
          desc: data.description.value,
          id: data.key.split("/")[2],
          cover_image: `https://covers.openlibrary.org/b/id/${data?.covers[0]}-L.jpg`,
          pages,
        };

        setBook(details);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [URL]);

  // Fetching reviews for the book
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://bookkart-ecom-git-main-amit1924.vercel.app/api/review?bookId=${id}`
        );
        const data = await res.json();

        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [id]);

  // Handling modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  // Handling adding book to the cart
  const handleAddToCart = () => {
    dispatch(
      addBook({
        ...book,
        quantity: 1,
        price,
      })
    );
  };

  console.log(book);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.bookDetails}>
          <div className={classes.left}>
            <Image
              src={book?.cover_image}
              height="750"
              width="350"
              alt="Book cover"
            />
          </div>
          <div className={classes.right}>
            <h1 className={classes.title}>{book?.title}</h1>
            <p className={classes.desc}>{book?.desc?.slice(0, 750)}</p>
            <div className={classes.section}>
              <span className={classes.price}>Price: ${price}</span>
              <span className={classes.book_pages}>Pages: {book?.pages}</span>
            </div>
            <div className={classes.section}>
              <button onClick={handleAddToCart} className={classes.cart}>
                Add to Cart
                <BsFillCartFill />
              </button>
              <button
                onClick={handleShowModal}
                className={classes.reviewButton}
              >
                Review Book
              </button>
            </div>
            {showModal && (
              <ReviewModal
                handleHideModal={handleHideModal}
                bookId={book?.id}
              />
            )}
          </div>
        </div>
        <div className={classes.reviews}>
          {reviews?.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
