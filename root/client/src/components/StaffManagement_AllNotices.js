import React, { useState, useEffect } from "react";
import axios from "axios";

const AllNotices = () => {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/Notice/notices")
      .then((res) => {
        const filteredNotices = res.data.filter(
          (notice) => new Date(notice.expirationDate) > new Date()
        );
        setNotices(filteredNotices); // Remove the reverse() method
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch notices");
      });
  }, []);

  const handleShowModal = (notice) => {
    setSelectedNotice(notice);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "20px",
        }}
      >
        {notices.map((notice, index) => (
          <div
            key={notice._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              cursor: "pointer",
              backgroundColor: index === 0 ? "rgba(173, 216, 230, 0.5)" : "transparent", // First entered notice highlighted with light blue transparent background
            }}
            onClick={() => handleShowModal(notice)}
          >
            <div className="card-body">
              <h5 className="card-title">{notice.title}</h5>
              <p className="card-text">{notice.content}</p>
              <p className="card-text">
                Expiration Date: {notice.expirationDate}
              </p>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content" style={{ width: "60%", height: "60%", overflowY: "auto" }}>
            <span
              className="close"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2>{selectedNotice.title}</h2>
            <p>{selectedNotice.content}</p>
            <p>Expiration Date: {selectedNotice.expirationDate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNotices;
