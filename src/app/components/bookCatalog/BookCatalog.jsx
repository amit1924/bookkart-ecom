"use client"

// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // Importing required hooks from React
import classes from './bookCatalog.module.css'; // Importing CSS module
import Pagination from '../pagination/Pagination'; // Importing Pagination component
import BookCard from '../bookCard/BookCard'; // Importing BookCard component

const BookCatalog = () => {
  // Define state variables for managing title, books data, and loading state
  const [title, setTitle] = useState("the lord of the rings"); // Initialize title with a default value
  const [books, setBooks] = useState([]); // Initialize books with an empty array
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading with false
  const BASE_URL = `https://openlibrary.org/search.json?title=${title}`; // Constructing a URL for fetching book data

  // Define state variables for pagination
  const [itemOffset, setItemOffset] = useState(0); // Initialize itemOffset with 0
  const itemsPerPage = 3; // Define the number of items to display per page

  // useEffect is a hook that runs side effects in the component
  useEffect(() => {
    // This function is defined within a setTimeout to introduce a delay before fetching data
    const getData = setTimeout(async () => {
      try {
        setIsLoading(true); // Set isLoading to true, indicating data is being loaded

        // Fetch data from the Open Library API based on the provided title
        const res = await fetch(BASE_URL);
        const { docs } = await res.json();

        // Limit the number of books to the first 50
        let books = docs.slice(0, 50);

        // Transform fetched data into a more manageable format
        books = books.map((book) => {
          const id = book.key.split("/")[2];

          return {
            id: id,
            title: book.title,
            cover_id: book.cover_i,
            author_name: book.author_name,
            public_rating: book.ratings_average,
            published_year: book.first_published_year,
          };
        });

        // Filter out books with no cover information
        const formattedBooks = [];
        for (let i = 0; i < books.length; i++) {
          if (books[i]?.cover_id) {
            formattedBooks.push(books[i]);
          }
        }

        setBooks(formattedBooks); // Set the formatted books data
      } catch (error) {
        console.log(error); // Log any errors that occur during data fetching
      }
      setIsLoading(false); // Set isLoading back to false after data fetching
    });

    // Clear the timeout when component is unmounted to prevent memory leaks
    return () => {
      clearTimeout(getData);
    };
  }, [title,BASE_URL]); // Run this effect whenever 'title' changes

  // Calculate the end offset for pagination
  const endOffset = itemOffset + itemsPerPage;

  // Slice the books array based on the current pagination
  const currentItems = books.slice(itemOffset, endOffset);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Catalog of books</h5>
          <h2>Find your desired books</h2>
        </div>
        {isLoading && (
          <div className={classes.loader} />
        )}
        <div className={classes.books}>
          {!isLoading && (
            currentItems?.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))
          )}
        </div>
        {!isLoading && (
          <Pagination
            setItemOffset={setItemOffset}
            itemsPerPage={itemsPerPage}
            books={books}
          />
        )}
      </div>
    </div>
  );
}

export default BookCatalog;
