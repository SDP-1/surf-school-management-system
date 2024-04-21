import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

function EventLineChart() {
    const [events, setEvents] = useState([]);
    const chartRef = useRef(null); // Ref to store the chart instance

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/event");
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const processData = () => {
        // Define an object to store counts for each month
        let monthCounts = {
            January: { free: 0, purchased: 0 },
            February: { free: 0, purchased: 0 },
            March: { free: 0, purchased: 0 },
            April: { free: 0, purchased: 0 },
            May: { free: 0, purchased: 0 },
            June: { free: 0, purchased: 0 },
            July: { free: 0, purchased: 0 },
            August: { free: 0, purchased: 0 },
            September: { free: 0, purchased: 0 },
            October: { free: 0, purchased: 0 },
            November: { free: 0, purchased: 0 },
            December: { free: 0, purchased: 0 },
        };
    
        // Define array of month names
        const months = Object.keys(monthCounts);
    
        // Iterate over all events and update the counts for each month
        events.forEach(event => {
            const date = new Date(event.Date);
            const monthIndex = date.getMonth(); // Get the month index (0-11)
            const monthName = months[monthIndex]; // Get the month name from the array
            console.log(monthName)
            // Update the counts for the corresponding month
            if (event.Type === "Free") {
                return monthCounts[monthName].free++;
            } else if (event.Type === "Purchased") {
                return monthCounts[monthName].purchased++;
            }
        });
    
        // Extract counts from monthCounts object and store in separate arrays
        const freeCounts = months.map(month => monthCounts[month].free);
        const purchasedCounts = months.map(month => monthCounts[month].purchased);

        return { months, freeCounts, purchasedCounts };
    };

    const renderChart = () => {
        try {
            const { months, freeCounts, purchasedCounts } = processData();

            // Destroy existing chart if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create new chart instance
            const ctx = document.getElementById('eventChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Free Events',
                            data: freeCounts,
                            borderColor: 'blue',
                            backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        },
                        {
                            label: 'Purchased Events',
                            data: purchasedCounts,
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        },
                    ],
                },
            });
        } catch (error) {
            console.error("Error rendering chart:", error);
        }
    };

    useEffect(() => {
        renderChart();
    }, [events]);

    return (
        <div>
            <h2>Event Chart</h2>
            <canvas id="eventChart" width="200" height="60"></canvas>
        </div>
    );
}

export default EventLineChart;
