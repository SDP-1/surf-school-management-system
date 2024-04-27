import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteSupplier() {
    const { suppliercode } = useParams();

    useEffect(() => {
        async function deleteSupplier() {
            try {
                await axios.delete(`http://localhost:4000/supplier/deletesupplier/${suppliercode}`);
                alert("Supplier Deleted");
                // Redirect to the home page using window.location
                window.location.href = "/allsup"; // Redirect to the home page
            } catch (err) {
                console.error(err);
            }
        }
        deleteSupplier();
    }, [suppliercode]);

    // Since we're using window.location for redirection, no return is necessary
    return null;
}
