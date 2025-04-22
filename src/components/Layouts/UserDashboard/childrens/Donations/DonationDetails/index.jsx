// DonationDetails.jsx
import { useState } from 'react';
import styles from './DonationDetails.module.css';

export default function DonationDetails() {
    const [donationAmount, setDonationAmount] = useState(100);
    const [customAmount, setCustomAmount] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [step, setStep] = useState(1); // 1: amount selection, 2: details, 3: confirmation

    const predefinedAmounts = [50, 100, 250, 500, 1000];

    const handleSelectAmount = (amount) => {
        setDonationAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setCustomAmount(value);
            if (value !== '') {
                setDonationAmount(parseInt(value, 10));
            }
        }
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else if (step === 3) {
            setStep(2);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Donation successful! Thank you for your contribution.');
        // Handle form submission logic here
    };

    return (
        <div className={styles.container}>
            {step === 1 && (
                <div className={styles.stepContent}>
                    <h1 className={styles.title}>Choose Donation Amount</h1>
                    <p className={styles.subtitle}>Select an amount to contribute</p>

                    <div className={styles.amountGrid}>
                        {predefinedAmounts.map(amount => (
                            <button
                                key={amount}
                                className={`${styles.amountButton} ${donationAmount === amount ? styles.selected : ''}`}
                                onClick={() => handleSelectAmount(amount)}
                            >
                                ₹{amount}
                            </button>
                        ))}
                        <div className={styles.customAmountWrapper}>
                            <span className={styles.currencySymbol}>₹</span>
                            <input
                                type="text"
                                className={styles.customAmountInput}
                                placeholder="Custom"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                            />
                        </div>
                    </div>

                    <button
                        className={styles.nextButton}
                        onClick={handleNext}
                        disabled={!donationAmount}
                    >
                        Continue
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className={styles.stepContent}>
                    <h1 className={styles.title}>Donation Details</h1>
                    <p className={styles.subtitle}>Complete your donation information</p>

                    <form className={styles.form}>
                        <div className={styles.anonymousOption}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={isAnonymous}
                                    onChange={() => setIsAnonymous(!isAnonymous)}
                                    className={styles.checkbox}
                                />
                                <span className={styles.checkmark}></span>
                                Donate anonymously
                            </label>
                        </div>

                        {!isAnonymous && (
                            <>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.label}>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={styles.input}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className={styles.input}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Message (Optional)</label>
                            <textarea
                                id="message"
                                className={styles.textarea}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Add a message with your donation"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.backButton}
                                onClick={handleBack}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className={styles.nextButton}
                                onClick={handleNext}
                            >
                                Review Donation
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div className={styles.stepContent}>
                    <h1 className={styles.title}>Confirm Your Donation</h1>
                    <p className={styles.subtitle}>Please review your donation details</p>

                    <div className={styles.summaryCard}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Amount</span>
                            <span className={styles.summaryValue}>₹{donationAmount}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Donor</span>
                            <span className={styles.summaryValue}>
                                {isAnonymous ? 'Anonymous' : name || 'Not provided'}
                            </span>
                        </div>

                        {!isAnonymous && (
                            <>
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Email</span>
                                    <span className={styles.summaryValue}>{email || 'Not provided'}</span>
                                </div>

                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>Phone</span>
                                    <span className={styles.summaryValue}>{phone || 'Not provided'}</span>
                                </div>
                            </>
                        )}

                        {message && (
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Message</span>
                                <span className={styles.summaryValue}>{message}</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.backButton}
                            onClick={handleBack}
                        >
                            Edit Details
                        </button>
                        <button
                            className={styles.confirmButton}
                            onClick={handleSubmit}
                        >
                            Confirm Donation
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}