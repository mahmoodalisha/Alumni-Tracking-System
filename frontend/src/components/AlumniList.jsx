import React from 'react';
import PropTypes from 'prop-types';
import './AlumniList.css'; 

const AlumniList = ({ alumniList, onEdit, onDelete }) => {
    console.log('AlumniList received:', alumniList);
    
    const safeAlumniList = Array.isArray(alumniList) ? alumniList : [];

    
    console.log('AlumniList content:', safeAlumniList);

    if (safeAlumniList.length === 0) {
        return <p>No alumni found.</p>;
    }

    return (
        <div className="alumni-list">
            <ul>
                {safeAlumniList.map(alumni => (
                    <li key={alumni._id} className="alumni-item">
                        <div className="alumni-container">
                            <h3>{alumni.name}</h3>
                            <p>Email: {alumni.email}</p>
                            <p>Graduation Year: {alumni.graduationYear}</p>
                            <p>Placement: {alumni.company}</p>
                            <p>LinkedIn: <a href={alumni.linkedinProfile} target="_blank" rel="noopener noreferrer">Profile</a></p>
                            {alumni.photo && (
                                <p>
                                    <img 
                                        src={`http://localhost:5000/uploads/${alumni.photo}`} 
                                        alt={alumni.name} 
                                        width="100" 
                                    />
                                </p>
                            )}
                            <p>Message from the alumni: {alumni.motivationMessage}</p>
                            {onEdit && onDelete && ( 
                                <>
                                    <button onClick={() => onEdit(alumni)}>Edit</button>
                                    <button onClick={() => onDelete(alumni._id)}>Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

AlumniList.propTypes = {
    alumniList: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

// Default props
AlumniList.defaultProps = {
    alumniList: [],
    onEdit: () => {},
    onDelete: () => {},
};

export default AlumniList;
