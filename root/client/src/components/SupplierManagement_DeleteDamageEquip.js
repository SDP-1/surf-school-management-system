import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function DeleteDamageEquip(){

    const{damageId} = useParams();

    const[deletedequipment, setDeletedEquipment]= useState(null);

    useEffect(() => {
        async function DeleteDamageEquip() {
            try {
                const dmquipment = await axios.delete(`http://localhost:4000/damageEquipment/deleteDamage/${damageId}`);
                setDeletedEquipment(dmquipment.data);
                alert("Deleted Damage equipment");
                // Redirect to the home page using window.location
                window.location.href = "/supplier/damage"; // Redirect to the home page
            } catch (err) {
                console.error(err);
                
            }
        }

        DeleteDamageEquip();
    }, [damageId]);

    // Since we're using window.location for redirection, no return is necessary
    return null;
}

