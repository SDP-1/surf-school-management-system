import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Staff_AllNotices() {
    const [notices, setNotices] = useState([]);
    const [editingNotice, setEditingNotice] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [updatedExpirationDate, setUpdatedExpirationDate] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4000/Notice/notices")
            .then((res) => {
                console.log(res.data);
                setNotices(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const openModal = (notice) => {
        setEditingNotice(notice);
        setUpdatedTitle(notice.title);
        setUpdatedContent(notice.content);
        setUpdatedExpirationDate(notice.expirationDate);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:4000/Notice/notice/${editingNotice._id}`, {
            title: updatedTitle,
            content: updatedContent,
            expirationDate: updatedExpirationDate
        })
        .then(() => {
            alert("Notice updated successfully");
            setNotices(notices.map(notice => {
                if (notice._id === editingNotice._id) {
                    return {
                        ...notice,
                        title: updatedTitle,
                        content: updatedContent,
                        expirationDate: updatedExpirationDate
                    };
                }
                return notice;
            }));
            closeModal();
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/Notice/notice/${id}`)
            .then(() => {
                alert("Notice deleted successfully");
                setNotices(notices.filter(notice => notice._id !== id));
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div>
            <div style={{ position: "absolute", top: "0", right: "0", padding: "10px" }}>
                <Link to="/staff/notice" style={{ padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "4px" }}>Add Notice</Link>
            </div>
            <div style={{ marginTop: "50px", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {notices.map(notice => (
                    <div key={notice._id} style={{ width: "45%", margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
                        <h3>{notice.title}</h3>
                        <p>{notice.content}</p>
                        <p>Expiration Date: {notice.expirationDate}</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }} onClick={() => openModal(notice)}>Update</button>
                            <button style={{ backgroundColor: "#f44336", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleDelete(notice._id)}>Delete</button>
                        </div>
                    </div>
                ))}
                {modalOpen && (
                    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "40px", border: "1px solid #ccc", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
                        <h2>Edit Notice</h2>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="updatedTitle">Title:</label>
                            <input type="text" id="updatedTitle" style={{ width: "100%", padding: "8px", marginBottom: "10px" }} value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="updatedContent">Content:</label>
                            <textarea id="updatedContent" style={{ width: "100%", padding: "8px", marginBottom: "10px" }} value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="updatedExpirationDate">Expiration Date:</label>
                            <input type="text" id="updatedExpirationDate" style={{ width: "100%", padding: "8px", marginBottom: "10px" }} value={updatedExpirationDate} onChange={(e) => setUpdatedExpirationDate(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }} onClick={handleUpdate}>Update</button>
                            <button style={{ backgroundColor: "#ccc", color: "#000", padding: "10px 20px", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }} onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

