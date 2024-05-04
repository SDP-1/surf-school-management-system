import React, { useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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
  const [error, setError] = useState("");

  function sendData(e) {
    e.preventDefault();
    if (error === "") {
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
        Start: startString,
        End: endString
      };
      axios
        .post("http://localhost:4000/event/add", newevent)
        .then(() => {
          alert("Event added");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Please correct the errors before submitting.");
    }
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

  function handleTypeChange(e) {
    const inputValue = e.target.value.trim();
    if (inputValue !== "Free" && inputValue !== "Purchased") {
      setError("Invalid input. Please enter either 'Free' or 'Purchased'.");
    } else {
      setError("");
    }
    setType(inputValue);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <div style={{ border: '1px solid #ccc', borderRadius: '15px', padding: '30px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)', marginBottom: '30px', marginTop: '30px', width: '600px' ,marginLeft:'20px'}}>
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
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="typeInput"
              placeholder="Free/Purchased"
              onChange={handleTypeChange}
              value={Type}
            />
            {error && <div className="invalid-feedback">{error}</div>}
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
  
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#1e5c8f" }}>Submit</button>
  
        
     
      </form>
    </div>
    <div style={{ width: '600px' ,marginRight:'140px',marginTop: '30px',justifyContent: 'center'}}>
    <div>
    <h3>Create Your Event</h3>
    <p style={{ fontSize: '16px', fontWeight:'lighter', textAlign: 'justify', marginBottom: '20px' }}>Experience the exhilarating world of surf events, where the waves become a stage for adrenaline-fueled competition and breathtaking displays of skill. Dive into the heart of coastal culture as surfers from around the globe converge to showcase their talent in thrilling contests. From iconic beach breaks to legendary point breaks, each event offers a unique blend of athleticism and artistry against the backdrop of stunning ocean vistas. Spectators can immerse themselves in the vibrant atmosphere, cheering on their favorite athletes and soaking up the energy of the surf community. Join us for an unforgettable celebration of wave riding, camaraderie, and the pure joy of riding the waves</p>
  </div>
  <div>
    <Slider autoplay={true} autoplaySpeed={3000}> {/* Adjust autoplaySpeed as needed (in milliseconds) */}
      <div>
        <img src="https://tropixtraveler.com/web/wp-content/uploads/2017/10/539-Hawaii-Oahu-Waikiki-Beach-Dukes-OceanFest-21366703_1359820534087435_2870747695167434313_o-1.jpg" alt="Slide 1" style={{  height: '300px',width:'500px' }} />
      </div>
      <div>
        <img src="https://isasurf.org/wp-content/uploads/2021/05/SEN_Assane_Mbnegue_NCA_Kevin_Cortez_ISA_Ben_Reed-6_small.jpg" alt="Slide 2" style={{ height: '300px',width:'500px'   }} />
      </div>
      {/* Add more slides as needed */}
    </Slider>
    <p style={{ fontSize: '16px', fontWeight:'lighter', textAlign: 'justify', marginBottom: '20px' ,marginTop:'10px'}}>Surf events epitomize the essence of coastal living, where surfers ride the crest of excitement and passion. These events serve as a platform for athletes to push their limits, showcasing innovative maneuvers and riding techniques. From professional competitions to grassroots gatherings, surf events foster a sense of camaraderie among participants and spectators alike. Whether you're a seasoned pro or a curious observer, these events offer an immersive experience into the dynamic world of wave riding, leaving lasting memories and inspiring new adventures.</p>
  </div>
  </div>
  </div>
  

      
  );
}

export default Addevent;


