import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const CustomerManagement_CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const tableRef = useRef(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Customer/customers/alle');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      return fetchCustomers(); // If search term is empty, fetch all customers
    }

    const filteredCustomers = customers.filter(customer => {
      // Check if any field exactly matches the search term
      return Object.values(customer).some(value => {
        return value !== null && value.toString().toLowerCase() === searchTerm.toLowerCase();
      });
    });

    setCustomers(filteredCustomers);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownloadPDF = () => {
    const sortedCustomers = [...customers].sort((a, b) => b.points - a.points); // Sort customers by points
    const doc = new jsPDF('p', 'pt', 'a4');
    const table = tableRef.current;
    const tableData = [];
    tableData.push(['Customer ID', 'Name', 'Email', 'Points', 'Membership Level', 'Discount']);

    sortedCustomers.forEach((customer, index) => {
      tableData.push([
        customer.customerId,
        customer.name,
        customer.email,
        customer.points,
        customer.membershipLevel,
        getDiscount(customer.membershipLevel, index)
      ]);
    });

    // Display top 3 winners
    const top3 = sortedCustomers.slice(0, 3);
    doc.text(40, 40, 'Top 3 Winners:');
    top3.forEach((customer, index) => {
      doc.text(40, 60 + (index * 20), `${index + 1}. Customer ID: ${customer.customerId}, Points: ${customer.points}`);
    });

    doc.autoTable({
      startY: 100,
      head: [tableData[0]],
      body: tableData.slice(1),
      styles: { fontStyle: 'bold' },
    });

    doc.save('customer_table.pdf');
  };

  const getDiscount = (membershipLevel, index) => {
    if (index === 0) {
      return '50%'; // First winner
    } else if (index === 1) {
      return '25%'; // Second winner
    } else if (index === 2) {
      return '10%'; // Third winner
    }

    if (membershipLevel === 'Platinum') {
      return '5%';
    } else if (membershipLevel === 'Gold') {
      return '3%';
    }
    return 'No discount';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Customers Table</h2>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
        <button onClick={handleSearch} style={{ marginLeft: '10px', backgroundColor: '#4CAF50', color: 'white' }}>Search</button>
        <button onClick={fetchCustomers} style={{ marginLeft: '10px', backgroundColor: '#f44336', color: 'white' }}>Reset</button>
        <button onClick={handleDownloadPDF} style={{ marginLeft: '10px', backgroundColor: '#008CBA', color: 'white' }}>Download PDF</button>
      </div>
      <table className="customer-table" ref={tableRef} style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Customer ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Points</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Membership Level</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Discount</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.customerId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.points}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.membershipLevel}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{getDiscount(customer.membershipLevel)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement_CustomerTable;
