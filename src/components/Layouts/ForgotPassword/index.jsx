import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReusableFormComponent } from '../../SharedUI/ReactForms';
import styles from './ForgotPass.module.css';

function ForgotPassword() {
    const [medium, setMedium] = useState(null); // 'email' or 'mobile'
    const navigate = useNavigate();
    const fields = [
        {
            name: 'contact',
            label: 'Email or Mobile Number',
            type: 'text',
            placeholder: 'Enter your email or mobile number',
            validation: {
                required: 'This field is required',
                validate: (value) => {
                    const emailPattern = /^\S+@\S+$/i;
                    const mobilePattern = /^[6-9]\d{9}$/;
                    if (!emailPattern.test(value) && !mobilePattern.test(value)) {
                        return 'Enter a valid email or 10-digit mobile number';
                    }
                    return true;
                },
            },
        },
    ];

    const handleSubmit = (data) => {
        console.log(data, 'data101');
        const value = data.contact;
        const isEmail = /^\S+@\S+$/i.test(value);
        const isMobile = /^[6-9]\d{9}$/.test(value);

        let mediumType = null;

        if (isEmail) {
            console.log('Send OTP to email:', value);
            mediumType = 'email';
        } else if (isMobile) {
            console.log('Send OTP to mobile:', value);
            mediumType = 'number';
        }

        // Navigate to the verify-otp page with the correct medium
        navigate('/verify-otp', { state: { contact: value, medium: mediumType } });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Forgot Password</h2>
                <p className={styles.subheading}>
                    Enter your email or mobile number. We'll send an Verification Code to verify your identity.
                </p>
                <ReusableFormComponent
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText="Send OTP"
                />
                <div className={styles.loginLinkContainer}>
                    Remember your password?{' '}
                    <Link to="/signin" className={styles.link}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
