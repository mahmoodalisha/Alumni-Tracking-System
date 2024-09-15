import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://alumni-tracking-system-psi.vercel.app/api/admin' ;
 


export const createAlumni = (token, alumniData) => {
    return axios.post(`${API_URL}/alumni`, alumniData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};


export const updateAlumni = (token, id, alumniData) => {
    return axios.put(`${API_URL}/alumni/${id}`, alumniData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log('Update response:', response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Update error:', error.response ? error.response.data : error.message);
        throw error; // Re-throw the error for further handling
    });
};
// i am fetchin all alumni list
export const fetchAlumni = async () => {
    try {
        const response = await fetch(`${API_URL}/alumni`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching alumni:', error);
        throw error;
    }
};




// i want to delete an alumni
export const deleteAlumni = (token, id) => {
    return axios.delete(`${API_URL}/alumni/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
