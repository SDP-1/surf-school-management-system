import React, { useState } from "react";
import axios from "axios";

function Addevent() {
  const [Title, setTitle] = useState("");
  const [Location, setLocation] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState("");
  const [Type, setType] = useState("");
  const [Date, setDate] = useState("");
  const [Start, setStart] = useState("");
  const [End, setEnd] = useState("");

  function sendData(e) {
    e.preventDefault();
    const startString = Start.toString();
    const endString = End.toString();
    const newevent = {
      Title,
      Location,
      Capacity,
      Description,
      Image,
      Type,
      Date,
      Start:startString,
      End:endString
    };
    axios
      .post("http://localhost:8070/event/add", newevent)
      .then(() => {
        alert("Event added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleImageChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result); //preview image
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }

  return (
    <div className="container" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)' ,marginBottom: '30px',marginTop:'30px'}}>
    <form onSubmit={sendData}>

        <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">
                Event Title
            </label>
            <input
                type="text"
                className="form-control"
                id="titleInput"
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="typeInput" className="form-label">
                Event Type
            </label>
            <input
                type="text"
                className="form-control"
                id="typeInput"
                placeholder="Free/Purchased"
                onChange={(e) => setType(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="dateInput" className="form-label">
                Date
            </label>
            <input
                type="date"
                className="form-control"
                id="dateInput"
                onChange={(e) => setDate(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="startInput" className="form-label">
                Start Time
            </label>
            <input
                type="time"
                className="form-control"
                id="startInput"
                onChange={(e) => setStart(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="endInput" className="form-label">
                End Time
            </label>
            <input
                type="time"
                className="form-control"
                id="endInput"
                onChange={(e) => setEnd(e.target.value)}
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
            {Image === "" || Image === null ? (
                ""
            ) : (
                <img width={100} height={100} src={Image} alt="Preview" />
            )}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>

  );
}

export default Addevent;
