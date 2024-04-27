import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditDamageEquip() {
  const { damageId } = useParams();

  const [damage, setDamage] = useState({
    equipmentno:"",
    equipmentname: "",
    damagedescription: "",
    technicianname: "",
    technicianemail: "",
    assigneddate: "",
    deliverydate: "",
    repaircost: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/damageEquipment/viewd/${damageId}`)
    
      .then((response) => {

       
          setDamage({
            ...response.data.damage,
            assigneddate: new Date(response.data.damage.assigneddate),
            deliverydate: new Date(response.data.damage.deliverydate),
          });
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [damageId]);

  function sendData(e) {
    e.preventDefault();

    const updatedDamageEquipment = {
      damageId,
      equipmentno:damage.equipmentno,
      equipmentname: damage.equipmentname,
      damagedescription: damage.damagedescription,
      technicianname: damage.technicianname,
      technicianemail: damage.technicianemail,
      assigneddate: damage.assigneddate,
      deliverydate: damage.deliverydate,
      repaircost: damage.repaircost,
    };

    axios.put(`http://localhost:4000/damageEquipment/editDamageEquipment/${damageId}`, updatedDamageEquipment)
      .then(() => {
        alert("Damage Equipment updated successfully");
        window.location.href = "/damage";
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5">
      <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
        <Link className="btn btn-primary" to="/Equipment_Management/damage">Home</Link>
        <h3 className="mt-5">Edit details</h3>
        <div className="row">
          <div className="col">
        <div className="mb-3">
                    <label htmlFor="itemcode" className="form-label">Damage Id</label>
                    <input type="text" className="form-control" id="damageid" placeholder="Enter Damage Id" name="damageid" value={damageId}  />
                </div>
        <div className="mb-3">
                    <label htmlFor="itemcode" className="form-label">Equipment NO</label>
                    <input type="text" className="form-control" id="equipmentno" placeholder="Enter Item Code" name="equipmentno" value={damage.equipmentno} onChange={(e) => setDamage({ ...damage, equipmentno: e.target.value })} required />
                </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Equipment Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter Item Name" name="itemname" value={damage.equipmentname} onChange={(e) => setDamage({ ...damage, equipmentname: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Damage Description</label>
          <input type="text" className="form-control" id="discription" placeholder="Enter Damage Description" name="damagedescription" value={damage.damagedescription} onChange={(e) => setDamage({ ...damage, damagedescription: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity_required" className="form-label">Technician Name</label>
          <input type="text" className="form-control" id="quantity_required" placeholder="Enter Technician Name" name="technicianname" value={damage.technicianname} onChange={(e) => setDamage({ ...damage, technicianname: e.target.value })} required />
        </div>
        </div>
        <div className="col">
        <div className="mb-3">
          <label htmlFor="purchase_to_be_made" className="form-label">Technician Email</label>
          <input type="email" className="form-control" id="purchase_to_be_made" placeholder="Enter Technician Email" name="technicianemail" value={damage.technicianemail} onChange={(e) => setDamage({ ...damage, technicianemail: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="assigneddate" className="form-label">Assigned Date</label>
          <input
            type="date"
            className="form-control"
            id="assigneddate"
            placeholder="Enter assigned date"
            name="assigneddate"
            value={damage.assigneddate ? damage.assigneddate.toISOString().slice(0, 10) : ''}
            onChange={(e) => setDamage({ ...damage, assigneddate: new Date(e.target.value) })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deliverydate" className="form-label">Delivery Date</label>
          <input
            type="date"
            className="form-control"
            id=""
            placeholder="Enter Delivery Date"
            name="deliverydate"
            value={damage.deliverydate ? damage.deliverydate.toISOString().slice(0, 10) : ''}
            onChange={(e) => setDamage({ ...damage, deliverydate: new Date(e.target.value) })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="repaircost" className="form-label">Repair Cost</label>
          <input type="text" className="form-control" id="damage" placeholder="Enter Repair Cost" name="repaircost" value={damage.repaircost} onChange={(e) => setDamage({ ...damage, repaircost: e.target.value })} required />
        </div>
        </div>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>

      </form>
    </div>
  );
}