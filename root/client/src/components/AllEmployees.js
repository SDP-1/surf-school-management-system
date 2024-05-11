import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    function getEmployees() {
      axios.get('http://localhost:8070/employee/').then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getEmployees();
  }, {});

  return (
    <div className="container">
    <h1 style={{color:"Highlight"}}>All Employees</h1>
    <div className="mt-3">
            <Link className="btn btn-success" to="/add"> Add Employee</Link>
      </div>

    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Employee ID</th>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Age</th>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Address</th>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Gender</th>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Contact No</th>
          <th style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index} style={{ 
            backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white',
            transition: 'background-color 0.3s',
          }}>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{employee.eid}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{employee.name}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{employee.age}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{employee.address}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{employee.gender}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{employee.email}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{employee.contactno}</td>
            <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
              <Link className='btn btn-primary' to={`/update/${employee.eid}`}>Edit</Link>
              <Link className='btn btn-danger' to={`/delete/${employee.eid}`}>Delete</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}