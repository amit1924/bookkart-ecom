import React from 'react'
import classes from './navbar.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const Navbar = () => {
  // Accessing the user session data
  const { data: session } = useSession()
  const books =useSelector((state)=>state.cart.books)

  // Checking if a user is logged in
  const isLoggedIn = Boolean(session?.user)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link href="/" className={classes.left}>
          <h2>bookKart</h2> {/* Displaying the store name */}
        </Link>
        <div className={classes.right}>
          {
            isLoggedIn
            ? (
              <button onClick={() => signOut()} className={classes.logoutButton}>
                Logout {/* Button to log out if user is logged in */}
              </button>
            )
            : (
              <>
                <button onClick={() => signIn()} className={classes.login}>
                  Log in {/* Button to log in if user is not logged in */}
                </button>
                <Link href='/register' className={classes.register}>
                  Register {/* Link to register page if user is not logged in */}
                </Link>
              </>
            )
          }
          {
            isLoggedIn &&
            <Link href='/cart' className={classes.cartContainer}>
              <AiOutlineShoppingCart className={classes.cartIcon}/> 
              {/* Cart icon */}
              <span className={classes.cartQuantity}>
            {books?.length}
              </span>
            </Link>
          }
        </div>
      </div>
 
      
    </div>
  )
}

export default Navbar // Exporting the Navbar component
