"use client"
import React from "react"; // Importing React library
import classes from "./cart.module.css"; // Importing CSS module for styling
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon
import Link from "next/link"; // Importing Link component from Next.js for navigation
import Image from "next/image"; // Importing Image component from Next.js for image display
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from React Redux for managing state
import { removeBook } from "../redux/cartSlice"; // Importing the removeBook action from the cartSlice
import { loadStripe } from "@stripe/stripe-js"; // Importing the loadStripe function from Stripe SDK for payment processing

const Cart = () => {
  // Getting the books from the cart state using useSelector
  const { books } = useSelector((state) => state.cart);

  // Getting the dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Loading Stripe with the public key
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  // Calculating the total price of the books in the cart
  let totalPrice = 0;
  books.map((book) => (totalPrice += book.quantity * book.price));

  // Function to handle removing a book from the cart
  const handleRemoveBook = (book) => {
    dispatch(removeBook({ id: book?.id }));
  };

  // Function to handle the checkout process
  const handleCheckout = async () => {
    // Creating line items for the checkout session
    const lineItems = books.map((book) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: book.title,
          },
          unit_amount: book.price * 100,
        },
        quantity: book.quantity,
      };
    });

//     // Making a POST request to create a checkout session
    const res = await fetch(
      "http://localhost:3000/api/checkout",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(lineItems),
      }
    );

    // Parsing the response to get the checkout session ID
    const data = await res.json();

    // Getting the Stripe instance
    const stripe = await stripePromise;

    // Redirecting to the checkout page with the session ID
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  console.log(books.length); // Logging the number of books in the cart

  return (
    <div className={classes.container}>
      {books?.length > 0 && <h2>Your cart</h2>}
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {books?.length > 0 ? (
            books?.map((book) => {
              return (
                <div key={book.id} className={classes.book}>
                  <div
                    className={classes.closeBtn}
                    onClick={() => handleRemoveBook(book)}
                  >
                    <AiOutlineClose />
                  </div>
                  <Link href={`/details/${book.id}`}>
                    <Image
                      src={book?.cover_image}
                      width="175"
                      height="375"
                      className={classes.img}
                      alt={book?.title} // Add alt prop with meaningful text (in this case, the title of the book)
                    />
                  </Link>
                  <div className={classes.bookData}>
                    <h3 className={classes.title}>{book?.title}</h3>
                    <div className={classes.bookAndQuantity}>
                      <span className={classes.quantity}>
                        {book.quantity} x
                      </span>
                      <span className={classes.price}>
                        <span>$</span>
                        {book?.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className={classes.noBooks}>
              No books in the cart. Go Shopping!
            </h1>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.totalBookMsg}>
            Total books: {books?.length}
          </div>
          <div className={classes.subtotalCheckoutBtns}>
            <span className={classes.subtotal}>
              Subtotal: ${totalPrice > 100 ? totalPrice : totalPrice + 5}
            </span>
            <span
              onClick={handleCheckout}
              disabled={books?.length === 0}
              className={classes.orderNowBtn}
            >
              Order
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; // Exporting the Cart component
