import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function AttendanceQRCode() {
    const [qrCode, setQRCode] = useState('');
    const qrCodeRef = useRef(null);

    const generateQRCode = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Qr/generateQRCode');
            setQRCode(response.data.qrCode);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleDownloadPDF = () => {
        html2canvas(qrCodeRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('qr_code.pdf');
        });
    };

    useEffect(() => {
        generateQRCode();

        // Refresh QR code every hour
        const interval = setInterval(() => {
            generateQRCode();
        }, 3600000); // 1 hour in milliseconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '80%', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ color: '#333', marginBottom: '30px' }}>Attendance QR Code Generator</h1>
                {qrCode && (
                    <>
                        <div ref={qrCodeRef}>
                            <img src={qrCode} alt="QR Code" style={{ width: '300px', height: '300px', marginTop: '20px' }} />
                        </div>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScRe6zScirXmWsO6y4zatGcKD7ImGDrrdK8wyY99FXQM6Q54Q/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Go to Google Form</a>
                        <button style={{ width: '100%', padding: '15px', fontSize: '18px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }} onClick={handleDownloadPDF}>Download PDF</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default AttendanceQRCode;
