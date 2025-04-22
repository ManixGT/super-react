import React, { useState } from 'react';
import styles from './DonationScreen.module.css';

const DonationScreen = () => {
    // Mock donation campaigns data
    const allCampaigns = [
        {
            id: 1,
            title: "Feed 100 Kids",
            category: "Children",
            goal: 5000,
            raised: 3250,
            image: "/api/placeholder/90/90",
            description: "Help us provide nutritious meals to underprivileged children.",
            daysLeft: 15
        },
        {
            id: 2,
            title: "Plant 1000 Trees",
            category: "Environment",
            goal: 3000,
            raised: 1800,
            image: "/api/placeholder/90/90",
            description: "Join our initiative to combat climate change by planting trees.",
            daysLeft: 30
        },
        {
            id: 3,
            title: "Clean Water Initiative",
            category: "Health",
            goal: 8000,
            raised: 5600,
            image: "/api/placeholder/90/90",
            description: "Provide clean drinking water to rural communities.",
            daysLeft: 22
        },
        {
            id: 4,
            title: "Animal Shelter Support",
            category: "Animals",
            goal: 4500,
            raised: 2100,
            image: "/api/placeholder/90/90",
            description: "Help us care for abandoned and rescued animals.",
            daysLeft: 10
        },
        {
            id: 5,
            title: "Education for Girls",
            category: "Education",
            goal: 6000,
            raised: 4200,
            image: "/api/placeholder/90/90",
            description: "Support education for girls in underprivileged communities.",
            daysLeft: 25
        }
    ];

    const [campaigns, setCampaigns] = useState(allCampaigns);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('relevance');
    const [showFilters, setShowFilters] = useState(false);
    const [donationModal, setDonationModal] = useState({ show: false, campaign: null, isCustom: false });

    const categories = ['All', 'Children', 'Environment', 'Health', 'Animals', 'Education'];

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterCampaigns(e.target.value, selectedCategory, sortBy);
    };

    // Handle category filter change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterCampaigns(searchTerm, category, sortBy);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        filterCampaigns(searchTerm, selectedCategory, value);
    };

    const filterCampaigns = (search, category, sort) => {
        let filtered = [...allCampaigns];

        if (search) {
            filtered = filtered.filter(camp =>
                camp.title.toLowerCase().includes(search.toLowerCase()) ||
                camp.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== 'All') {
            filtered = filtered.filter(camp => camp.category === category);
        }

        switch (sort) {
            case 'newest':
                filtered.sort((a, b) => a.daysLeft - b.daysLeft);
                break;
            case 'goal-high':
                filtered.sort((a, b) => b.goal - a.goal);
                break;
            case 'goal-low':
                filtered.sort((a, b) => a.goal - b.goal);
                break;
            case 'progress':
                filtered.sort((a, b) => (b.raised / b.goal) - (a.raised / a.goal));
                break;
            default:
                break;
        }

        setCampaigns(filtered);
    };

    const handleDonate = (campaign, isCustom = false) => {
        setDonationModal({ show: true, campaign, isCustom });
    };

    const handleViewDetails = (campaign) => {
        // In a real app, this would navigate to a detailed view
        alert(`Viewing details for: ${campaign.title}`);
    };

    const calculateProgress = (raised, goal) => {
        return (raised / goal) * 100;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Donate for a Cause</h1>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
                <button
                    className={styles.filterButton}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    Filter
                </button>
            </div>

            {showFilters && (
                <div className={styles.filterContainer}>
                    <div className={styles.categoryFilters}>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className={styles.sortContainer}>
                        <label htmlFor="sortBy">Sort by:</label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={handleSortChange}
                            className={styles.sortSelect}
                        >
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                            <option value="goal-high">Goal (High to Low)</option>
                            <option value="goal-low">Goal (Low to High)</option>
                            <option value="progress">Most Progress</option>
                        </select>
                    </div>
                </div>
            )}

            <div className={styles.campaignsList}>
                {campaigns.length > 0 ? (
                    campaigns.map(campaign => (
                        <div key={campaign.id} className={styles.campaignCard}>
                            <div className={styles.campaignHeader}>
                                <img
                                    src={'./assets/kv-banner.jpg'}
                                    alt={campaign.title}
                                    className={styles.campaignImage}
                                />
                                <div className={styles.campaignHeaderInfo}>
                                    <h3 className={styles.campaignTitle}>{campaign.title}</h3>
                                    <span className={styles.campaignCategory}>{campaign.category}</span>
                                </div>
                            </div>

                            <div className={styles.campaignProgress}>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }}
                                    ></div>
                                </div>
                                <div className={styles.progressText}>
                                    <span>${campaign.raised} raised</span>
                                    <span>Goal: ${campaign.goal}</span>
                                </div>
                            </div>

                            <div className={styles.campaignDescription}>
                                {campaign.description}
                            </div>

                            <div className={styles.campaignActions}>
                                <div className={styles.donateButtons}>
                                    <button
                                        className={styles.donateFixedButton}
                                        onClick={() => handleDonate(campaign)}
                                    >
                                        Make Donation
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noCampaigns}>
                        No campaigns found matching your criteria.
                        <button
                            className={styles.resetButton}
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                                setSortBy('relevance');
                                setCampaigns(allCampaigns);
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            {donationModal.show && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalButtons}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setDonationModal({ show: false, campaign: null, isCustom: false })}
                            >
                                Cancel
                            </button>
                            <button className={styles.confirmButton}>
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationScreen;