import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Staff_AllWorkSheet() {
    const [worksheets, setWorksheets] = useState([]);
    const [editingWorksheet, setEditingWorksheet] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editedEname, setEditedEname] = useState("");
    const [editedRole, setEditedRole] = useState("");
    const [editedMonday, setEditedMonday] = useState("");
    const [editedTuesday, setEditedTuesday] = useState("");
    const [editedWednesday, setEditedWednesday] = useState("");
    const [editedThursday, setEditedThursday] = useState("");
    const [editedFriday, setEditedFriday] = useState("");
    const [editedSaturday, setEditedSaturday] = useState("");
    const [editedSunday, setEditedSunday] = useState("");

    const getWorksheets = () => {
        axios.get("http://localhost:4000/worksheet/w")
            .then((res) => {
                console.log(res.data);
                setWorksheets(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    useEffect(() => {
        getWorksheets();
    }, []);

    const handleEdit = (worksheet) => {
        setEditingWorksheet(worksheet);
        setEditedEname(worksheet.Ename || "");
        setEditedRole(worksheet.Role || "");
        setEditedMonday(worksheet.Monday || "");
        setEditedTuesday(worksheet.Tuesday || "");
        setEditedWednesday(worksheet.Wednesday || "");
        setEditedThursday(worksheet.Thursday || "");
        setEditedFriday(worksheet.Friday || "");
        setEditedSaturday(worksheet.Saturday || "");
        setEditedSunday(worksheet.Sunday || "");
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:4000/worksheet/updatew/${editingWorksheet.Eid}`, {
            Ename: editedEname,
            Role: editedRole,
            Monday: editedMonday,
            Tuesday: editedTuesday,
            Wednesday: editedWednesday,
            Thursday: editedThursday,
            Friday: editedFriday,
            Saturday: editedSaturday,
            Sunday: editedSunday
        })
        .then(() => {
            alert("Worksheet updated");
            getWorksheets();
            setEditingWorksheet(null);
            setModalOpen(false);
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    const handleDelete = (Eid) => {
        axios.delete(`http://localhost:4000/worksheet/deletew/${Eid}`)
            .then(() => {
                alert("Worksheet deleted");
                getWorksheets();
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const dayOptions = [
        { value: '7-12 Morning', label: '7-12 Morning' },
        { value: '12-6 Evening', label: '12-6 Evening' },
        { value: 'Day', label: 'Day' },
        { value: 'Night', label: 'Night' },
        { value: 'Full Day', label: 'Full Day' },
        { value: 'Off Day', label: 'Off Day' }
    ];

    return (
        <div style={{ margin: "20px" }}>
            <h1>All Worksheets</h1>
            <Link to="/staff/addw" style={{ marginBottom: "15px", textDecoration: "none" }}>
                <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Add Worksheet</button>
            </Link>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", border: "1px solid #ddd" }}>
                <thead>
                    <tr>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Eid</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Ename</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Role</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Monday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Tuesday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Wednesday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Thursday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Friday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Saturday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Sunday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {worksheets.map((worksheet, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Eid}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Ename}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Role}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Monday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Tuesday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Wednesday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Thursday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Friday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Saturday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Sunday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                                <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "5px 10px", borderRadius: "4px", border: "none", marginRight: "5px", cursor: "pointer" }} onClick={() => handleEdit(worksheet)}>Edit</button>
                                <button style={{ backgroundColor: "#f44336", color: "white", padding: "5px 10px", borderRadius: "4px", border: "none", cursor: "pointer" }} onClick={() => handleDelete(worksheet.Eid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen && (
                <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
                        <h2>Edit Worksheet</h2>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedEname">Ename:</label>
                            <input type="text" id="editedEname" value={editedEname} onChange={(e) => setEditedEname(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedRole">Role:</label>
                            <input type="text" id="editedRole" value={editedRole} onChange={(e) => setEditedRole(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedMonday">Monday:</label>
                            <select id="editedMonday" value={editedMonday} onChange={(e) => setEditedMonday(e.target.value)}>
                                {dayOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedTuesday">Tuesday:</label>
                            <select id="editedTuesday" value={editedTuesday} onChange={(e) => setEditedTuesday(e.target.value)}>
                                {dayOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedWednesday">Wednesday:</label>
                            <select id="editedWednesday" value={editedWednesday} onChange={(e) => setEditedWednesday(e.target.value)}>
                                {dayOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedThursday">Thursday:</label>
                            <select id="editedThursday" value={editedThursday} onChange={(e) => setEditedThursday(e.target.value)}>
                                {dayOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedFriday">Friday:</label>
                            <select id="editedFriday" value={editedFriday} onChange={(e) => setEditedFriday(e.target.value)}>
                                {dayOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedSaturday">Saturday:</label>
                            <select id="editedSaturday" value={editedSaturday} onChange={(e) => setEditedSaturday(e.target.value)}>
                                {dayOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="editedSunday">Sunday:</label>
                            <select id="editedSunday" value={editedSunday} onChange={(e) => setEditedSunday(e.target.value)}>
                                {dayOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer", marginRight: "10px" }} onClick={handleUpdate}>Update</button>
                            <button style={{ backgroundColor: "#f44336", color: "white", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer" }} onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
