import React from 'react';  // Importing React module
import classes from './bookCard.module.css';  // Importing CSS module for styling
import Link from 'next/link';  // Importing Link component from Next.js for navigation
import Image from 'next/image';  // Importing Image component from Next.js for displaying images

const BookCard = ({ book }) => {  // Creating a functional component named BookCard, which takes a 'book' prop
  const coverImage = `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;  // Creating a URL for the book cover image based on the 'cover_id' of the book

  return (
    <Link href={`/details/${book.id}`} className={classes.container}>  {/* Creating a Link that navigates to the details page of the book */}
      <div className={classes.wrapper}>  {/* Creating a wrapper div */}
        <Image 
          src={coverImage}  // Setting the source of the image to the generated URL
          alt="book cover"  // Providing an alternate text for the image
          height='275'  // Setting the height of the image
          width='175'   // Setting the width of the image
        />
      </div>
    </Link>
  );
}

export default BookCard;  // Exporting the BookCard component to be used in other parts of the application
