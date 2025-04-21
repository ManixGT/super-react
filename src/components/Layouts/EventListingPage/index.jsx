import React, { useState } from 'react';
import styles from './eventListingPage.module.css'

import {
    Search,
    FilterList,
    Sort,
    LocationOn,
    CalendarToday,
    Close
} from '@mui/icons-material';

const eventData = [
    {
        id: 1,
        title: "Yoga & Meditation Retreat",
        description: "Join us for a transformative weekend of yoga, meditation, and spiritual teachings.",
        location: "Rishikesh Ashram",
        date: "May 12-14, 2025",
        live: true,
        image: "/assets/kv-banner.jpg"
    },
    {
        id: 2,
        title: "Vedic Philosophy Workshop",
        description: "Explore the ancient wisdom of Vedic philosophy and its practical applications in modern life.",
        location: "Delhi Cultural Center",
        date: "April 28, 2025",
        image: "/assets/kv-banner.jpg"
    },
    {
        id: 3,
        title: "Bhagavad Gita Study Group",
        description: "Weekly gathering to study and discuss the profound teachings of the Bhagavad Gita.",
        location: "Virtual Event",
        date: "Every Sunday, 10 AM",
        image: "/assets/kv-banner.jpg"
    },
    {
        id: 4,
        title: "Healing Sound Bath",
        description: "Experience the powerful healing vibrations of traditional instruments and sacred chants.",
        location: "Harmony Center, Mumbai",
        date: "May 5, 2025",
        image: "/assets/kv-banner.jpg"
    },
    {
        id: 5,
        title: "Spiritual Discourse Series",
        description: "A series of talks on spiritual growth, mindfulness, and conscious living.",
        location: "Bangalore Spiritual Foundation",
        date: "May 18-20, 2025",
        image: "/assets/kv-banner.jpg"
    }
];


const filterOptions = {
    eventType: ["Workshop", "Retreat", "Discourse", "Meditation", "Virtual", "All"],
    location: ["Delhi", "Mumbai", "Bangalore", "Rishikesh", "Virtual", "All"],
    duration: ["1 Day", "Weekend", "Week-long", "Recurring", "All"]
};


const sortOptions = [
    { label: "Date (Newest First)", value: "date-desc" },
    { label: "Date (Oldest First)", value: "date-asc" },
    { label: "A-Z", value: "title-asc" },
    { label: "Z-A", value: "title-desc" }
];

const EventListingPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [activeFilter, setActiveFilter] = useState({
        eventType: "All",
        location: "All",
        duration: "All"
    });
    const [activeSort, setActiveSort] = useState("date-desc");

    const EventCard = ({ event }) => (
        <div className={styles.eventCard}>
            <img src={event.image} alt={event.title} className={styles.eventImage} />
            <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>
                    {event.title}
                    {event.live && (
                        <span className={styles.liveTag}> • Live Now</span>
                    )}
                </h3>
                <p className={styles.eventDescription}>{event.description}</p>
                <div className={styles.eventDetails}>
                    <div className={styles.eventDetail}>
                        <LocationOn className={styles.detailIcon} />
                        <span>{event.location}</span>
                    </div>
                    <div className={styles.eventDetail}>
                        <CalendarToday className={styles.detailIcon} />
                        <span>{event.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const FilterPopup = () => (
        <div className={`${styles.popup} ${showFilter ? styles.showPopup : ''}`}>
            <div className={styles.popupHeader}>
                <h3>Filter Events</h3>
                <button
                    className={styles.closeButton}
                    onClick={() => setShowFilter(false)}
                >
                    <Close />
                </button>
            </div>
            <div className={styles.popupContent}>
                <div className={styles.filterSection}>
                    <h4>Event Type</h4>
                    <div className={styles.filterOptions}>
                        {filterOptions.eventType.map((option, index) => (
                            <button
                                key={index}
                                className={`${styles.filterOption} ${activeFilter.eventType === option ? styles.activeOption : ''}`}
                                onClick={() => setActiveFilter({ ...activeFilter, eventType: option })}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h4>Location</h4>
                    <div className={styles.filterOptions}>
                        {filterOptions.location.map((option, index) => (
                            <button
                                key={index}
                                className={`${styles.filterOption} ${activeFilter.location === option ? styles.activeOption : ''}`}
                                onClick={() => setActiveFilter({ ...activeFilter, location: option })}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h4>Duration</h4>
                    <div className={styles.filterOptions}>
                        {filterOptions.duration.map((option, index) => (
                            <button
                                key={index}
                                className={`${styles.filterOption} ${activeFilter.duration === option ? styles.activeOption : ''}`}
                                onClick={() => setActiveFilter({ ...activeFilter, duration: option })}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h4>Status</h4>
                    <div className={styles.filterOptions}>
                        <button
                            className={`${styles.filterOption} ${activeFilter.status === "Live" ? styles.activeOption : ''}`}
                            onClick={() => setActiveFilter({ ...activeFilter, status: "Live" })}
                        >
                            Live Now
                        </button>
                        <button
                            className={`${styles.filterOption} ${activeFilter.status === "All" ? styles.activeOption : ''}`}
                            onClick={() => setActiveFilter({ ...activeFilter, status: "All" })}
                        >
                            All
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.popupFooter}>
                <button
                    className={styles.resetButton}
                    onClick={() => setActiveFilter({ eventType: "All", location: "All", duration: "All", status: "All" })}
                >
                    Reset All
                </button>
                <button
                    className={styles.applyButton}
                    onClick={() => setShowFilter(false)}
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );

    const SortPopup = () => (
        <div className={`${styles.popup} ${showSort ? styles.showPopup : ''}`}>
            <div className={styles.popupHeader}>
                <h3>Sort Events</h3>
                <button
                    className={styles.closeButton}
                    onClick={() => setShowSort(false)}
                >
                    <Close />
                </button>
            </div>
            <div className={styles.popupContent}>
                <div className={styles.sortOptions}>
                    {sortOptions.map((option, index) => (
                        <button
                            key={index}
                            className={`${styles.sortOption} ${activeSort === option.value ? styles.activeOption : ''}`}
                            onClick={() => setActiveSort(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.popupFooter}>
                <button
                    className={styles.applyButton}
                    onClick={() => setShowSort(false)}
                >
                    Apply Sorting
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Upcoming Events</h1>

            <div className={styles.searchBar}>
                <Search className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.filterSortContainer}>
                <button
                    className={styles.filterButton}
                    onClick={() => {
                        setShowFilter(true);
                        setShowSort(false);
                    }}
                >
                    <FilterList />
                    <span>Filter</span>
                </button>
                <button
                    className={styles.sortButton}
                    onClick={() => {
                        setShowSort(true);
                        setShowFilter(false);
                    }}
                >
                    <Sort />
                    <span>Sort</span>
                </button>
            </div>

            <div className={styles.eventsList}>
                {eventData.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>

            {/* Filter Popup */}
            {showFilter && <FilterPopup />}

            {/* Sort Popup */}
            {showSort && <SortPopup />}

            {/* Overlay for popup background */}
            {(showFilter || showSort) && (
                <div
                    className={styles.overlay}
                    onClick={() => {
                        setShowFilter(false);
                        setShowSort(false);
                    }}
                />
            )}
        </div>
    );
};

export default EventListingPage;