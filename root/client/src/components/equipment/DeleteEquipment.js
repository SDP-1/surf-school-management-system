import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function DeleteEquipment(){

    const{itemno} = useParams();

    const[deletedequipment, setDeletedEquipment]= useState(null);

    useEffect(() => {
        async function DeleteEquipment() {
            try {
                const dequipment = await axios.delete(`http://localhost:8070/equipment/delete/${itemno}`);
                setDeletedEquipment(dequipment.data);
                alert("Deleted equipment");
                // Redirect to the home page using window.location
                window.location.href = "/"; // Redirect to the home page
            } catch (err) {
                console.error(err);
                
            }
        }

        DeleteEquipment();
    }, [itemno]);

    // Since we're using window.location for redirection, no return is necessary
    return null;
}

