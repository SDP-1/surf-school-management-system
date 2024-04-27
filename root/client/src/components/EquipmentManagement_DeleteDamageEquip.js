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
                
                window.location.href = "/damage";
            } catch (err) {
                console.error(err);
                
            }
        }

        DeleteDamageEquip();
    }, [damageId]);

    
    return null;
}

