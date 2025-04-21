import { useState } from 'react';
import styles from './SignUp.module.css';
import { ReusableFormComponent } from '../../SharedUI/ReactForms';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

// Get API URL from environment variables or use a default
const API_URL = "http://localhost:4000/api/v1";

const fields = [
    {
        name: 'name',
        label: 'name',
        type: 'text',
        placeholder: 'Enter your full name',
        validation: {
            required: 'Full name is required',
        },
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validation: {
            required: 'Email is required',
            pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
            },
        },
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        validation: {
            required: 'Password is required',
            minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            },
        },
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        validation: {
            required: 'Please confirm your password',
            validate: (value, formValues) =>
                value === formValues.password || 'Passwords do not match',
        },
    },
    {
        name: 'agreeTerms',
        label: 'I agree to the Terms of Service and Privacy Policy',
        type: 'checkbox',
        validation: {
            required: 'You must agree to the terms to continue',
        },
    },
];

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        setLoading(true);

        // Show loading toast
        const loadingToastId = toast.loading('Creating your account...');

        try {
            const response = await axios({
                url: `${API_URL}/auth/sign-up`,
                method: 'POST',
                data: formData,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Update loading toast to success
            toast.success(`Sign-up successful! Welcome, ${formData.name}!`, {
                id: loadingToastId,
            });

            // Redirect to login or dashboard after successful signup
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);

        } catch (err) {
            // Update loading toast to error
            const errorMessage = err.response?.data?.message || err.message || "Sign-up failed. Please try again.";
            toast.error(errorMessage, {
                id: loadingToastId,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Toast container */}
            <Toaster
                position="top-center"
                toastOptions={{
                    success: {
                        duration: 5000,
                        style: {
                            background: '#10B981',
                            color: 'white',
                        },
                    },
                    error: {
                        duration: 5000,
                        style: {
                            background: '#EF4444',
                            color: 'white',
                        },
                    },
                    loading: {
                        duration: Infinity,
                    },
                }}
            />

            <div className={styles.card}>
                <h1 className={styles.heading}>Create Account</h1>

                <ReusableFormComponent
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText={loading ? "Creating Account..." : "Sign Up"}
                    disabled={loading}
                />

                {loading && (
                    <div className={styles.loadingContainer}>
                        <CircularProgress size={24} />
                    </div>
                )}

                <p className={styles.loginLink}>
                    Already have an account? <a href="/signin">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;