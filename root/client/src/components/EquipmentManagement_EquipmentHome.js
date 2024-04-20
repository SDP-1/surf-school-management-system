import React, { useEffect, useState } from 'react';
import { BsFillGrid3X3GapFill,BsPeopleFill } from 'react-icons/bs';
import { MdOutlineInventory } from "react-icons/md";
import { TiSpanner } from "react-icons/ti";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function EquipmentHome() {
  const [totalInStockItems, setTotalInStockItems] = useState(0);
  const [damageEquipmentCount, setDamageEquipmentCount] = useState(0);
  const [equipmentReservationCount, setEquipmentReservationCount] = useState(0);

  useEffect(() => {
    const fetchTotalQuantityInStock = async () => {
      try {
        const response = await axios.get('http://localhost:4000/equipment/total');
        setTotalInStockItems(response.data.totalQuantityInStock);
      } catch (error) {
        console.error("Error fetching total quantity in stock:", error);
      }
    };

    const fetchDamageEquipmentCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/damageEquipment/count');
        setDamageEquipmentCount(response.data.count);
      } catch (error) {
        console.error("Error fetching damage equipment count:", error);
      }
    };
    const fetchEquipmentReservationCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/equipmentReservation/countR');
        setEquipmentReservationCount(response.data.count);
      } catch (error) {
        console.error("Error fetching equipment reservation count:", error);
      }
    };

    
    fetchTotalQuantityInStock();
    fetchDamageEquipmentCount();
    fetchEquipmentReservationCount();
  }, []);


  return (
    <div className="container mt-5">
      <main className='main-container'>
        <div className='main-title-center'>
          <h3 className="equipment-management-heading">Equipment Management</h3>
        </div>

        <div className='bold-rectangle'>
          <div className='card'>
            <div className='card-inner'>
                <h3>Inventory</h3>
                <MdOutlineInventory className='card_icon'/>
                
            </div>
           
            <h1>{totalInStockItems}</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
                <h3> Damage Equipment </h3>
                <TiSpanner className='card_icon'/>
            </div>
            <h1>{damageEquipmentCount}</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
                <h3>Equipment Reservation</h3>
                <BsPeopleFill className='card_icon'/>
            </div>
            <h1>{equipmentReservationCount}</h1>
          </div>
          
        </div>
      </main>

    <div className='button-container'>
  <button className='button'><Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Equipment Inventory</Link></button>
  <button className='button' ><Link to="/damage" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Damage Equipment</Link></button>
  <button className='button' ><Link to="/allReservation" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Equipment  Reservation</Link></button>
  <button className='button' ><Link to="/t" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Assign Technician</Link></button>
  </div>
  </div>
  
  );
    
}