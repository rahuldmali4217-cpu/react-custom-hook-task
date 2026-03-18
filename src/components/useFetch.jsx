import { useState, useEffect, useCallback } from 'react';

const useFetch = (url) => {
    // Creating three states to track the API data, the loading status, and any errors
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // We use useCallback so this function is only recreated if the URL changes.
    // This prevents unnecessary re-renders in our application.
    const fetchData = useCallback(async () => {
        setLoading(true); // Start loading before the fetch begins
        try {
            const response = await fetch(url);
            
            // If the response is not okay (like a 404 error), we stop and show an error
            if (!response.ok) {
                throw new Error("Could not get the data from the server");
            }

            const result = await response.json();
            setData(result); // Save the fetched data into our state
            setError(null);  // Clear any previous errors
        } catch (err) {
            setError(err.message); // If something goes wrong, save the error message
        } finally {
            setLoading(false); // Stop the loading spinner whether we succeed or fail
        }
    }, [url]);

    // This useEffect runs the fetchData function whenever the component loads
    useEffect(() => {
        fetchData();
        
        // Cleanup function: This resets the data if the user leaves the page
        // It helps prevent memory issues in the browser
        return () => {
            setData(null);
            setLoading(false);
        };
    }, [fetchData]); // We add fetchData here because it is memoized with useCallback

    // Return these three values so any component can use them easily
    return { data, loading, error };
};

export default useFetch;