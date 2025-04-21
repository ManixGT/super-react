import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './EventDetailsPage.module.css';

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

const eventData = {
    id: 1,
    title: "Yoga & Meditation Retreat",
    description: "Join us for a transformative weekend of yoga, meditation, and spiritual teachings. This retreat is designed to help you reconnect with your inner self, rejuvenate your mind and body, and learn ancient techniques that can be applied to modern daily life. The retreat includes guided meditation sessions, yoga classes suitable for all levels, healthy vegetarian meals, and insightful discussions on spiritual philosophy.",
    date: "May 12-14, 2025",
    time: "Starts at 4:00 PM",
    location: "Rishikesh Ashram, Peaceful Hills, Rishikesh",
    host: "Pandit Kumar Viswas Ji",
    totalGuests: 42,
    isLive: true,
    bannerImage: "/assets/kv-banner.jpg",
    galleryImages: [
        "/path/to/gallery1.jpg",
        "/path/to/gallery2.jpg",
        "/path/to/gallery3.jpg",
        "/path/to/gallery4.jpg",
    ]
};

const EventDetailsPage = ({ isAdmin = true }) => {
    const navigate = useNavigate();
    const [showGuestList, setShowGuestList] = useState(false);
    const [handler, setHandler] = useState('admin');

    const guestList = [
        { id: 1, name: "Rahul Singh", email: "rahul@example.com", ticketType: "Premium" },
        { id: 2, name: "Priya Sharma", email: "priya@example.com", ticketType: "Standard" },
        { id: 3, name: "Amit Kumar", email: "amit@example.com", ticketType: "Premium" },
        { id: 4, name: "Sneha Patel", email: "sneha@example.com", ticketType: "Standard" },
        { id: 5, name: "Vikram Malhotra", email: "vikram@example.com", ticketType: "Premium" },
    ];

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
        },
        tap: { scale: 0.95 }
    };

    const GuestListPopup = () => (
        <div className={styles.guestListOverlay}>
            <div className={styles.guestListPopup}>
                <div className={styles.guestListHeader}>
                    <h3>Guest List ({eventData.totalGuests})</h3>
                    <button
                        className={styles.closeButton}
                        onClick={() => setShowGuestList(false)}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.guestListContent}>
                    <table className={styles.guestTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Ticket Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guestList.map(guest => (
                                <tr key={guest.id}>
                                    <td>{guest.name}</td>
                                    <td>{guest.ticketType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            {/* Top navigation */}
            <div className={styles.topNav}>
                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBack />
                </button>
                <button className={styles.shareButton}>
                    <Share />
                </button>
            </div>

            <img
                className={styles.bannerImage}
                style={{ backgroundImage: `url(${eventData.bannerImage})` }}
            />

            <div className={styles.eventContent}>
                <h1 className={styles.eventTitle}>{eventData.title}</h1>

                <div className={styles.eventInfoCards}>
                    <div className={styles.infoCard}>
                        <CalendarToday className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Date</p>
                            <p className={styles.infoValue}>{eventData.date}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <AccessTime className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Time</p>
                            <p className={styles.infoValue}>{eventData.time}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <LocationOn className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Location</p>
                            <p className={styles.infoValue}>{eventData.location}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <Person className={styles.infoIcon} />
                        <div>
                            <p className={styles.infoLabel}>Host</p>
                            <p className={styles.infoValue}>{eventData.host}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>About Event</h2>
                    <p className={styles.eventDescription}>{eventData.description}</p>
                </div>

                <button
                    className={styles.galleryButton}
                    onClick={() => navigate(`/events/${eventData.id}/gallery`)}
                >
                    <Collections className={styles.buttonIcon} />
                    View Event Gallery
                </button>

                {isAdmin && (
                    <div className={styles.adminSection}>
                        <div className={styles.guestsCard}>
                            <div className={styles.guestsInfo}>
                                <People className={styles.guestsIcon} />
                                <div>
                                    <p className={styles.guestsLabel}>Total Guests</p>
                                    <p className={styles.guestsCount}>{eventData.totalGuests}</p>
                                </div>
                            </div>
                            <button
                                className={styles.guestListButton}
                                onClick={() => setShowGuestList(true)}
                            >
                                {handler === 'admin' ? 'Guest List' : 'Book Now'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {eventData.isLive && !isAdmin && (
                <motion.button
                    className={styles.bookNowButton}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => navigate(`/events/${eventData.id}/booking`)}
                >
                    Book Now
                </motion.button>
            )}

            {showGuestList && <GuestListPopup />}
        </div>
    );
};

export default EventDetailsPage;