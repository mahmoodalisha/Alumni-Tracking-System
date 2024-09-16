import axios from 'axios';

export const createAlumni = (token, alumniData) => {
    return axios.post(`/api/admin/alumni`, alumniData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
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
    .catch(error => {
        console.error('Update error:', error.response ? error.response.data : error.message);
        throw error;
    });
};

export const fetchAlumni = () => {
    return axios.get(`/api/admin/alumni`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching alumni:', error);
        throw error;
    });
};

export const deleteAlumni = (token, id) => {
    return axios.delete(`/api/admin/alumni/${id}`, {
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