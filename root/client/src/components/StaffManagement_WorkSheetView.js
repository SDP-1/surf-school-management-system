import React, { useState, useEffect } from 'react';
import axios from "axios";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function StaffManagement_WorkSheetView() {
    const [worksheets, setWorksheets] = useState([]);

    const getWorksheets = () => {
        axios.get("http://localhost:4000/worksheet/w")
            .then((res) => {
                console.log(res.data);
                setWorksheets(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    useEffect(() => {
        getWorksheets();
    }, []);

    const handleDownload = () => {
        const input = document.getElementById('worksheet-table');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgHeight = canvas.height * 208 / canvas.width;
                pdf.text("This Week Worksheet", 10, 10);
                pdf.addImage(imgData, 'PNG', 0, 20, 208, imgHeight);
                pdf.save("worksheet.pdf");
            });
    };

    return (
        <div style={{ margin: "20px" }}>
            <h1>All Worksheets</h1>
            <button onClick={handleDownload} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer", marginBottom: "15px" }}>Download Full Worksheet</button>
            <table id="worksheet-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", border: "1px solid #ddd" }}>
                <thead>
                    <tr>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Eid</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Ename</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Role</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Monday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Tuesday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Wednesday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Thursday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Friday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Saturday</th>
                        <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", background: "#f2f2f2", color: "#333", borderRight: "1px solid #ddd" }}>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    {worksheets.map((worksheet, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Eid}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Ename}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Role}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Monday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Tuesday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Wednesday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Thursday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Friday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{worksheet.Saturday}</td>
                            <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{worksheet.Sunday}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
