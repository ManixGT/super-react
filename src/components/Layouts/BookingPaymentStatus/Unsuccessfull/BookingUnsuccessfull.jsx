// BookingFailed.jsx
import { useState, useEffect } from 'react';
import { X, RefreshCw, Phone, Home } from 'lucide-react';
import styles from './unsuccesfull.module.css';

export default function BookingFailed() {
    const [animationComplete, setAnimationComplete] = useState(false);

    // Trigger animation after component mounts
    useEffect(() => {
        setTimeout(() => setAnimationComplete(true), 500);
    }, []);

    return (
        <div className={styles.container}>
            {/* Failed Icon with Animation */}
            <div className={styles.iconWrapper}>
                <div className={`${styles.errorCircle} ${animationComplete ? styles.scaleIn : ''}`}>
                    <X className={styles.errorIcon} strokeWidth={3} />
                </div>
            </div>

            {/* Failed Message */}
            <h1 className={styles.title}>Booking Failed</h1>
            <p className={styles.message}>We couldn't complete your booking process. Please try again or contact support.</p>

            {/* Error Details Card */}
            <div className={styles.card}>
                <div className={styles.cardRow}>
                    <span className={styles.label}>Reference ID</span>
                    <span className={styles.value}>#ERR45678</span>
                </div>
                <div className={styles.cardRow}>
                    <span className={styles.label}>Date</span>
                    <span className={styles.value}>April 22, 2025</span>
                </div>
                <div className={styles.cardRow}>
                    <span className={styles.label}>Status</span>
                    <span className={styles.errorValue}>Payment Failed</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonGrid}>
                <button className={styles.button}>
                    <RefreshCw size={18} />
                    <span>Try Again</span>
                </button>
                <button className={styles.button}>
                    <Phone size={18} />
                    <span>Contact Support</span>
                </button>
                <button className={`${styles.button} ${styles.homeButton}`}>
                    <Home size={18} />
                    <span>Go to Home</span>
                </button>
            </div>
        </div>
    );
}