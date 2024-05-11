import React, { useState } from 'react';
import axios from 'axios';

function AddAttendance() {
    const [formData, setFormData] = useState({
        eid: '',
        name: '',
        date: new Date().toISOString().slice(0, 10)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/Attendance/addtt', formData);
            setFormData({ eid: '', name: '', date: new Date().toISOString().slice(0, 10) });
            alert('Attendance added successfully!');
        } catch (error) {
            console.error('Error adding attendance:', error);
            alert('Failed to add attendance. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Attendance</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input type="text" name="eid" value={formData.eid} onChange={handleChange} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <button type="submit">Add Attendance</button>
            </form>
        </div>
    );
}

export default AddAttendance;
