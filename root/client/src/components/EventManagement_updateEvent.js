import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateEvent() {
    const { Title } = useParams();
    const [Location, setLocation] = useState("");
    const [Capacity, setCapacity] = useState("");
    const [Description, setDescription] = useState("");
    const [Image, setImage] = useState("");

    function sendData(e) {
        e.preventDefault();
        const updatedEvent = {
            Title,
            Location,
            Capacity,
            Description,
            Image,
        };
        axios.put(`http://localhost:4000/event/update/${encodeURIComponent(Title)}`, updatedEvent)
            .then(() => {
                alert("Event updated");
                window.location.href = "/Event/";
            })
            .catch((err) => {
                alert(err);
            });
    }

    function handleImageChange(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result); //preview image
        };
        reader.onerror = (error) => {
            console.log("Error", error);
        };
    }

    return (
        <div className="container">
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)', marginBottom: '30px', marginTop: '30px' }}>
                <form onSubmit={sendData}>

                    <div className="mb-3">
                        <label htmlFor="titleInput" className="form-label">
                            Event Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="titleInput"
                            value={Title}
                            disabled // Disable input to prevent modification
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="locationInput" className="form-label">
                            Location
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="locationInput"
                            value={Location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="capacityInput" className="form-label">
                            Capacity
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="capacityInput"
                            value={Capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descriptionInput" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="descriptionInput"
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fileInput" className="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            name="myfile"
                            id="fileInput"
                            accept=".jpeg,.png,.jpg"
                            onChange={handleImageChange}
                        />
                        {Image && (
                            <img width={100} height={100} src={Image} alt="Preview" />
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEvent;
