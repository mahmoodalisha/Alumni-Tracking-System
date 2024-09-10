import React, { useState } from 'react';
import './Hero.css'; 

const Hero = ({ alumniList = [], onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="hero-container">
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1>Welcome to Our Alumni Network</h1>
                    <p>
                        Explore the success stories of our alumni and gain insights to shape your future.
                        Connect with industry leaders and learn from their experiences.
                    </p>
                    <input 
                        type="text" 
                        placeholder="Search by name..." 
                        value={searchTerm} 
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
