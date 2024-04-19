import logo1 from "./image/surf.jpeg";
import logo2 from "./image/fb3.jpg";
import logo3 from "./image/insta.jpg";
import React, { useEffect, useState } from "react";

function Footer() {
    const [footerVisible, setFooterVisible] = useState(false); // Initially hidden
    const [prevY, setPrevY] = useState(null); // Previous Y coordinate of the mouse

    useEffect(() => {
        let mouseY = null;

        const handleMouseMove = (event) => {
            mouseY = event.clientY;
            setPrevY(mouseY);
            if (mouseY >= window.innerHeight - 50) { // Adjust threshold as needed
                setFooterVisible(true);
            } else {
                setFooterVisible(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <footer className={`footer ${footerVisible ? 'visible' : 'hidden'}`} style={{ bottom: 0, width: '100%', backgroundColor: '#f8f8f8', borderTop: '2px solid #ccc', padding: '20px 0', zIndex: 1000 ,}}>
            <div className="container">
                <div className="footer-content">
                <div className="footer-logo" style={{  bottom: 20, left: 0 }}>
                        <img src={logo1} alt="Surfing School Logo" style={{ marginRight: 100 }} />
                    </div>
                    <div className="footer-info">
                        <h2>Contact Us</h2>
                        <p>Email: info@surfingschool.com</p>
                        <p>Phone: +1 123 456 7890</p>
                        <p>Address: 123 Beach Ave, Surf City</p>
                    </div>
                    <div className="footer-social">
                        <div className="social-icons" style={{ bottom: 10 }}>

                            <a href="#"><img src={logo2} alt="Facebook" /></a>
                            <a href="#"><img src={logo3} alt="Instagram" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
