// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the StaffManagement_salarydetails component
const StaffManagement_salarydetails = () => {
    // Define state variables
    const [salaries, setSalaries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [updateData, setUpdateData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // useEffect to fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [salariesResponse, outgoingsResponse] = await Promise.all([
                    axios.get('http://localhost:4000/salaries/alls'),
                    axios.get('http://localhost:4000/outgoing')
                ]);

                const salariesData = salariesResponse.data;
                const outgoingsData = outgoingsResponse.data.filter(outgoing =>
                    outgoing.refId.startsWith('SA')
                ).map(outgoing => {
                    const salaryEntry = salariesData.find(salary => salary.employeeID === outgoing.employeeID);
                    return {
                        _id: outgoing._id,
                        refId: outgoing.refId,
                        status: outgoing.status,
                        employeeID: outgoing.employeeID,
                        employeeName: outgoing.employeeName,
                        baseSalary: salaryEntry ? salaryEntry.baseSalary : 'N/A',
                        bonus: salaryEntry ? salaryEntry.bonus : 'N/A',
                        paymentMethod: salaryEntry ? salaryEntry.paymentMethod : 'N/A',
                        notes: salaryEntry ? salaryEntry.notes : 'N/A',
                        paymentDate: salaryEntry ? salaryEntry.paymentDate : 'N/A'
                    };
                });

                const combinedData = [...salariesData, ...outgoingsData];
                setSalaries(combinedData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // useEffect to filter search results
    useEffect(() => {
        const results = salaries.filter(salary =>
            (salary.employeeID && salary.employeeID.includes(searchTerm)) ||
            (salary.employeeName && salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(results);
    }, [searchTerm, salaries]);

    // Function to handle update
    const handleUpdate = (id) => {
        const salaryToUpdate = salaries.find(salary => salary._id === id);
        setUpdateData({ ...salaryToUpdate });
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = async (id) => {
        try {
            setLoading(true);
            await axios.patch(`http://localhost:4000/salaries/salary/${id}`, updateData);
            const updatedSalaries = salaries.map(salary => (salary._id === id ? { ...salary, ...updateData } : salary));
            setSalaries(updatedSalaries);
            setUpdateData(null);
            alert('Salary updated successfully!');
        } catch (error) {
            console.error('Failed to update salary:', error);
            alert('Failed to update salary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle cancel
    const handleCancel = () => {
        setUpdateData(null);
    };

    // Return the JSX for the component
    return (
        <div>
            <h2>Salary Details</h2>
            <input
                type="text"
                placeholder="Search by Employee ID or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px' }}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Base Salary</th>
                            <th>Bonus</th>
                            <th>Payment Method</th>
                            <th>Notes</th>
                            <th>Payment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((salary) => (
                            <tr key={salary._id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                                <td>{salary.employeeID}</td>
                                <td>{salary.employeeName}</td>
                                <td>{salary.baseSalary}</td>
                                <td>{salary.bonus}</td>
                                <td>{salary.paymentMethod}</td>
                                <td>{salary.notes}</td>
                                <td>{salary.paymentDate}</td>
                                <td>
                                    <button style={{ backgroundColor: 'lightgreen', color: 'white', marginRight: '5px' }} onClick={() => handleUpdate(salary._id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Popup box for update */}
            {updateData && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '5px', zIndex: '1000', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h3>Update Salary</h3>
                    <label style={{ marginBottom: '5px' }}>Employee ID:</label>
                    <input type="text" name="employeeID" value={updateData.employeeID} readOnly style={{ marginBottom: '10px', padding: '5px' }} />
                    <label style={{ marginBottom: '5px' }}>Employee Name:</label>
                    <input type="text" name="employeeName" value={updateData.employeeName} onChange={handleChange} required style={{ marginBottom: '10px', padding: '5px' }} />
                    <label style={{ marginBottom: '5px' }}>Base Salary:</label>
                    <input type="number" name="baseSalary" value={updateData.baseSalary} onChange={handleChange} required style={{ marginBottom: '10px', padding: '5px' }} />
                    <label style={{ marginBottom: '5px' }}>Bonus:</label>
                    <input type="number" name="bonus" value={updateData.bonus} onChange={handleChange} required style={{ marginBottom: '10px', padding: '5px' }} />
                    <label style={{ marginBottom: '5px' }}>Payment Method:</label>
                    <select name="paymentMethod" value={updateData.paymentMethod} onChange={handleChange} required style={{ marginBottom: '10px', padding: '5px' }}>
                        <option value="">Select</option>
                        <option value="banktransfer">Bank Transfer</option>
                        <option value="cash">Cash</option>
                    </select>
                    <label style={{ marginBottom: '5px' }}>Notes:</label>
                    <textarea name="notes" value={updateData.notes} onChange={handleChange} style={{ marginBottom: '10px', padding: '5px' }}></textarea>
                    <label style={{ marginBottom: '5px' }}>Payment Date:</label>
                    <input type="date" name="paymentDate" value={updateData.paymentDate} onChange={handleChange} style={{ marginBottom: '10px', padding: '5px' }} />
                    <button style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }} onClick={() => handleSubmit(updateData._id)}>Submit</button>
                    <button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

// Export the component
export default StaffManagement_salarydetails;
