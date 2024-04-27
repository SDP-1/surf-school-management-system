import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DeleteEmployees(){

    const { eid } = useParams();

    const [deletedEmployee, setDeletedEmployee] = useState(null);

    useEffect(() => {
        async function deleteEmployee() {
            try {
                const deletedEmp = await axios.delete(`http://localhost:4000/employee/delete/${eid}`);
                setDeletedEmployee(deletedEmp.data);
                alert("Deleted employee");
                // Redirect to the home page using window.location
                window.location.href = "/staff/alle"; // Redirect to the home page
            } catch (error) {
                console.error(error);
            }
        }

        deleteEmployee();
    }, [eid]);

    // Since we're using window.location for redirection, no return is necessary
    return null;
}

export default DeleteEmployees;
