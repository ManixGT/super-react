import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReusableFormComponent } from "../../SharedUI/ReactForms";
import styles from "./LoginWithOtp.module.css";

function LoginWithOtp() {
    const [showOtpField, setShowOtpField] = useState(false);
    const [timer, setTimer] = useState(60);
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        let interval;
        if (showOtpField && timer > 0) {
            interval = setInterval(() => {
                setTimer(t => t - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showOtpField, timer]);

    const handleSendOtp = (data) => {
        console.log("Sending OTP to:", data.phone);
        setPhoneNumber(data.phone);
        setShowOtpField(true);
        setTimer(60);
    };

    const handleVerifyOtp = (data) => {
        console.log("Verifying OTP:", data.otp, "for phone:", phoneNumber);
        // Here you would typically send the OTP to your backend for verification
    };

    const handleResendOtp = () => {
        if (timer === 0) {
            console.log("Resending OTP to:", phoneNumber);
            setTimer(60);
            // Here you would call your API to resend the OTP
        }
    };

    // const phoneFields = [
    //     {
    //         name: "phone",
    //         label: "Phone Number",
    //         type: "telephone",
    //         placeholder: "Enter your phone number",
    //         validation: {
    //             required: "Phone number is required",
    //             pattern: {
    //                 value: /^\d{10}$/,
    //                 message: "Please enter a valid 10-digit phone number",
    //             },
    //         },
    //     },
    // ];

    const otpFields = [
        {
            name: "otp",
            label: "One-Time Password",
            type: "otp",
            placeholder: "Enter 6-digit OTP",
            validation: {
                required: "OTP is required",
                pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be 6 digits",
                },
            },
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>OTP Login</h2>

                {!showOtpField ? (
                    <>
                        <ReusableFormComponent
                            fields={otpFields}
                            onSubmit={handleSendOtp}
                            submitButtonText="Send OTP"
                        />
                    </>
                ) : (
                    <>
                        <p className={styles.message}>
                            OTP has been sent to {phoneNumber}
                        </p>
                        <ReusableFormComponent
                            fields={otpFields}
                            onSubmit={handleVerifyOtp}
                            submitButtonText="Verify OTP"
                        />
                        <div className={styles.resendContainer}>
                            <button
                                className={`${styles.resendButton} ${timer > 0 ? styles.disabled : ""}`}
                                onClick={handleResendOtp}
                                disabled={timer > 0}
                                type="button"
                            >
                                Resend OTP {timer > 0 && `(${timer}s)`}
                            </button>
                        </div>
                    </>
                )}

                <div className={styles.linkContainer}>
                    <Link to="/signin" className={styles.link}>
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginWithOtp;