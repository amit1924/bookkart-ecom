import React from 'react'; // Importing React
import woman_image from '../../assets/woman.jpg'; // Importing an image
import classes from './reviewCard.module.css'; // Importing CSS module for styling
import { format } from 'timeago.js'; // Importing a time formatting function
import Image from 'next/image'; // Importing an Image component from Next.js

// ReviewCard component definition
const ReviewCard = ({
  review // Review data passed as a prop
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          {/* Displaying an image using Next.js Image component */}
          <Image
            src={woman_image} // Source of the image
            alt="" // Alt text for the image
          />
          <div>
            {/* Displaying the username and review creation date */}
            <h3>{review?.userId?.username}</h3>
            <span>
              {format(review?.createdAt)} {/* Formatting the review creation date */}
            </span>
          </div>
        </div>
        <div className={classes.bottom}>
          <p className={classes.desc}>
            {review?.desc} {/* Displaying the review description */}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard; // Exporting the ReviewCard component
