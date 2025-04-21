// AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

import {
    EventNote,
    ConfirmationNumber,
    Collections,
    Payment,
    Favorite,
    PeopleAlt,
} from '@mui/icons-material';

const dashboardData = {
    totalUsers: 2487,
    activeUsers: 1653,
    totalEvents: 42,
    activeEvents: 28,
    totalPayments: "$158,745",
    totalDonations: "$32,450"
};

const shortcutLinks = [
    {
        title: "Events",
        icon: <EventNote />,
        description: "Manage all your events",
        path: "/admin/events",
        color: "#4caf50"
    },
    {
        title: "Ticket Verification",
        icon: <ConfirmationNumber />,
        description: "Verify tickets and attendees",
        path: "/admin/tickets",
        color: "#2196f3"
    },
    {
        title: "Gallery",
        icon: <Collections />,
        description: "Manage event photos and media",
        path: "/admin/gallery",
        color: "#ff9800"
    },
    {
        title: "Payments",
        icon: <Payment />,
        description: "Track all payment transactions",
        path: "/admin/payments",
        color: "#9c27b0"
    },
    {
        title: "Donations",
        icon: <Favorite />,
        description: "View and manage donations",
        path: "/admin/donations",
        color: "#f44336"
    }
];

const InsightCard = ({ title, value, icon, color }) => (
    <div className={styles.insightCard} style={{ borderLeft: `4px solid ${color}` }}>
        <div className={styles.insightContent}>
            <div>
                <p className={styles.insightTitle}>{title}</p>
                <h3 className={styles.insightValue}>{value}</h3>
            </div>
            <div
                className={styles.iconContainer}
                style={{ backgroundColor: `${color}20` }}
            >
                {React.cloneElement(icon, { style: { fontSize: 24, color: color } })}
            </div>
        </div>
    </div>
);

const ShortcutCard = ({ title, icon, description, path, color }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.shortcutCard}
            onClick={() => navigate(path)}
        >
            <div className={styles.shortcutContent}>
                <div
                    className={styles.shortcutIcon}
                    style={{ backgroundColor: `${color}15` }}
                >
                    {React.cloneElement(icon, { style: { fontSize: 32, color: color } })}
                </div>
                <h4 className={styles.shortcutTitle}>{title}</h4>
                <p className={styles.shortcutDescription}>{description}</p>
            </div>
        </div>
    );
};


const AdminDashboard = () => {
    const adminName = "Admin";

    return (
        <div className={styles.container}>
            <div className={styles.welcomeHeader}>
                <h1 className={styles.welcomeTitle}>Welcome back, {adminName}! 👋</h1>
                <p className={styles.welcomeSubtitle}>
                    Congratulations on your hard work! Here's what's happening with your platform today.
                </p>
            </div>

            <div className={styles.divider}></div>

            <h2 className={styles.sectionTitle}>Analytics Overview</h2>

            <div className={styles.insightsGrid}>
                <InsightCard
                    title="Total Users"
                    value={dashboardData.totalUsers}
                    icon={<PeopleAlt />}
                    color="#4caf50"
                />
                {/* <InsightCard
                    title="Active Users"
                    value={dashboardData.activeUsers}
                    icon={<PeopleAlt />}
                    color="#2196f3"
                /> */}
                {/* <InsightCard
                    title="Total Events"
                    value={dashboardData.totalEvents}
                    icon={<EventNote />}
                    color="#ff9800"
                />*/}
                <InsightCard
                    title="Total Active Events"
                    value={dashboardData.activeEvents}
                    icon={<EventNote />}
                    color="#9c27b0"
                />
                {/* <InsightCard
                    title="Total Payments"
                    value={dashboardData.totalPayments}
                    icon={<Payment />}
                    color="#f44336"
                />
                <InsightCard
                    title="Total Donations"
                    value={dashboardData.totalDonations}
                    icon={<Favorite />}
                    color="#009688"
                /> */}
            </div>

            <div className={styles.divider}></div>

            <h2 className={styles.sectionTitle}>Quick Access</h2>

            <div className={styles.shortcutsGrid}>
                {shortcutLinks.map((link, index) => (
                    <ShortcutCard key={index} {...link} />
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;