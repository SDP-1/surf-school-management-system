import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const CustomerManagement_Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (selectedMembership) {
      fetchMembersByMembership(selectedMembership);
    } else {
      fetchMembers();
    }
  }, [selectedMembership]);

  useEffect(() => {
    if (members.length > 0) {
      createOrUpdatePieChart();
    }
  }, [members]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Customer/customers/alle');
      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchMembersByMembership = async (membershipLevel) => {
    try {
      const response = await axios.get(`http://localhost:4000/Customer/bymembership/${membershipLevel}`);
      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleMembershipClick = (membershipLevel) => {
    setSelectedMembership(membershipLevel);
  };

  const createOrUpdatePieChart = () => {
    if (chartRef.current) {
      updatePieChart();
    } else {
      createPieChart();
    }
  };

  const createPieChart = () => {
    const membershipCounts = {};
    members.forEach((member) => {
      const level = member.membershipLevel;
      membershipCounts[level] = (membershipCounts[level] || 0) + 1;
    });

    const ctx = document.getElementById('membershipPieChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(membershipCounts),
        datasets: [{
          label: 'Membership Distribution',
          data: Object.values(membershipCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            // Add more colors if needed
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            // Add more colors if needed
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Membership Distribution'
          }
        }
      }
    });
  };

  const updatePieChart = () => {
    const membershipCounts = {};
    members.forEach((member) => {
      const level = member.membershipLevel;
      membershipCounts[level] = (membershipCounts[level] || 0) + 1;
    });

    chartRef.current.data.labels = Object.keys(membershipCounts);
    chartRef.current.data.datasets[0].data = Object.values(membershipCounts);
    chartRef.current.update();
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Membership Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {/* Silver Members Grid */}
        <div className="membershipGrid" style={{ marginRight: '10px' }}>
          <div className="membershipType" onClick={() => handleMembershipClick('Silver')} style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '200px' }}>Silver Members</div>
        </div>

        {/* Gold Members Grid */}
        <div className="membershipGrid" style={{ marginRight: '10px' }}>
          <div className="membershipType" onClick={() => handleMembershipClick('Gold')} style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '200px' }}>Gold Members</div>
        </div>

        {/* Platinum Members Grid */}
        <div className="membershipGrid">
          <div className="membershipType" onClick={() => handleMembershipClick('Platinum')} style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '200px' }}>Platinum Members</div>
        </div>
      </div>

      {/* Display the pie chart */}
      {!selectedMembership && !loading && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <canvas id="membershipPieChart" width="400" height="400"></canvas>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {members.map((member) => (
          <div key={member._id} className="member" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '200px', textAlign: 'center' }}>
            <p>{member.name}</p>
            {member.imageData && <img src={`data:${member.imageContentType};base64,${member.imageData}`} alt="Member" style={{ width: '100%', marginBottom: '10px' }} />}
            <p>Email: {member.email}</p>
            <p>Points: {member.points}</p>
            <p>Membership Level: {member.membershipLevel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerManagement_Dashboard;
