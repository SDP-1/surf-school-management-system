import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '15px', padding: '20px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)', marginBottom: '30px', marginTop: '80px' ,width:'600px',marginLeft:'30px',backgroundColor: '#f5f5f5'}}>
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

                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#1e5c8f" }}>Update</button>

                </form>
            </div>

            <div style={{ width: '600px' ,marginRight:'140px',marginTop: '30px',justifyContent: 'center',marginLeft:'20px'}}>
    <div>
    <h3>Update Your Event</h3>
    <p style={{ fontSize: '16px', fontWeight:'lighter', textAlign: 'justify', marginBottom: '20px' }}>Experience the exhilarating world of surf events, where the waves become a stage for adrenaline-fueled competition and breathtaking displays of skill. Dive into the heart of coastal culture as surfers from around the globe converge to showcase their talent in thrilling contests. From iconic beach breaks to legendary point breaks, each event offers a unique blend of athleticism and artistry against the backdrop of stunning ocean vistas. Spectators can immerse themselves in the vibrant atmosphere, cheering on their favorite athletes and soaking up the energy of the surf community. Join us for an unforgettable celebration of wave riding, camaraderie, and the pure joy of riding the waves</p>
  </div>
  <div>
    <Slider autoplay={true} autoplaySpeed={3000}> {/* Adjust autoplaySpeed as needed (in milliseconds) */}
      <div>
        <img src="https://www.usatoday.com/gcdn/presto/2019/10/29/USAT/e67cb12f-aa02-451c-bd86-f985eb313328-05_AFP_AFP_1LR6YM.JPG?width=700&height=408&fit=crop&format=pjpg&auto=webp" alt="Slide 1" style={{  height: '220px',width:'400px' }} />
      </div>
      <div>
        <img src="https://s.abcnews.com/images/US/RT_halloween_surfing_mar_14102720141025_05_3x2_1600.jpg?w=1600" alt="Slide 2" style={{ height: '220px',width:'400px'   }} />
      </div>
      {/* Add more slides as needed */}
    </Slider>

  </div>
  </div>
  </div>
      
    );
}

export default UpdateEvent;
