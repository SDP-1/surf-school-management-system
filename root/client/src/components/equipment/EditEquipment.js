import React, { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditEquipment() {
    const {itemno} = useParams();

    const [itemname, setItemName] = useState("");
    const [itemdiscription, setItemDiscription] = useState("");
    const [quantityinstock, setQuantityInStock] = useState("");
    const [quantityrequired, setQuantityRequired] = useState("");
    const [purchasetobemade, setPurchaseToBeMade] = useState("");
    const [availableitems, setAvailableItems] = useState("");
    const [rentalitems, setRentalItems] = useState("");
    const [damageitems, setDamageItems] = useState("");
   
    

    

    function sendData(e) {
        e.preventDefault();

        const updatedEquipment = {
            itemno,
            itemname,
            itemdiscription,
            quantityinstock,
            quantityrequired,
            purchasetobemade,
            availableitems,
            rentalitems,
            damageitems
        };
        

        axios.put(`http://localhost:8070/equipment/editEquipment/${itemno}`, updatedEquipment)
            .then(() => {
                alert("Equipment updated successfully");
                window.location.href="/";
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container mt-5">
            <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
                <Link className="btn btn-primary" to="/">Home</Link>
                <h3 className="mt-5">Edit details</h3>
                <div className="mb-3">
                    <label htmlFor="itemcode" className="form-label">Item code</label>
                    <input type="text" className="form-control" id="itemcode" placeholder="Enter Item Code" name="itemno" value={itemno}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Item Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Item Name" name="itemname" value={itemname} onChange={(e) => setItemName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="discription" className="form-label">Item Description</label>
                    <input type="text" className="form-control" id="discription" placeholder="Enter Description" name="itemdiscription" value={itemdiscription} onChange={(e) => setItemDiscription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity_in_stock" className="form-label">Quantity In Stock</label>
                    <input type="text" className="form-control" id="quantity_in_stock" placeholder="Enter Quantity In Stock" name="quantityinstock" value={quantityinstock} onChange={(e) => setQuantityInStock(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity_required" className="form-label">Quantity Required</label>
                    <input type="text" className="form-control" id="quantity_required" placeholder="Enter Quantity Required" name="quantityrequired" value={quantityrequired} onChange={(e) => setQuantityRequired(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="purchase_to_be_made" className="form-label">Purchase to be made</label>
                    <input type="text" className="form-control" id="purchase_to_be_made" placeholder="Enter Purchase To Be Made" name="purchasetobemade" value={purchasetobemade} onChange={(e) => setPurchaseToBeMade(e.target.value)} required />
                </div>
                

                <div className="mb-3">
                    <label htmlFor="available" className="form-label">Available Items</label>
                    <input type="text" className="form-control" id="available" placeholder="Enter Available Items" name="availableitems" value={availableitems} onChange={(e) => {setAvailableItems(e.target.value);}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="damage" className="form-label">Rental Items</label>
                    <input type="text" className="form-control" id="rental" placeholder="Enter rental Items" name="rentalitems" value={rentalitems} onChange={(e) => {setRentalItems(e.target.value);}} required/>
                </div>
               
                <div className="mb-3">
                    <label htmlFor="damage" className="form-label">Damage Items</label>
                    <input type="text" className="form-control" id="damage" placeholder="Enter Damage Items" name="damageitems" value={damageitems} onChange={(e) => {setDamageItems(e.target.value);}} required/>
                </div>
                <button className="btn btn-primary">Update</button>
                
            </form>
        </div>

    )
}