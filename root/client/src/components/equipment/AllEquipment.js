import React ,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EditEquipment from "./EditEquipment";


export default function AllEquipment() {

  const [equipment,setequipment]=useState([]);
  useEffect(()=>{
     function getEquipment(){
       axios.get("http://localhost:8070/equipment/").then((res)=>{
        
        setequipment(res.data);
       }).catch((err)=>{
        alert(err.message);
       })
     }
     getEquipment();
  },[])


  return (
    <div className="container mt-5">
      <div className="mt-3">
            <Link className="btn btn-success" to="/addEquipment"> Add Equipment</Link>
      </div>
      <table className="table mt-5">
        <thead>
          <tr className='bg-dark'>
            <th scope="col">Item code</th>
            <th scope="col">Item Name</th>
            <th scope="col">Item Discription</th>
            <th scope="col">Quantity In Stock</th>
            <th scope="col">Quantity Required</th>
            <th scope="col">Purchase to be made</th>
            <th scope="col">Available Items</th>
            <th scope="col">Rental Items</th>
            <th scope="col">Damage Items</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {equipment.map((equipment,index)=>(
          <tr key={index}>
          
           
            <td>{equipment.itemno}</td>
            <td>{equipment.itemname}</td>
            <td>{equipment.itemdiscription}</td>
            <td>{equipment.quantityinstock}</td>
            <td>{equipment.quantityrequired}</td>
            <td>{equipment.purchasetobemade}</td>
            <td>{equipment.availableitems}</td>
            <td>{equipment.rentalitems}</td>
            <td>{equipment.damageitems}</td>
            
            <td>
            <Link to={`/delete/${equipment.itemno}`}>
              <button className="btn btn-danger me-3">Delete</button>
              </Link>
              <Link to={`/editEquipment/${equipment.itemno}`}>
              <button className="btn btn-success me-3">Edit</button>

              </Link>
              
            </td>
          </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

