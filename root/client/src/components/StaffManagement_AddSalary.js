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
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Generate a random number between 100 and 9900 for the reference ID
            const randomNum = Math.floor(Math.random() * 9000) + 100;
            const referenceID = `SA${randomNum}`;

            // Calculate the amount (base salary + bonus)
            const amount = parseFloat(baseSalary) + parseFloat(bonus);

            // Save data to the salaries table
            const salaryResponse = await axios.post('http://localhost:4000/salaries/adds', {
                employeeID,
                employeeName,
                baseSalary,
                bonus,
                paymentMethod,
                notes,
                paymentDate
            });
    
            // Save data to the outgoing table
            const outgoingResponse = await axios.post('http://localhost:4000/outgoing/save', {
                refId: referenceID,
                details: `Salary for ${employeeName}`,
                amount,
            });
    
            console.log(salaryResponse.data);
            console.log(outgoingResponse.data);
    
            // Handle success, e.g., show a success message or redirect
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message
        }
    };

    const validateEmployeeID = (value) => {
        if (!value.match(/^(A|E|S|R)\d+$/)) {
            setErrors(prevErrors => ({ ...prevErrors, employeeID: 'Employee ID must start with A, E, S, or R' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, employeeID: '' }));
        }
    };

    const validateEmployeeName = (value) => {
        if (!value.match(/^[a-zA-Z\s]+$/)) {
            setErrors(prevErrors => ({ ...prevErrors, employeeName: 'Only letters and spaces are allowed' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, employeeName: '' }));
        }
    };

    const validateBaseSalary = (value) => {
        if (!value.match(/^\d*\.?\d*$/)) {
            setErrors(prevErrors => ({ ...prevErrors, baseSalary: 'Base Salary must be a positive number' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, baseSalary: '' }));
        }
    };

    const validateBonus = (value) => {
        if (!value.match(/^\d*\.?\d*$/)) {
            setErrors(prevErrors => ({ ...prevErrors, bonus: 'Bonus must be a positive number' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, bonus: '' }));
        }
    };

    const validatePaymentDate = (value) => {
        const today = new Date();
        const selectedDate = new Date(value);
        if (selectedDate < today) {
            setErrors(prevErrors => ({ ...prevErrors, paymentDate: 'Payment Date must be today or a future date' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, paymentDate: '' }));
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f4f4' }}>
            <form onSubmit={handleSubmit} style={{ width: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: 'rgba(173, 216, 230, 0.3)' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Employee ID:</label>
                    <br />
                    <input type="text" value={employeeID} onChange={(e) => { setEmployeeID(e.target.value); validateEmployeeID(e.target.value); }} required style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ddd', width: '100%' }} />
                    {errors.employeeID && <span style={{ color: 'red' }}>{errors.employeeID}</span>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Employee Name:</label>
                    <br />
                    <input type="text" value={employeeName} onChange={(e) => { setEmployeeName(e.target.value); validateEmployeeName(e.target.value); }} required style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ddd', width: '100%' }} />
                    {errors.employeeName && <span style={{ color: 'red' }}>{errors.employeeName}</span>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Base Salary:</label>
                    <br />
                    <input type="text" value={baseSalary} onChange={(e) => { setBaseSalary(e.target.value); validateBaseSalary(e.target.value); }} required style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ddd', width: '100%' }} />
                    {errors.baseSalary && <span style={{ color: 'red' }}>{errors.baseSalary}</span>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Bonus:</label>
                    <br />
                    <input type="text" value={bonus} onChange={(e) => { setBonus(e.target.value); validateBonus(e.target.value); }} style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ddd', width: '100%' }} />
                    {errors.bonus && <span style={{ color: 'red' }}>{errors.bonus}</span>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Payment Method:</label>
                    <br />
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ddd', width: '100%' }}>
                        <option value="">Select Payment Method</option>
                        <option value="bank transfer">Bank Transfer</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Notes:</label>
                    <br />
                    <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ddd', width: '100%' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Payment Date:</label>
                    <br />
                    <input type="date" value={paymentDate} onChange={(e) => { setPaymentDate(e.target.value); validatePaymentDate(e.target.value); }} required style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ddd', width: '100%' }} />
                    {errors.paymentDate && <span style={{ color: 'red' }}>{errors.paymentDate}</span>}
                </div>
                <div>
                    <button type="submit" style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: '1px solid #007bff', borderRadius: '3px', cursor: 'pointer', transition: 'background-color 0.3s', width: '100%' }}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default StaffManagement_AddSalary;
