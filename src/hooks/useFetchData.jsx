import { useState, useEffect } from "react";
import axios from 'axios';

export const useFetchData = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(0);

    const fetchData = async (requestUrl = url, requestOptions = options) => {
        setLoading(true);
        setError(null);
        if (!requestUrl) {
            setLoading(false);
            return;
        }

        try {
            const config = {
                url: requestUrl,
                method: requestOptions.method || 'GET',
                headers: requestOptions.headers || {},
            };

            if (requestOptions.body && config.method !== 'GET') {
                config.data = requestOptions.body;
            }

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

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, options, trigger]);

    return {
        data,
        error,
        loading,
        refetch: () => setTrigger(prev => prev + 1),
        executeRequest: fetchData
    };
};