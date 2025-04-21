// UserDashboard.jsx
import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserDashboard.module.css';

// Import icons
import {
    LiveTv,
    Favorite,
    Event,
    MenuBook,
    Notifications,
    History,
    Settings
} from '@mui/icons-material';

// Mock user data
const userData = {
    name: "Ananya",
    recentEvents: 3,
    upcomingEvents: 2,
    guruQuote: "The mind is everything. What you think you become.",
    guruName: "Pandit Kumar Viswas Ji",
    guruDescription: "A renowned spiritual leader with over 30 years of experience in Vedic philosophy, meditation, and holistic living. Pandit Kumar Viswas Ji has guided thousands of seekers on their spiritual journey.",
    bannerImage: "/path/to/banner-image.jpg", // This would be replaced with your actual image path
};


// Shortcut buttons configuration
const shortcutButtons = [
    {
        title: "Live Events",
        icon: <LiveTv />,
        path: "/live-events",
        color: "#e53935"
    },
    {
        title: "Donate",
        icon: <Favorite />,
        path: "/donate",
        color: "#8e24aa"
    },
    {
        title: "Appointment",
        icon: <Event />,
        path: "/appointment",
        color: "#1e88e5"
    },
    {
        title: "Blogs",
        icon: <MenuBook />,
        path: "/blogs",
        color: "#43a047"
    },
    {
        title: "Notifications",
        icon: <Notifications />,
        path: "/notifications",
        color: "#fb8c00"
    },
    {
        title: "History",
        icon: <History />,
        path: "/history",
        color: "#757575"
    },
    {
        title: "Settings",
        icon: <Settings />,
        path: "/settings",
        color: "#546e7a"
    }
];


// Feature Card Component
const FeatureCard = ({ title, icon, path, color }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.featureCard}
            onClick={() => navigate(path)}
        >
            <div
                className={styles.iconWrapper}
                style={{ backgroundColor: `${color}15`, color: color }}
            >
                {icon}
            </div>
            <span className={styles.featureTitle}>{title}</span>
        </div>
    );
};

// Main Dashboard Component
const UserDashboard = () => {
    return (
        <div className={styles.container}>
            {/* Welcome Header */}
            <div className={styles.welcomeHeader}>
                <h1 className={styles.welcomeTitle}>
                    Namaste, {userData.name} 🙏
                </h1>
                <p className={styles.welcomeSubtitle}>
                    Welcome to your spiritual journey
                </p>
            </div>

            {/* Banner Image */}
            <div className={styles.bannerContainer}>
                <img src="/assets/kv-banner.jpg" alt="img" className={styles.bannerImage} />
            </div>

            {/* Guru Quote Section */}
            <div className={styles.quoteSection}>
                <div className={styles.quoteContent}>
                    <p className={styles.quote}>"{userData.guruQuote}"</p>
                    <p className={styles.quoteAuthor}>— {userData.guruName}</p>
                </div>
            </div>

            {/* Guru Description */}
            <div className={styles.guruSection}>
                <h2 className={styles.sectionTitle}>About our Guru</h2>
                <div className={styles.guruDescription}>
                    <p>{userData.guruDescription}</p>
                </div>
            </div>

            {/* Quick Actions/Features */}
            <h2 className={styles.sectionTitle}>Quick Access</h2>
            <div className={styles.featuresGrid}>
                {shortcutButtons.map((button, index) => (
                    <FeatureCard
                        key={index}
                        title={button.title}
                        icon={button.icon}
                        path={button.path}
                        color={button.color}
                    />
                ))}
            </div>

            {/* Event Summary */}
            <div className={styles.eventSummary}>
                <div className={styles.eventCard}>
                    <h3 className={styles.eventNumber}>{userData.upcomingEvents}</h3>
                    <p className={styles.eventLabel}>Upcoming Events</p>
                </div>
                <div className={styles.eventCard}>
                    <h3 className={styles.eventNumber}>{userData.recentEvents}</h3>
                    <p className={styles.eventLabel}>Recent Events</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;