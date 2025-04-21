import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReusableFormComponent } from "../../SharedUI/ReactForms";
import { Box, Typography, Button, Paper } from "@mui/material";
import styles from "./VerifyOtp.module.css";

function VerifyOtp(data) {
    const [timer, setTimer] = useState(60);
    const [verificationComplete, setVerificationComplete] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const contactInfo = location.state.medium;

    console.log(location, 'location');

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(t => t - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerifyOtp = (data) => {
        // API to verify the OTP
        setVerificationComplete(true);
        setTimeout(() => {
            navigate('/reset-password');
        }, 2000);
    };

    const handleResendOtp = () => {
        if (timer === 0) {
            console.log("Resending OTP to:", contactInfo);
            setTimer(60);
        }
    };

    const otpFields = [
        {
            name: "otp",
            label: "Verification Code",
            type: "otp",
            placeholder: "Enter 6-digit code",
            validation: {
                required: "Verification code is required",
                pattern: {
                    value: /^\d{6}$/,
                    message: "Code must be 6 digits",
                },
            },
            inputProps: {
                maxLength: 6,
                autoComplete: "one-time-code"
            }
        },
    ];

    if (verificationComplete) {
        return (
            <Box className={styles.container}>
                <Paper elevation={3} className={styles.card}>
                    <Box className={styles.successContent}>
                        <Typography variant="h5" className={styles.heading}>
                            Verification Successful
                        </Typography>
                        <Typography variant="body1" className={styles.message}>
                            Your identity has been verified successfully.
                        </Typography>
                        <Typography variant="body2" className={styles.redirectMessage}>
                            Redirecting you to Reset Password...
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        );
    };

    return (
        <Box className={styles.container}>
            <Paper elevation={3} className={styles.card}>
                <Typography variant="h5" className={styles.heading}>
                    Verify By {contactInfo === "number" ? "Phone" : "Email"}
                </Typography>

                <Typography variant="body2" className={styles.infoText}>
                    We've sent a 6-digit verification code to {contactInfo}
                </Typography>

                <ReusableFormComponent
                    fields={otpFields}
                    onSubmit={handleVerifyOtp}
                    submitButtonText="Verify Code"
                />

                <Box className={styles.resendContainer}>
                    <Button
                        variant="text"
                        onClick={handleResendOtp}
                        disabled={timer > 0}
                        style={{ color: "black", border: "1px solid red" }}
                        className={timer > 0 ? styles.disabled : ""}
                    >
                        Resend Code {timer > 0 && `(${timer}s)`}
                    </Button>
                </Box>

                <Box className={styles.linkContainer}>
                    Back to? {" "}
                    <Link to="/signin" className={styles.link}>
                        Sign In
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}

export default VerifyOtp