import React, { useEffect, useState } from 'react';
import AlumniList from '../components/AlumniList'; 
import Hero from '../components/Hero';  
import { fetchAlumni } from '../services/api';
import './AlumniPage.css';

const AlumniPage = () => {
    const [alumniList, setAlumniList] = useState([]);
    const [filteredAlumni, setFilteredAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAlumni = async () => {
            try {
                const alumniData = await fetchAlumni(); 
                setAlumniList(alumniData);
                setFilteredAlumni(alumniData); // Initially set both to the full list
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch alumni data.');
                setLoading(false);
            }
        };

        loadAlumni();
    }, []);

    
    const handleSearch = (term) => {
        const filtered = alumniList.filter(alumni =>
            alumni.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredAlumni(filtered);
    };

    if (loading) return <p>Loading alumni...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="alumni-page">
            {/* Passing the search handler to Hero as a prop */}
            <Hero onSearch={handleSearch} />
            <h1> <br/>  </h1>
            {filteredAlumni.length > 0 ? (
                <AlumniList alumniList={filteredAlumni} />
            ) : (
                <p>No alumni found.</p>
            )}
        </div>
    );
};

export default AlumniPage;
