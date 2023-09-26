import React from 'react'
import classes from './hero.module.css'


const Hero = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {/* Title */}
        <h2 className={classes.title}>Find your favorite books here</h2>
        {/* Description */}
        <p className={classes.desc}>
          Explore a wide range of genres and discover your next reading adventure.
        </p>
        {/* Input and Button */}
        <div className={classes.inputContainer}>
          <input type="email" placeholder="Enter your email address" />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
