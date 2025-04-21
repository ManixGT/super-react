import { useState, useEffect } from "react";
import axios from 'axios';

export const useFetchData = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(0);

    const fetchData = async (requestUrl = url, requestOptions = options) => {
        // Reset states
        setLoading(true);
        setError(null);

        // Validate inputs
        if (!requestUrl) {
            setLoading(false);
            return;
        }

        try {
            // Configure axios request
            const config = {
                url: requestUrl,
                method: requestOptions.method || 'GET',
                headers: requestOptions.headers || {},
            };

            // Add data if needed
            if (requestOptions.body && config.method !== 'GET') {
                config.data = requestOptions.body;
            }

            // Make the request
            const response = await axios(config);
            setData(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.message ||
                "An error occurred in API";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Execute the fetch when url or options change, or when manually triggered
    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, options, trigger]);

    // Return states and a way to manually trigger fetches
    return {
        data,
        error,
        loading,
        refetch: () => setTrigger(prev => prev + 1),
        executeRequest: fetchData
    };
};