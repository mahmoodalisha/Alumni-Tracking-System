import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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
export const fetchAlumni = () => {
    return axios.get(`${API_URL}/alumni`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching alumni:', error);
        throw error;
    });
};


// i want to delete an alumni
export const deleteAlumni = (token, id) => {
    return axios.delete(`${API_URL}/alumni/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// GET http://localhost:5000/api/admin/alumni Status: 200 OK
/* [
  {
    "_id": "66df1cc6ffb00c9bace373a8",
    "name": "Alex Thompson",
    "email": "alex.thompson@example.com",
    "graduationYear": 2019,
    "company": "Software Engineer at Google",
    "linkedinProfile": "https://linkedin.com/in/alex-thompson",
    "photo": "1725897926485.jpg",
    "motivationMessage": "Always strive to learn and grow. Embrace challenges and turn them into opportunities",
    "__v": 0
  }, */