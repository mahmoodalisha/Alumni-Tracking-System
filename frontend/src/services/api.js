import axios from 'axios';

// Helper function to handle errors
const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        return Promise.reject(error.response.data);
    } else if (error.request) {
        // No response received
        console.error('Error request:', error.request);
        return Promise.reject('No response received from the server.');
    } else {
        // Something else caused the error
        console.error('Error message:', error.message);
        return Promise.reject(error.message);
    }
};


export const createAlumni = (token, alumniData) => {
    return axios.post('/api/admin/alumni', alumniData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    .catch(handleError);
};

export const updateAlumni = (token, id, alumniData) => {
    return axios.put(`/api/admin/alumni/${id}`, alumniData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log('Update response:', response.data);
        return response.data;
    })
    .catch(handleError);
};


export const fetchAlumni = () => {
    return axios.get('/api/admin/alumni')
    .then(response => response.data)
    .catch(handleError);
};


export const deleteAlumni = (token, id) => {
    return axios.delete(`/api/admin/alumni/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .catch(handleError);
};
