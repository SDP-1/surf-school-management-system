import React, { useState } from 'react';
import axios from 'axios';

const StaffManagement_AddSalary = () => {
    const [employeeID, setEmployeeID] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [baseSalary, setBaseSalary] = useState('');
    const [bonus, setBonus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');
    const [paymentDate, setPaymentDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/salaries/adds', {
                employeeID,
                employeeName,
                baseSalary,
                bonus,
                paymentMethod,
                notes,
                paymentDate
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Employee ID:
                    <input type="text" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} />
                </label>
                <label>
                    Employee Name:
                    <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                </label>
                <label>
                    Base Salary:
                    <input type="text" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} />
                </label>
                <label>
                    Bonus:
                    <input type="text" value={bonus} onChange={(e) => setBonus(e.target.value)} />
                </label>
                <label>
                    Payment Method:
                    <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
                </label>
                <label>
                    Notes:
                    <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </label>
                <label>
                    Payment Date:
                    <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StaffManagement_AddSalary;
