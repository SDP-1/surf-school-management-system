import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateUserPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [NIC, setNIC] = useState("");
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Rec");
  const [showRemoveImage, setShowRemoveImage] = useState(false);

  const pageStyles = `
   .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      background-color: #f2f2f2;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      margin-bottom: 3rem;
      color: #333;
    }
    label {
      font-weight: bold;
      color: #333;
    }
    input,
    select,
    button {
      border-radius: 4px;
      border: 1px solid #ccc;
      padding: 0.5rem;
      margin-bottom: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
   .image-preview {
      margin-top: 1rem;
      border: 1px solid #ccc;
      padding: 0.5rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
   .image-preview img {
      margin-right: 1rem;
    }
   .btn-danger {
      margin-left: 1rem;
    }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        fullName: fullName,
        userName: userName,
        password: password,
        NIC: NIC,
        image: image,
        status: status,
      };

      const response = await fetch("http://localhost:4000/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("User created successfully!");
        setFullName("");
        setUserName("");
        setPassword("");
        setNIC("");
        setImage({});
        setImageUrl("");
        setShowRemoveImage(false);
        setStatus("Rec");
      } else {
        alert("Failed to create user. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setShowRemoveImage(true);
  };

  const handleRemoveImage = () => {
    setImage({});
    setImageUrl("");
    setShowRemoveImage(false);
  };

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <style>{pageStyles}</style>
      <h1 className="mb-4">Create New User</h1>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>NIC:</label>
            <input
              type="text"
             value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-control"
              required
            >
              <option value="Rec">Rec</option>
              <option value="Adm">Adm</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>
        </div>
        {showRemoveImage && (
          <div className="image-preview">
            <img src={imageUrl} alt="Preview" width="100" />
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;