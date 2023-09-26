// Importing necessary modules and functions
// import getCorsHeaders from "@/lib/apiCors";
import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Review from "@/models/Review";

// GET method for handling GET requests
export async function GET(req) {
    // Establishing a connection to the database
    await db.connect()

    try {
        // Parsing the URL of the request to extract query parameters
        const url = new URL(req.url)
        const bookId = url.searchParams.get("bookId")

        // Querying the database to find reviews for a specific book
        const reviews = await Review.find({ bookId }).limit(16).populate("userId").select("-password")

        // Returning a response with the reviews data
        return new Response(JSON.stringify(reviews), { status: 200 })
    } catch (error) {
        // Handling any potential errors and logging them
        console.log(error)
    }
}

// POST method for handling POST requests
export async function POST(req) {
    // Establishing a connection to the database
    await db.connect()

    // Extracting the access token from the request headers
    const accessToken = req.headers.get("authorization")
    
    // Extracting the token value
    const token = accessToken.split(" ")[1]

    // Verifying the JWT token
    const decodedToken = verifyJwtToken(token)

    // Handling unauthorized access (invalid or expired token)
    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        // Parsing the request body as JSON
        const body = await req.json()

        // Creating a new review entry in the database
        const newReview = await Review.create(body)

        // Returning a response with the newly created review
        return new Response(JSON.stringify(newReview), { status: 201 })
    } catch (error) {
        // Handling any potential errors and returning a server error response
        return new Response(JSON.stringify(error), { status: 500 })
    }
}
 