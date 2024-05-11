import React, { useEffect, useState } from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { MdOutlineInventory } from "react-icons/md";
import { TiSpanner } from "react-icons/ti";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [totalInStockItems, setTotalInStockItems] = useState(0);
  const [damageEquipmentCount, setDamageEquipmentCount] = useState(0);
  const [allSuppliers, setAllSuppliersCount] = useState(0);

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
    const fetchAllSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/supplier/count');
        setAllSuppliersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching equipment reservation count:", error);
      }
    };

    fetchTotalQuantityInStock();
    fetchDamageEquipmentCount();
    fetchAllSuppliers();
  }, []);


  return (
    <div className="container mt-5">
      <main className='main-container'>
        <div className='main-title-center'>
          <h3 className="equipment-management-heading">Supplier Management</h3>
        </div>

        <div className='bold-rectangle'>

          <div className='card'>

            <div className='card'>
              <div className='card-inner'>
                <h3>Suppliers</h3>
                <BsPeopleFill className='card_icon'/>
              </div>
              <h1>{allSuppliers}</h1>
            </div>
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
          
        </div>
      </main>

      <div className='button-container'>
        <button className='button'><Link to="/supplier/allequipment" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Equipment Inventory</Link></button>
        <button className='button' ><Link to="/supplier/damage" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Damage Equipment</Link></button>
        <button className='button' ><Link to="/supplier/allsup" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Suppliers</Link></button>
        <button className='button' ><Link to="/supplier/t" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>Assign Supplier</Link></button>
      </div>
    </div>
  );
}

// Internal CSS Styles
const styles = `
.main-container {
  grid-area: main;
  overflow-y: auto;
  padding: 20px 20px;
  color: rgba(14, 11, 11, 0.95);
}

.main-title {
  display: flex;
  justify-content: space-between;
}

.main-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin: 15px 0;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 15px;
  border-radius: 20px;
}

.card:first-child {
  background-color: #2962ff;
}

.card:nth-child(2) {
  background-color: #ff6d00;
}

.card:nth-child(3) {
  background-color: #2e7d32;
}


.card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-inner > .card_icon {
  font-size: 25px;
}
.main-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 50px 0;
}

.button {
  background-color: #0077b6;
  border: none;
  color: white;
  padding: 60px 70px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.bold-rectangle {
  border: 3px  black;
  border-radius: 0;
  padding: 1rem;
}
.main-title-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
.button:hover {
  background-color: rgb(3, 3, 70);
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bold-rectangle {
  display: flex;
  justify-content: space-between;
  width: 90%;
  border: 2px solid #000;
  border-radius: 5px;
  padding: 20px;
  margin-top: 30px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 20px;
  width: 30%;
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.card h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.card_icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.card h5 {
  font-size: 18px;
  margin-bottom: 10px;
}

.card h1 {
  font-size: 36px;
  font-weight: bold;
}

.button {
  margin-top: 30px;
  margin-bottom: 20px;
}
.button-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 30px;
  margin-left: 60px;
  flex-wrap: nowrap;
}

.button {
  width: 22%;
}
.equipment-management-heading {
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  
}
.nav-link-custom {
  color: #fff;
  transition: color 0.2s ease-in-out;
}

.nav-link-custom:hover {
  color: #ccc;
}

.nav-link-custom.active {
  color: #ccc;
  font-weight: bold;
}
`;

// Append styles to head
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);
