import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from 'chart.js/auto'; // Import Chart.js

function Analytics() {
    const [events, setEvents] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [chartInstance, setChartInstance] = useState(null); // Store chart instance
    const [eventCounts, setEventCounts] = useState(Array.from({ length: 12 }, () => 0)); // Initialize an array with 12 slots, each representing a month, with count initialized to 0

    useEffect(() => {
        axios.get("http://localhost:4000/event/")
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => {
                console.error("Error fetching events:", err);
            });
    }, []);

    useEffect(() => {
        if (!events || events.length === 0) {
            return;
        }

        const counts = Array.from({ length: 12 }, () => 0); // Initialize an array with 12 slots, each representing a month, with count initialized to 0
        
        // Count events for each month
        events.forEach(event => {
            const date = new Date(event.Date);
            const monthIndex = date.getMonth(); // Get the month index (0-11)

            counts[monthIndex]++;
        });

        setEventCounts(counts);
    }, [events]);

    useEffect(() => {
        if (!eventCounts || eventCounts.length === 0) {
            return;
        }

        const totalEvents = events.length;
        const eventPercentages = eventCounts.map(count => (count / totalEvents) * 100);
        // Map event counts to Chart.js format
        const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'long' })); // Get month names for labels
        
        setChartData({
            labels: monthLabels,
            datasets: [
                {
                    label: "Events by Month",
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
                    hoverBorderColor: "rgba(54, 162, 235, 1)",
                    data: eventPercentages
                }
            ]
        });
    }, [eventCounts]);

    useEffect(() => {
        if (!chartData) {
            return;
        }

        // Destroy existing chart if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        const ctx = document.getElementById('myChart');
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(1) + '%'; // Show percentage in tooltip
                                }
                                const monthIndex = context.dataIndex;
                                label += ' (' + eventCounts[monthIndex] + ' events)'; // Show exact event count in tooltip
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + "%";
                            }
                        }
                    }
                }
            }
        });

        setChartInstance(newChartInstance); // Store new chart instance
    }, [chartData]);

    return (
        <div>
            <h2>Events by Month</h2>
            <div style={{ margin: "20px" }}>
                <canvas id="myChart" width="200" height="60"></canvas>
            </div>
        </div>
    );
}

export default Analytics;
