import React, { useState } from 'react';
import styled from 'styled-components';
import Analytic from '../components/FinancialManagement_Analytic';
import BarChart from '../components/FinancialManagement_BarChart';
import LineChart from '../components/FinancialManagement_LineChart';
import { getMonth, getYear } from 'date-fns';

function Dashboard() {
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
    const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()) + 1); // Month index starts from 0

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const handleMonthChange = (e) => {
        const monthName = e.target.value;
        // Convert month name to month index (0-indexed)
        const monthIndex = new Date(Date.parse(monthName + ' 1, 2000')).getMonth() + 1;
        setSelectedMonth(monthIndex);
    };

    return (
        <Section>
            <div className="grid">   
                <div>
                <label>Select Year: </label>
                    <select value={selectedYear} onChange={handleYearChange}>
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={selectedYear - 5 + i} value={selectedYear - 5 + i}>{selectedYear - 5 + i}</option>
                        ))}
                    </select>
                    <label>Select Month: </label>
                    <select value={getMonthName(selectedMonth)} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={getMonthName(i + 1)}>{getMonthName(i + 1)}</option>
                        ))}
                    </select>
                </div>
                <Analytic year={selectedYear} month={selectedMonth} />
                <BarChart year={selectedYear} month={selectedMonth} />
                <LineChart year={selectedYear} month={selectedMonth} />
            </div>
        </Section>
    );
}

function getMonthName(monthIndex) {
    // Create a date object with the given month index and return its formatted month name
    return new Date(2000, monthIndex - 1, 1).toLocaleString('default', { month: 'long' });
}

export default Dashboard;

const Section = styled.section `
    padding: 2rem;
    background-color: #F5F5FD;
    .grid { 
        margin-top: 0.5rem;
        z-index: 2;
        width: 80%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;
