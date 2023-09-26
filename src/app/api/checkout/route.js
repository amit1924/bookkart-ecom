// Importing a function to get CORS headers
import getCorsHeaders from "@/lib/apiCors";

// Importing the Stripe library
import Stripe from "stripe";

// Creating a new instance of the Stripe object with the private key
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// Handling POST request
export async function POST(req) {
  try {
    // Parsing the JSON body of the request
    const body = await req.json();

    // Creating a new session using the Stripe API
    const session = await stripe.checkout.sessions.create({
      line_items: body,
      mode: "payment",
      payment_method_types: ["card"],
      success_url:
        "https://bookkart-ecom-git-main-amit1924.vercel.app/success",
      cancel_url:
        "https://bookkart-ecom-git-main-amit1924.vercel.app/",
    });

    // Logging the session information
    console.log(session);

    // Returning the session information as a JSON response
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (error) {
    // Handling any potential errors
    console.error(error);
  }
}
