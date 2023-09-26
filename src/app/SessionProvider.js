// Import necessary modules and components
import { SessionProvider } from "next-auth/react";

// Define a custom provider component that takes 'children' and 'session' as props
const Provider = ({ children, session }) => {
    return (
        // Provide the session context using SessionProvider and pass the 'session' prop
        <SessionProvider session={session}>
            {/* Render the child components */}
            {children}
        </SessionProvider>
    );
}

export default Provider; // Export the Provider component
