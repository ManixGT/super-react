import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './eventMemberList.module.css';

// Sample event data
const eventsData = [
    { id: 1, name: "Music Festival", person: "John Smith", ticketType: "Premium", date: "May 10, 2025" },
    { id: 2, name: "Tech Conference", person: "Sarah Johnson", ticketType: "Standard", date: "May 15, 2025" },
    { id: 3, name: "Art Exhibition", person: "Michael Brown", ticketType: "Free", date: "May 20, 2025" },
    { id: 4, name: "Food Festival", person: "Emma Davis", ticketType: "Premium", date: "May 25, 2025" },
    { id: 5, name: "Film Screening", person: "David Wilson", ticketType: "Standard", date: "June 1, 2025" },
    { id: 6, name: "Book Launch", person: "Lisa Moore", ticketType: "Free", date: "June 5, 2025" },
    { id: 7, name: "Science Fair", person: "Robert Taylor", ticketType: "Premium", date: "June 10, 2025" },
    { id: 8, name: "Comedy Night", person: "Jennifer Clark", ticketType: "Standard", date: "June 15, 2025" },
    { id: 9, name: "Dance Performance", person: "Thomas White", ticketType: "Free", date: "June 20, 2025" },
    { id: 10, name: "Photography Workshop", person: "Patricia Martin", ticketType: "Premium", date: "June 25, 2025" },
];

export default function EventMemberList() {
    const [events, setEvents] = useState(eventsData);
    const [filteredEvents, setFilteredEvents] = useState(eventsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");

    const eventsPerPage = 3;
    const filters = ["All", "Premium", "Standard", "Free"];

    // Filter events based on search query and ticket type filter
    useEffect(() => {
        let result = events;

        // Apply search filter
        if (searchQuery) {
            result = result.filter(event =>
                event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.person.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply ticket type filter
        if (filter !== "All") {
            result = result.filter(event => event.ticketType === filter);
        }

        setFilteredEvents(result);
        setCurrentPage(1); // Reset to first page when filtering
    }, [searchQuery, filter, events]);

    // Get current events for pagination
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get ticket badge style based on ticket type
    const getTicketBadgeStyle = (ticketType) => {
        switch (ticketType) {
            case "Premium": return styles.premium;
            case "Standard": return styles.standard;
            case "Free": return styles.free;
            default: return "";
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Events</h2>

                {/* Search bar */}
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} size={16} />
                    <input
                        type="text"
                        placeholder="Search events or people..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter buttons */}
                <div className={styles.filterContainer}>
                    {filters.map(filterType => (
                        <button
                            key={filterType}
                            className={`${styles.filterButton} ${filter === filterType ? styles.activeFilter : styles.inactiveFilter}`}
                            onClick={() => setFilter(filterType)}
                        >
                            {filterType}
                        </button>
                    ))}
                </div>
            </div>

            {/* Event list */}
            <div className={styles.eventList}>
                {currentEvents.length > 0 ? (
                    currentEvents.map(event => (
                        <div key={event.id} className={styles.eventItem}>
                            <div className={styles.personInfo}>
                                <div className={styles.personName}>{event.person}</div>
                                <div className={styles.eventName}>{event.name}</div>
                                <div className={styles.eventDate}>{event.date}</div>
                            </div>
                            <span className={`${styles.ticketBadge} ${getTicketBadgeStyle(event.ticketType)}`}>
                                {event.ticketType}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>No events found</div>
                )}
            </div>

            {/* Pagination */}
            {filteredEvents.length > 0 && (
                <div className={styles.pagination}>
                    {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePageButton : styles.inactivePageButton}`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}