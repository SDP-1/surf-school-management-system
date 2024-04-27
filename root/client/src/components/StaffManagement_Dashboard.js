import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

export default function HomePage() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendanceData, setAttendanceData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    fetchTotalEmployees();
    fetchAttendanceData();
  }, []);

  const fetchTotalEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employee/alle/count");
      setTotalEmployees(response.data.totalEmployees);
    } catch (error) {
      console.error("Failed to fetch total employees:", error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const currentDate = getCurrentDate();
      const response = await axios.get(`http://localhost:4000/attendance/date/${currentDate}/count`);
      const currentDayCount = response.data.count;
      const attendanceData = { [currentDate]: currentDayCount };
      
      // Fetch data for the last six days including yesterday
      for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        const response = await axios.get(`http://localhost:4000/attendance/date/${formattedDate}/count`);
        attendanceData[formattedDate] = response.data.count;
      }
      
      setAttendanceData(attendanceData);
    } catch (error) {
      console.error("Failed to fetch attendance data:", error);
    }
  };
  

  useEffect(() => {
    if (Object.keys(attendanceData).length > 0) {
      createLineChart();
    }
  }, [attendanceData]);

  const createLineChart = () => {
    const ctx = document.getElementById('attendanceChart');
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    const attendanceCounts = Object.values(attendanceData);
    const totalAttendance = attendanceCounts.reduce((acc, count) => acc + count, 0);
    const averageAttendance = totalAttendance / attendanceCounts.length;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(attendanceData),
        datasets: [{
          label: 'Attendance Count',
          data: attendanceCounts,
          borderColor: 'black',
          borderWidth: 2,
          fill: false,
          tension: 0
        }, {
          label: 'Average Attendance',
          data: new Array(attendanceCounts.length).fill(averageAttendance.toFixed(2)), // Round to 2 decimal places
          borderColor: 'orange',
          borderWidth: 2,
          fill: false,
          borderDash: [5, 5],
          tension: 0
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Attendance Chart'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                if (label) {
                  return label + ': ' + context.parsed.y.toFixed(2);
                } else {
                  return context.parsed.y.toFixed(0);
                }
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Attendance Count'
            },
            beginAtZero: true,
            precision: 0,
            suggestedMax: 10 // Adjust the max value to control height
          }
        }
      }
    });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "calc(10px + 2vmin)", color: "black" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Staff Management</h2>
      <div className="main-container" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center", background: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
        <Link to="/staff/alle" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Profile Management <span className="sr-only"></span></Link>
        <Link to="/staff/request" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>LeaveRequest <span className="sr-only"></span></Link>
        <Link to="/staff/requests" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Leave management<span className="sr-only"></span></Link>
        <Link to="/staff/w" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Manage Worksheet <span className="sr-only"></span></Link>
        <Link to="/staff/notices" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Manage Notices <span className="sr-only"></span></Link>
        <Link to="/staff/adnotices" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Notices <span className="sr-only"></span></Link>
        <Link to="/staff/generateQRCode" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Qr code <span className="sr-only"></span></Link>
        <Link to="/staff/Attendance" className="nav-link" style={{ backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Attendance management <span className="sr-only"></span></Link>
        <div className="employee-count" style={{ gridColumn: "span 4", backgroundColor: "#336699", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "10px 15px", borderRadius: "20px", textAlign: "center", textDecoration: "none", color: "#fff" }}>Total Employees: {totalEmployees}</div>
      </div>
      <div className="chart-container" style={{ marginTop: "20px", width: "80%", height: "12cm" }}>
        <canvas id="attendanceChart"></canvas>
      </div>
    </div>
  );
}
