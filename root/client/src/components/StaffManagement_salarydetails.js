import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffManagement_salarydetails = () => {
    const [salaries, setSalaries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
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
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const results = salaries.filter(salary =>
            (salary.employeeID && salary.employeeID.includes(searchTerm)) ||
            (salary.employeeName && salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(results);
    }, [searchTerm, salaries]);

    return (
        <div>
            <h2>Salary Details</h2>
            <input
                type="text"
                placeholder="Search by Employee ID or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px' }} // Inline style for input element
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Employee ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Employee Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Base Salary</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Bonus</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Payment Method</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Notes</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Payment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((salary, index) => (
                        <tr key={index} style={{ backgroundColor: searchTerm && (salary.employeeID.includes(searchTerm) || salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ? '#f7f7f7' : '' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{salary.employeeID}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{salary.employeeName}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{salary.baseSalary}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{salary.bonus}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{salary.paymentMethod}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{salary.notes}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{salary.paymentDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffManagement_salarydetails;
