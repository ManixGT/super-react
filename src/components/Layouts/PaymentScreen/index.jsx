import React, { useState } from 'react';
import styles from './paymentScreen.module.css';

const PaymentScreen = () => {//take eventDetails from props
    const [loading, setLoading] = useState(false);

    const eventDetails = {
        title: "Jazz Night with The City Quartet",
        date: "May 12, 2025",
        time: "8:00 PM - 10:30 PM",
        location: "Blue Note Jazz Club",
        price: "$45.00",
        tickets: 2,
        totalAmount: 90.00
    };

    const initializeRazorpayPayment = () => {

    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Confirm Your Payment</h2>

            <div className={styles.orderSummary}>
                <h3>Order Summary</h3>
                <div className={styles.eventDetails}>
                    <h4>{eventDetails.title}</h4>
                    <p>{eventDetails.date} | {eventDetails.time}</p>
                    <p>{eventDetails.location}</p>
                </div>

                <div className={styles.priceBreakdown}>
                    <div className={styles.priceRow}>
                        <span>Price per ticket</span>
                        <span>{eventDetails.price}</span>
                    </div>
                    <div className={styles.priceRow}>
                        <span>Number of tickets</span>
                        <span>{eventDetails.tickets}</span>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={`${styles.priceRow} ${styles.total}`}>
                        <span>Total Amount</span>
                        <span>${eventDetails.totalAmount.toFixed(2)}</span>
                    </div>
                    <button
                        className={styles.paymentButton}
                        onClick={initializeRazorpayPayment}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>

                    <p className={styles.secureNote}>
                        <span className={styles.lockIcon}>🔒</span> Your payment information is secure
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentScreen;

// Note: To fully implement RazorPay, you would need to:
// 1. Add the RazorPay script to your HTML:
//    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
// 2. Create a backend endpoint to create RazorPay orders
// 3. Implement payment verification on your backend