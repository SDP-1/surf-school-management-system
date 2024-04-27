import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AttendanceManager() {
    const [formData, setFormData] = useState({
        eid: '',
        name: '',
        date: new Date().toISOString().slice(0, 10)
    });
    const [attendances, setAttendances] = useState([]);
    const [filteredAttendances, setFilteredAttendances] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countDialogVisible, setCountDialogVisible] = useState(false);
    const [employeeIdForCount, setEmployeeIdForCount] = useState('');
    const [attendanceCount, setAttendanceCount] = useState(0);
    const [file, setFile] = useState(null);
    const [updateAttendanceId, setUpdateAttendanceId] = useState('');
    const [updateFormData, setUpdateFormData] = useState({
        eid: '',
        name: '',
        date: ''
    });
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [searchEmployeeId, setSearchEmployeeId] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchEmployeeId.trim() === '') {
            setFilteredAttendances(attendances);
        } else {
            const filtered = attendances.filter((attendance) => attendance.eid.includes(searchEmployeeId.trim()));
            setFilteredAttendances(filtered);
        }
    }, [searchEmployeeId, attendances]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/Attendance/all');
            setAttendances(response.data);
            setFilteredAttendances(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/Attendance/addtt', formData);
            setFormData({ eid: '', name: '', date: new Date().toISOString().slice(0, 10) });
            fetchData();
            alert('Attendance added successfully!');
        } catch (error) {
            console.error('Error adding attendance:', error);
            alert('Failed to add attendance. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/Attendance/dtt/${id}`);
            fetchData();
            alert('Attendance deleted successfully!');
        } catch (error) {
            console.error('Error deleting attendance:', error);
            alert('Failed to delete attendance. Please try again.');
        }
    };

    const handleUpdatePopup = (attendance) => {
        setUpdateAttendanceId(attendance._id);
        setUpdateFormData({
            eid: attendance.eid,
            name: attendance.name,
            date: attendance.date
        });
        setUpdateModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/Attendance/uptt/${updateAttendanceId}`, updateFormData);
            setUpdateModalOpen(false);
            fetchData();
            alert('Attendance updated successfully!');
        } catch (error) {
            console.error('Error updating attendance:', error);
            alert('Failed to update attendance. Please try again.');
        }
    };

    const handleCountDialogClose = () => {
        setCountDialogVisible(false);
        setEmployeeIdForCount('');
        setAttendanceCount(0);
    };

    const handleGetAttendanceCount = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/Attendance/employee/${employeeIdForCount}/count`);
            setAttendanceCount(response.data.count);
        } catch (error) {
            console.error('Error getting attendance count:', error);
            alert('Failed to get attendance count. Please try again.');
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post('http://localhost:4000/Attendance/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchData();
            alert('Attendance records from spreadsheet added successfully!');
        } catch (error) {
            console.error('Error uploading attendance records:', error);
            alert('Failed to upload attendance records. Please try again.');
        }
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('All Attendance Report', 10, 10);
        const data = attendances.map(({ eid, name, date }) => [eid, name, date]);
        doc.autoTable({
            head: [['Employee ID', 'Name', 'Date']],
            body: data
        });
        doc.save('all_attendance_report.pdf');
    };
    
    const generateEmployeeReport = (employeeId) => {
        const doc = new jsPDF();
        const filteredAttendances = attendances.filter((attendance) => attendance.eid === employeeId);
        const employeeName = filteredAttendances.length > 0 ? filteredAttendances[0].name : 'Unknown';
        doc.text(`Attendance Report for Employee ID: ${employeeId} - ${employeeName}`, 10, 10);
        const data = filteredAttendances.map(({ name, date }) => [name, date]);
        doc.autoTable({
            head: [['Name', 'Date']],
            body: data
        });
        doc.save(`employee_${employeeId}_report.pdf`);
    };

    return (
        <div style={{ backgroundColor: '#ADD8E6', minHeight: '100vh', color: '#ffffff', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* First Grid: Add Attendance */}
                <div style={{ flex: 1, marginRight: '20px', backgroundColor: '#2c3e50', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                    <h3>Add New Attendance</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Employee ID:</label>
                            <input type="text" name="eid" value={formData.eid} onChange={handleChange} style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Date:</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={{ width: '100%' }} />
                        </div>
                        <button type="submit" style={{ backgroundColor: '#16a085', border: 'none', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Add Attendance</button>
                    </form>
                </div>

                {/* Second Grid: Upload Attendance */}
                <div style={{ flex: 1, marginRight: '20px', backgroundColor: '#34495e', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                    <h3>Upload Attendance from Spreadsheet</h3>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
                    <button onClick={handleFileUpload} style={{ backgroundColor: '#2980b9', border: 'none', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Upload</button>
                </div>

                {/* Third Grid: Get Attendance Count */}
                <div style={{ flex: 1, backgroundColor: '#2e4053', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                    <h3>Get Attendance Count for Employee</h3>
                    <input type="text" value={employeeIdForCount} onChange={(e) => setEmployeeIdForCount(e.target.value)} style={{ marginBottom: '10px', width: '100%' }} />
                    <button onClick={handleGetAttendanceCount} style={{ backgroundColor: '#3498db', border: 'none', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Get Attendance Count</button>
                    <p style={{ marginTop: '10px' }}>Attendance count for employee {employeeIdForCount}: <strong>{attendanceCount}</strong></p>
                </div>
            </div>

            {/* Attendance List */}
            <div style={{ marginTop: '20px', backgroundColor: '#34495e', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                <h3>Attendance List</h3>
                <input
                    type="text"
                    placeholder="Search Employee ID"
                    value={searchEmployeeId}
                    onChange={(e) => setSearchEmployeeId(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ffffff' }}
                />
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <table id="attendance-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>Employee ID</th>
                                <th style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>Name</th>
                                <th style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>Date</th>
                                <th style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendances.map((attendance) => (
                                <tr key={attendance._id} style={attendance.eid === searchEmployeeId ? { backgroundColor: '#f39c12' } : {}}>
                                    <td style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>{attendance.eid}</td>
                                    <td style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>{attendance.name}</td>
                                    <td style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>{attendance.date}</td>
                                    <td style={{ border: '1px solid #ffffff', textAlign: 'left', padding: '8px' }}>
                                        <button onClick={() => handleDelete(attendance._id)} style={{ backgroundColor: '#c0392b', border: 'none', color: '#ffffff', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', marginRight: '4px' }}>Delete</button>
                                        <button onClick={() => handleUpdatePopup(attendance)} style={{ backgroundColor: '#2980b9', border: 'none', color: '#ffffff', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Update Modal */}
            {updateModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                        <h2>Update Attendance</h2>
                        <form onSubmit={handleUpdate}>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Employee ID:</label>
                                <input type="text" name="eid" value={updateFormData.eid} onChange={(e) => setUpdateFormData({ ...updateFormData, eid: e.target.value })} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Name:</label>
                                <input type="text" name="name" value={updateFormData.name} onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Date:</label>
                                <input type="date" name="date" value={updateFormData.date} onChange={(e) => setUpdateFormData({ ...updateFormData, date: e.target.value })} />
                            </div>
                            <button type="submit" style={{ backgroundColor: '#16a085', border: 'none', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
                            <button onClick={() => setUpdateModalOpen(false)} style={{ backgroundColor: '#c0392b', border: 'none', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                <button onClick={generateReport} style={{ backgroundColor: '#16a085', border: 'none', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Generate Report (All)</button>
                <input type="text" value={employeeIdForCount} onChange={(e) => setEmployeeIdForCount(e.target.value)} style={{ marginLeft: '10px', marginRight: '10px' }} placeholder="Enter Employee ID" />
                <button onClick={() => generateEmployeeReport(employeeIdForCount)} style={{ backgroundColor: '#2980b9', border: 'none', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Generate Report (Employee)</button>
            </div>
        </div>
    );
}

export default AttendanceManager;
