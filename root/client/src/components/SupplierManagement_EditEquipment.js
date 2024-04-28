import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditEquipment() {
  const { equipmentno } = useParams();

  const [equipment, setEquipment] = useState({
    equipmentname: "",
    equipmentdescription: "",
    quantityinstock: "",
    quantityrequired: "",
    purchasetobemade: "",
    availableequipment: "",
    rentalequipment: "",
    damageequipment: "",
    suppliername: "",
    supplieremail: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/equipment/viewEquipment/${equipmentno}`)
      .then((response) => {
        setEquipment(response.data.equipment);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [equipmentno]);

  function sendData(e) {
    e.preventDefault();

    const updatedEquipment = {
      equipmentno,
      equipmentname: equipment.equipmentname,
      equipmentdescription: equipment.equipmentdescription,
      quantityinstock: equipment.quantityinstock,
      quantityrequired: equipment.quantityrequired,
      purchasetobemade: equipment.purchasetobemade,
      availableequipment: equipment.availableequipment,
      rentalequipment: equipment.rentalequipment,
      damageequipment: equipment.damageequipment,
      suppliername: equipment.suppliername,
      supplieremail: equipment.supplieremail,
    };

    axios.put(`http://localhost:4000/equipment/editEquipment/${equipmentno}`, updatedEquipment)
      .then(() => {
        alert("Equipment updated successfully");
        window.location.href = "/supplier/allequipment";
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5">
      <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
        <Link className="btn btn-primary " to="/allequipment">
          Home
        </Link>
        <h3 className="mt-5 ">Edit details</h3>
        <div className="row">
          <div className="col">
        <div className="mb-3">
          <label htmlFor="itemcode" className="form-label fw-bold">
            Item code
          </label>
          <input
            type="text"
            className="form-control"
            id="itemcode"
            placeholder="Enter Item Code"
            name="itemno"
            value={equipmentno}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Item Name"
            name="itemname"
            value={equipment.equipmentname}
            onChange={(e) =>
              setEquipment({ ...equipment, equipmentname: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label fw-bold">
            Item Description
          </label>
          <input
            type="text"
            className="form-control"
            id="discription"
            placeholder="Enter Description"
            name="itemdiscription"
            value={equipment.equipmentdiscription}
            onChange={(e) =>
              setEquipment({ ...equipment, equipmentdiscription: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity_in_stock" className="form-label fw-bold">
            Quantity In Stock
</label>
          <input
            type="text"
            className="form-control"
            id="quantity_in_stock"
            placeholder="Enter Quantity In Stock"
            name="quantityinstock"
            value={equipment.quantityinstock}
            onChange={(e) =>
              setEquipment({ ...equipment, quantityinstock: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity_required" className="form-label fw-bold">
            Quantity Required
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity_required"
            placeholder="Enter Quantity Required"
            name="quantityrequired"
            value={equipment.quantityrequired}
            onChange={(e) =>
              setEquipment({ ...equipment, quantityrequired: e.target.value })
            }
            required
          />
        </div>
        </div>
        <div className="col">
        <div className="mb-3">
          <label htmlFor="purchase_to_be_made" className="form-label fw-bold">
            Purchase to be made
          </label>
          <input
            type="text"
            className="form-control"
            id="purchase_to_be_made"
            placeholder="Enter Purchase To Be Made"
            name="purchasetobemade"
            value={equipment.purchasetobemade}
            onChange={(e) =>
              setEquipment({
                ...equipment,
                purchasetobemade: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="available" className="form-label fw-bold">
            Available Items
          </label>
          <input
            type="text"
            className="form-control"
            id="available"
            placeholder="Enter Available Items"
            name="availableitems"
            value={equipment.availableequipment}
            onChange={(e) =>
              setEquipment({
                ...equipment,
                availableequipment: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rental" className="form-label fw-bold">
            Rental Items
          </label>
          <input
            type="text"
            className="form-control"
            id="rental"
            placeholder="Enter rental Items"
            name="rentalitems"
            value={equipment.rentalequipment}
            onChange={(e) =>
              setEquipment({
                ...equipment,
                rentalequipment: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="damage" className="form-label fw-bold">
            Damage Items
          </label>
          <input
            type="text"
            className="form-control"
            id="damage"
            placeholder="Enter Damage Items"
            name="damageitems"
            value={equipment.damageequipment}
            onChange={(e) =>
              setEquipment({
                ...equipment,
                damageequipment: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-3">
  <label htmlFor="supplierName" className="form-label fw-bold">
    Supplier Name
  </label>
  <input
    type="text"
    className="form-control"
    id="supplierName"
    placeholder="Enter Supplier Name"
    name="supplierName"
    value={equipment.suppliername} // Assuming equipment is the state object containing supplier details
    onChange={(e) =>
      setEquipment({
        ...equipment,
        suppliername: e.target.value,
      })
    }
    required
  />
</div>

<div className="mb-3">
  <label htmlFor="supplierEmail" className="form-label fw-bold">
    Supplier Email
  </label>
  <input
    type="email"
    className="form-control"
    id="supplierEmail"
    placeholder="Enter Supplier Email"
    name="supplierEmail"
    value={equipment.supplieremail} // Assuming equipment is the state object containing supplier details
    onChange={(e) =>
      setEquipment({
        ...equipment,
        supplieremail: e.target.value,
      })
    }
    required
  />
</div>

        </div>
        </div>
      
          <button className="btn btn-primary">Update</button>
        
        
      </form>
    </div>
  );
}