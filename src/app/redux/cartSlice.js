import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart slice
const initialState = {
    books: []
}

// Create a slice of the Redux store for the cart
export const cartSlice = createSlice({
    name: 'cart', // Name of the slice
    initialState, // Initial state
    reducers: {
        // Define reducer functions to handle actions
        addBook: (state, action) => {
            // Check if the book already exists in the cart
            const book = state.books.find((book) => book.id === action.payload.id)

            if (book) {
                // If the book exists, update its quantity
                book.quantity = action.payload.quantity
            } else {
                // If the book doesn't exist, add it to the cart
                state.books.push(action.payload)
            }
        },
        removeBook: (state, action) => {
            // Remove the book with the specified id from the cart
            state.books = state.books.filter((book) => book.id !== action.payload.id)
        }
    }
})

// Export action creators
export const { addBook, removeBook } = cartSlice.actions

// Export the reducer function
export default cartSlice.reducer
