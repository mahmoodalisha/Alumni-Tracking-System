import React, { useState, useEffect } from 'react';

const AlumniForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState(initialValues);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('graduationYear', formData.graduationYear);
        formDataToSend.append('company', formData.company);
        formDataToSend.append('linkedinProfile', formData.linkedinProfile);
        formDataToSend.append('motivationMessage', formData.motivationMessage);
        if (photo) {
            formDataToSend.append('photo', photo);
        }

        await onSubmit(formDataToSend);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="text"
                name="graduationYear"
                value={formData.graduationYear || ''}
                onChange={handleChange}
                placeholder="Graduation Year"
            />
            <input
                type="text"
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
                placeholder="Company"
            />
            <input
                type="text"
                name="linkedinProfile"
                value={formData.linkedinProfile || ''}
                onChange={handleChange}
                placeholder="LinkedIn Profile"
            />
            <textarea
                name="motivationMessage"
                value={formData.motivationMessage || ''}
                onChange={handleChange}
                placeholder="Motivation Message"
            />
            <input
                type="file"
                name="photo"
                onChange={handleFileChange}
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default AlumniForm;
