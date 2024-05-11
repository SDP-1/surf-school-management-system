import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const EditUser = ({ user, onClose, showAllUsers, onUpdated }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [userName, setUserName] = useState(user.userName);
  const [NIC, setNIC] = useState(user.NIC);
  const [status, setStatus] = useState(user.status);
  const [image, setImage] = useState(user.image);
  const [initialImage, setInitialImage] = useState(user.image);
  const [show, setShow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        fullName,
        userName,
        NIC,
        status,
        image,
      };
      const response = await fetch(`http://localhost:4000/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const updatedUser = await response.json();
      console.log(updatedUser);
      onClose();
      alert("User updated successfully!");
      onUpdated(); // Call the callback function after update is complete
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShow(false);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
      setInitialImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage("");
    setInitialImage("");
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {image ? (
            <img
              src={image}
              alt="User Image"
              width="100"
              height="100"
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <FaUserCircle size={100} />
          )}
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>NIC</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter NIC"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Rec">Ref</option>
              <option value="Adm">Adm</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
            <Button
              variant="danger"
              onClick={handleRemoveImage}
              disabled={!initialImage}
              style={{ marginLeft: "0px" }}
            >
              Remove Image
            </Button>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
