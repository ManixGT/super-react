import React, { useState } from 'react';
import styles from './bookEvent.module.css';
import {
    CalendarToday,
    AccessTime,
    LocationOn,
    Person,
    Collections,
    People,
    ArrowBack,
    Share
} from '@mui/icons-material';

const BookEventScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        numberOfTickets: 1
    });

    const eventDetails = {
        title: "Yoga & Meditation Retreat",
        description: "Join us for a transformative weekend of yoga, meditation, and spiritual teachings. This retreat is designed to help you reconnect with your inner self, rejuvenate your mind and body, and learn ancient techniques that can be applied to modern daily life. The retreat includes guided meditation sessions, yoga classes suitable for all levels, healthy vegetarian meals, and insightful discussions on spiritual philosophy.",
        date: "May 12-14, 2025",
        time: "Starts at 4:00 PM",
        location: "Rishikesh Ashram, Peaceful Hills, Rishikesh",
        host: "Pandit Kumar Viswas Ji",
        bannerImage: "/assets/kv-banner.jpg",
        price: "45"
    };

    const GST_RATE = 0.18; // 18% GST
    const PLATFORM_FEE = 5; // Flat $5 platform fee

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateTotal = () => {
        const ticketPrice = parseFloat(eventDetails.price.replace('$', ''));
        const ticketCost = ticketPrice * formData.numberOfTickets;
        const gst = ticketCost * GST_RATE;
        const total = ticketCost + gst + PLATFORM_FEE;
        return {
            ticketCost: ticketCost.toFixed(2),
            gst: gst.toFixed(2),
            total: total.toFixed(2)
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { total } = calculateTotal();
        console.log("Form submitted:", formData);
        alert(`Proceeding to payment. Total amount: $${total}`);
    };

    const { ticketCost, gst, total } = calculateTotal();

    return (
        <div className={styles.container}>
            <img
                className={styles.bannerImage}
                style={{ backgroundImage: `url(${eventDetails.bannerImage})` }}
            />

            <div className={styles.eventContent}>
                <h1 className={styles.eventTitle}>{eventDetails.title}</h1>

                <div className={styles.eventInfoCards}>
                    <div className={styles.infoCard}>
                        <CalendarToday className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Date</p>
                            <p className={styles.infoValue}>{eventDetails.date}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <AccessTime className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Time</p>
                            <p className={styles.infoValue}>{eventDetails.time}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <LocationOn className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Location</p>
                            <p className={styles.infoValue}>{eventDetails.location}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <Person className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Host</p>
                            <p className={styles.infoValue}>{eventDetails.host}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bookingForm}>
                <h3>Book Your Tickets</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="numberOfTickets">Number of Tickets</label>
                        <select
                            id="numberOfTickets"
                            name="numberOfTickets"
                            value={formData.numberOfTickets}
                            onChange={handleChange}
                            required
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.priceBreakdown}>
                        <div className={styles.taxes}>
                            <p>{" "} Ticket Cost: ${ticketCost}</p>
                            <p>+GST(18%):${gst}</p>
                            <p>+PlatformFee:${PLATFORM_FEE.toFixed(2)}</p>
                        </div>
                        <div className={styles.totalPrice}>
                            <p>Total: ${total}</p>
                        </div>
                    </div>

                    <button type="submit" className={styles.paymentButton}>
                        Proceed to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookEventScreen;