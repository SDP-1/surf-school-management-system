import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

function HDashboard() {
  // Function to get current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to check if a date string represents today's date
  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  };

  // Function to check if a date string represents tomorrow's date
  const isTomorrow = (dateString) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(dateString);
    return date.getFullYear() === tomorrow.getFullYear() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getDate() === tomorrow.getDate();
  };

  const [chartData, setChartData] = useState([]);
  const [totalLastThirtyDays, setTotalLastThirtyDays] = useState(0);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [rentalsEndingTodayAndTomorrow, setRentalsEndingTodayAndTomorrow] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    updateData();
    const updateIntervalId = setInterval(updateData, 24 * 60 * 60 * 1000);
    return () => clearInterval(updateIntervalId);
  }, []);

  useEffect(() => {
    fetchRentalsEndingTodayAndTomorrow();
  }, []);

  const updateData = async () => {
    setCurrentDate(getCurrentDate());
    await fetchChartData();
    await fetchLastThirtyDaysTotal();
  };

  const fetchChartData = async () => {
    try {
      const lastFourDays = [];
      for (let i = 0; i < 7; i++) {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - i);
        const formattedDate = dateObj.toISOString().slice(0, 10);
        lastFourDays.push(formattedDate);
      }

      const data = await Promise.all(
        lastFourDays.map(async (currentDate) => {
          const response = await fetch(`http://localhost:4000/Receipt/receipts/date/${currentDate}/total`);
          const jsonData = await response.json();
          return { date: jsonData.date, totalAmount: jsonData.totalAmount };
        })
      );

      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const fetchLastThirtyDaysTotal = async () => {
    try {
      const response = await fetch(`http://localhost:4000/Receipt/receipts/lastthirtydays`);
      const data = await response.json();
      setTotalLastThirtyDays(data.totalAmount);
    } catch (error) {
      console.error('Error fetching total for last thirty days:', error);
    }
  };

  const fetchRentalsEndingTodayAndTomorrow = async () => {
    try {
      const response = await fetch(`http://localhost:4000/Rental/rental/enddate/todayandtomorrow`);
      const data = await response.json();
      setRentalsEndingTodayAndTomorrow(data);
    } catch (error) {
      console.error('Error fetching rentals ending today and tomorrow:', error);
    }
  };

  useEffect(() => {
    if (chartData.length > 0 || totalLastThirtyDays > 0) {
      createOrUpdateBarChart();
    }
  }, [chartData, totalLastThirtyDays]);

  const createOrUpdateBarChart = () => {
    if (!chartRef.current) {
      const ctx = document.getElementById('myChart');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.map(item => item.date),
          datasets: [{
            label: 'Sum of Final Amount',
            data: chartData.map(item => item.totalAmount),
            backgroundColor: chartData.map(item => {
              // Set different background color for today's bar
              if (item.date === currentDate) {
                return 'rgba(54, 162, 235, 0.7)'; // Blue
              } else {
                return 'rgba(0, 0, 0, 0.7)'; // Black
              }
            }),
            borderColor: chartData.map(item => {
              // Set different border color for today's bar
              if (item.date === currentDate) {
                return 'rgba(54, 162, 235, 1)'; // Blue
              } else {
                return 'rgba(0, 0, 0, 1)'; // Black
              }
            }),
            borderWidth: 1,
            barThickness: 20,
            borderRadius: 10,
          },
          {
            label: 'Moving Average',
            data: calculateMovingAverage(chartData.map(item => item.totalAmount), 3), // Change window size as needed
            type: 'line',
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)', // Red color for moving average line
            tension: 0.1,
            pointRadius: 0
          }]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Days',
                color: '#333',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Sum of Final Amount',
                color: '#333',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                borderRadius: 10,
              }
            }
          }
        }
      });
    } else {
      chartRef.current.data.labels = chartData.map(item => item.date);
      chartRef.current.data.datasets[0].data = chartData.map(item => item.totalAmount);
      chartRef.current.data.datasets[1].data = calculateMovingAverage(chartData.map(item => item.totalAmount), 3); // Change window size as needed
      chartRef.current.update();
    }
  };
  
  // Function to calculate moving average
  const calculateMovingAverage = (data, windowSize) => {
    const movingAverage = [];
    for (let i = 0; i < data.length; i++) {
      const startIdx = Math.max(0, i - windowSize + 1);
      const endIdx = i + 1;
      const subset = data.slice(startIdx, endIdx);
      const average = subset.reduce((acc, curr) => acc + curr, 0) / subset.length;
      movingAverage.push(average);
    }
    return movingAverage;
  };

  return (
    <div style={{ margin: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {/* Grids */}
      {/* Total Sales for Last Thirty Days Grid */}
      <div style={{ margin: '20px', display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {/* Total Sales for Last Thirty Days Grid */}
        <div style={{ width: '100%', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
          <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>Total Sales for Last Thirty Days</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '20px', color: '#666' }}>Sales amount in last 30 days:</h4>
            <p style={{ fontSize: '24px', color: '#FF5733', fontWeight: 'bold' }}>{totalLastThirtyDays}</p>
          </div>
        </div>

        {/* Navigation Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div className="nav-item" style={{ backgroundColor: '#ADD8E6', padding: '10px', borderRadius: '5px', textAlign: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Link to="/Sale/dashboard" className="nav-link active" aria-current="page"> Dashboard </Link>
          </div>
          <div className="nav-item" style={{ backgroundColor: '#ADD8E6', padding: '10px', borderRadius: '5px', textAlign: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Link to="/Sale/category/:category" className="nav-link active" aria-current="page"> Home </Link>
          </div>
          <div className="nav-item" style={{ backgroundColor: '#ADD8E6', padding: '10px', borderRadius: '5px', textAlign: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Link to="/Sale/add" className="nav-link">Add Sales</Link>
          </div>
          <div className="nav-item" style={{ backgroundColor: '#ADD8E6', padding: '10px', borderRadius: '5px', textAlign: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Link to="/Sale/rental/add" className="nav-link">Rental</Link>
          </div>
          {/* Add more navigation links here */}
        </div>

        {/* Bar Chart */}
        <div style={{ width: '100%', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
          <h3>Receipts Chart</h3>
          <canvas id="myChart" style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}></canvas>
        </div>
      </div>

      {/* Rentals Table */}
      <div style={{ width: '50%', marginTop: '20px', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h3>Rentals Ending Today and Tomorrow</h3>
        {/* Instructions for colors */}
        <p style={{ textAlign: 'center', marginBottom: '10px' }}>Background color indicates:</p>
        <p style={{ textAlign: 'center', marginBottom: '10px' }}><span style={{ backgroundColor: '#FFD6CC', padding: '5px', borderRadius: '5px' }}>Today</span> <span style={{ backgroundColor: '#FFFFCC', padding: '5px', borderRadius: '5px' }}>Tomorrow</span> Normal color for other days</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Customer Name</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Passport ID</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Rental Start Date</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Rental End Date</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Rental Item</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Price Per Day</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Handover Item</th>
            </tr>
          </thead>
          <tbody>
            {rentalsEndingTodayAndTomorrow.map(rental => (
              <tr key={rental._id} style={{ backgroundColor: isToday(rental.rentalEndDate) ? '#FFD6CC' : isTomorrow(rental.rentalEndDate) ? '#FFFFCC' : 'inherit' }}>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{rental.customerName}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{rental.passportId}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{rental.rentalStartDate}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{rental.rentalEndDate}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{rental.rentalItem}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{rental.pricePerDay}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{rental.handoverItem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HDashboard;
