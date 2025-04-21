import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReusableFormComponent } from '../../SharedUI/ReactForms';
import styles from './ForgotPass.module.css';

function ForgotPassword() {
    const [otpSent, setOtpSent] = useState(false);
    const [medium, setMedium] = useState(null); // 'email' or 'mobile'

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
        const value = data.contact;
        const isEmail = /^\S+@\S+$/i.test(value);
        const isMobile = /^[6-9]\d{9}$/.test(value);

        if (isEmail) {
            console.log('Send OTP to email:', value);
            setMedium('email');
        } else if (isMobile) {
            console.log('Send OTP to mobile:', value);
            setMedium('mobile');
        }

        setOtpSent(true);
    };

    if (otpSent) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.heading}>OTP Sent</h2>
                    <p className={styles.message}>
                        We've sent an OTP to your {medium === 'email' ? 'email address' : 'mobile number'}.
                    </p>
                    <Link to="/verify-otp" className={styles.link}>
                        Verify OTP
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Forgot Password</h2>
                <p className={styles.subheading}>
                    Enter your email or mobile number. We'll send an OTP to verify your identity.
                </p>
                <ReusableFormComponent
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText="Send OTP"
                />
                <div className={styles.loginLinkContainer}>
                    <Link to="/signin" className={styles.link}>
                        Remember your password? Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
