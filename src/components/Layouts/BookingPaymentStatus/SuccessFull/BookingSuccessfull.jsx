// BookingConfirmation.jsx
import { useState, useEffect } from 'react';
import { Check, Download, Receipt, Home } from 'lucide-react';
import styles from './success.module.css';

export default function BookingConfirmation() {
    const [animationComplete, setAnimationComplete] = useState(false);

    // Trigger animation after component mounts
    useEffect(() => {
        setTimeout(() => setAnimationComplete(true), 500);
    }, []);

    return (
        <div className={styles.container}>
            {/* Success Icon with Animation */}
            <div className={styles.iconWrapper}>
                <div className={`${styles.checkCircle} ${animationComplete ? styles.scaleIn : ''}`}>
                    <Check className={styles.checkIcon} strokeWidth={3} />
                </div>
            </div>

            {/* Congratulations Message */}
            <h1 className={styles.title}>Booking Confirmed!</h1>
            <p className={styles.message}>Your booking has been successfully confirmed. Thank you!</p>

            {/* Booking Details Card */}
            <div className={styles.card}>
                <div className={styles.cardRow}>
                    <span className={styles.label}>Booking ID</span>
                    <span className={styles.value}>#BKG12345</span>
                </div>
                <div className={styles.cardRow}>
                    <span className={styles.label}>Date</span>
                    <span className={styles.value}>April 22, 2025</span>
                </div>
                <div className={styles.cardRow}>
                    <span className={styles.label}>Amount Paid</span>
                    <span className={styles.value}>₹1,499</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonGrid}>
                <button className={styles.button}>
                    <Download size={18} />
                    <span>Download Ticket</span>
                </button>
                <button className={styles.button}>
                    <Receipt size={18} />
                    <span>Download Receipt</span>
                </button>
                <button className={`${styles.button} ${styles.homeButton}`}>
                    <Home size={18} />
                    <span>Go to Home</span>
                </button>
            </div>
        </div>
    );
}