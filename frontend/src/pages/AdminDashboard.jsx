import React, { useState, useEffect } from 'react';
import { fetchAlumni, createAlumni, updateAlumni, deleteAlumni } from '../services/api';
import AlumniForm from '../components/AlumniForm';
import AlumniList from '../components/AlumniList';

const AdminDashboard = () => {
    const [token] = useState(localStorage.getItem('token'));
    const [selectedAlumni, setSelectedAlumni] = useState(null);
    const [alumniList, setAlumniList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAlumni(token);
                console.log('Fetched alumni data:', data); 
                setAlumniList(data || []); // Set the list directly from the response
            } catch (error) {
                console.error('Error fetching alumni:', error);
                setAlumniList([]); // state is reset if an error occurs
            }
        };

        fetchData();
    }, [token]);

    const handleCreateOrUpdate = async (alumniData) => {
        try {
            if (selectedAlumni) {
                await updateAlumni(token, selectedAlumni._id, alumniData);
            } else {
                await createAlumni(token, alumniData);
            }
            const response = await fetchAlumni(token);
            setAlumniList(response || []); // Adjust based on the actual response structure
            setSelectedAlumni(null);
        } catch (error) {
            console.error('Error creating/updating alumni', error);
        }
    };
    
    
    const handleEdit = (alumni) => {
        setSelectedAlumni(alumni); // Set the selected alumni for editing
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    };

    const handleDelete = async (id) => {
        try {
            await deleteAlumni(token, id);
            // Fetch the updated list of alumni
            const data = await fetchAlumni(token);
            setAlumniList(data || []); // Set the updated list directly from the response
        } catch (error) {
            console.error('Error deleting alumni:', error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <AlumniForm
                initialValues={selectedAlumni || {}}
                onSubmit={handleCreateOrUpdate}
            />
            <h3>Alumni List</h3>
            <AlumniList
                alumniList={alumniList}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default AdminDashboard;
