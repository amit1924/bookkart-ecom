import React from 'react'; // Import the React module
import classes from './pagination.module.css'; // Import the CSS module for styling
import ReactPaginate from 'react-paginate'; // Import the ReactPaginate component for pagination
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; // Import arrow icons from the react-icons library

const Pagination = ({ // Define the Pagination functional component with props: setItemOffset, itemsPerPage, and books
  setItemOffset, // Function to set the item offset for pagination
  itemsPerPage, // Number of items to display per page
  books // Array of books for pagination
}) => {
  const handlePageClick = (event) => { // Define a function to handle page click events
    console.log(event.selected, "event.selected"); // Log the selected page number
    const newOffset = (event.selected * itemsPerPage) % books?.length; // Calculate the new item offset based on the selected page

    setItemOffset(newOffset); // Set the new item offset using the provided function
  }

  return (
    <ReactPaginate // Render the ReactPaginate component for pagination
      nextClassName={`${classes.item} ${classes.nextArrow}`} // Define CSS classes for the next arrow button
      previousClassName={`${classes.item} ${classes.previousArrow}`} // Define CSS classes for the previous arrow button
      pageClassName={`${classes.item}`} // Define CSS classes for individual page numbers
      activeClassName={`${classes.item} ${classes.active}`} // Define CSS classes for the active page
      breakClassName={`${classes.item}`} // Define CSS classes for page breaks
      containerClassName={`${classes.pagination}`} // Define CSS classes for the pagination container
      breakLabel="..." // Label for page breaks
      previousLabel={<AiOutlineArrowLeft size={25} />} // Render the left arrow icon for previous page
      nextLabel={<AiOutlineArrowRight size={25} />} // Render the right arrow icon for next page
      onPageChange={handlePageClick} // Provide the function to handle page changes
      pageRangeDisplayed={5} // Number of pages to display in the pagination
      pageCount={books?.length / itemsPerPage} // Total number of pages based on the number of items and items per page
      renderOnZeroPageCount={null} // Render nothing if there are no pages
    />
  );
}

export default Pagination; // Export the Pagination component for use in other parts of the application
