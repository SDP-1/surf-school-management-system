import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function DeleteEquipment(){

    const{equipmentno} = useParams();

    const[deletedequipment, setDeletedEquipment]= useState(null);

    useEffect(() => {
        async function DeleteEquipment() {
            try {
                const dequipment = await axios.delete(`http://localhost:4000/equipment/delete/${equipmentno}`);
                setDeletedEquipment(dequipment.data);
                alert("Deleted equipment");
                // Redirect to the home page using window.location
                window.location.href = "/"; // Redirect to the home page
            } catch (err) {
                console.error(err);
                
            }
        }

        DeleteEquipment();
    }, [equipmentno]);

    // Since we're using window.location for redirection, no return is necessary
    return null;
}

