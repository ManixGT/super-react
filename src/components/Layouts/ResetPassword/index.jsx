import React, { useState } from 'react';
import { ReusableFormComponent } from "../../SharedUI/ReactForms";
import styles from './ResetPass.module.css'

const ResetPassword = () => {
    const [resetComplete, setResetComplete] = useState(false);

    const fields = [
        {
            name: 'password',
            label: 'New Password',
            type: 'password',
            placeholder: 'Enter new password',
            validation: {
                required: 'New password is required',
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must contain uppercase, lowercase, number and special character',
                },
            },
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm your new password',
            validation: {
                required: 'Please confirm your password',
                validate: (value, formValues) =>
                    value === formValues.password || 'Passwords do not match',
            },
        },
    ];

    const handleSubmit = (data) => {
        console.log('Password reset:', data);
        // Here you would typically send the password reset request to your API
        setResetComplete(true);
    };

    if (resetComplete) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.heading}>Password Reset Successful</h2>
                    <p className={styles.message}>Your password has been successfully reset.</p>
                    <button
                        className={styles.loginButton}
                        onClick={() => window.location.href = '/signin'}
                    >
                        Go to Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Reset Password</h2>
                <ReusableFormComponent
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText="Reset Password"
                />
            </div>
        </div>
    );
};

export default ResetPassword;