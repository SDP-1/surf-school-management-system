import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

function Reports() {
    const [highestCountEvent, setHighestCountEvent] = useState(null);

    useEffect(() => {
        function getEvents() {
            axios.get("http://localhost:4000/event/")
                .then((res) => {
                    // Find the event with the highest TicketCount
                    const eventWithHighestCount = res.data.reduce((prev, current) => {
                        return (prev.TicketCount > current.TicketCount) ? prev : current;
                    });

                    setHighestCountEvent(eventWithHighestCount);
                })
                .catch((err) => {
                    alert(err);
                });
        }

        getEvents();
    }, []);

    // Function to generate PDF content
    const generatePDFContent = (event) => (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Most Purchased Event during the Month</Text>
                    {event.Image && <Image src={event.Image} style={styles.image} />}
                    <Text style={styles.middle}>Title: {event.Title}</Text>
                    <Text style={styles.middle}>Location: {event.Location}</Text>
                    <Text style={styles.middle}>Capacity: {event.Capacity}</Text>
                    <Text style={styles.middle}>Purchased Amount: {event.TicketCount}</Text>
                    <Text style={styles.paragraph}>
                    Amidst the bustling events of the month, one stands out as the undisputed highlight - our most purchased event. With an unprecedented surge in ticket sales, it has captivated the hearts of attendees, emerging as a beacon of entertainment and community engagement. From its inception, it promised an unparalleled experience, and it has delivered on that promise tenfold.

This event transcended expectations, offering a diverse range of attractions that appealed to a wide audience. From electrifying performances by renowned artists to interactive workshops and engaging activities, every moment was infused with excitement and joy. Attendees reveled in the vibrant atmosphere, forging unforgettable memories and meaningful connections with fellow participants.

Moreover, the success of this event extends beyond mere numbers. It serves as a testament to our commitment to delivering exceptional experiences that leave a lasting impact. Through meticulous planning and unwavering dedication, we curated an event that resonated with our audience, fostering a sense of belonging and camaraderie among attendees.

As we reflect on the month's festivities, this event remains a standout success story, symbolizing the power of creativity, collaboration, and community. Its legacy will endure as a testament to the magic that unfolds when passion meets purpose, inspiring us to continue pushing boundaries and creating moments that matter
                        {/* Your remaining text */}
                    </Text>
                </View>
            </Page>
        </Document>
    );

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            padding: 20,
        },
        section: {
            margin: 10,
            padding: 10,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,

        },
        middle: {
            fontSize: 12,
            fontWeight: 'bold',
           
        },
        paragraph: {
            fontSize: 11,
            lineHeight: 1.5,
            marginTop:'10px',
            
        },
        image: {
            
           marginTop:'20px',
           marginBottom:'20px',
            maxWidth: '100%',
            maxHeight: '200px',
            margin: '10px auto',
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center',marginTop:'20px'  }}>
            {highestCountEvent && (
                <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: '#f8f8f8', maxWidth: '700px', width: '100%', boxSizing: 'border-box', paddingRight: '40px' }}>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Most purchased event during the month</p>
                    <div className="event-details" style={{ fontSize: '14px', padding: '5px 0', textAlign: 'center' }}>
                        {highestCountEvent.Image && <img src={highestCountEvent.Image}alt="Event Image" style={{ maxWidth: '50%', height: 'auto', maxHeight: '300px', paddingBottom: '10px', margin: '0 auto' }} />}
                        {/* <p style={{ margin: 0 }}>Title: {highestCountEvent.Title}</p>
                        <p style={{ margin: 0 }}>Location: {highestCountEvent.Location}</p>
                        <p style={{ margin: 0 }}>Capacity: {highestCountEvent.Capacity}</p>
                        <p style={{ margin: 0 }}>Purchased Amount: {highestCountEvent.TicketCount}</p> */}
                        <p style={{ textAlign: 'justify', lineHeight: '1.6', fontSize: '0.8em', maxWidth: '500px', margin: '0 auto',marginTop:'20px', }}>
    Amidst the bustling events of the month, one stands out as the undisputed highlight - our most purchased event. With an unprecedented surge in ticket sales, it has captivated the hearts of attendees, emerging as a beacon of entertainment and community engagement. From its inception, it promised an unparalleled experience, and it has delivered on that promise tenfold.

   

    This event transcended expectations, offering a diverse range of attractions that appealed to a wide audience. From electrifying performances by renowned artists to interactive workshops and engaging activities, every moment was infused with excitement and joy. Attendees reveled in the vibrant atmosphere, forging unforgettable memories and meaningful connections
     with fellow participants.

    

    Moreover, the success of this event extends beyond mere numbers. It serves as a testament to our commitment to delivering exceptional experiences that leave a lasting impact. Through meticulous planning and unwavering dedication, we curated an event that resonated with our audience, fostering a sense of belonging and camaraderie among attendees.

    

    As we reflect on the month's festivities, this event remains a standout success story, symbolizing the power of creativity, collaboration, and community. Its legacy will endure as a testament to the magic that unfolds when passion meets purpose, inspiring us to continue pushing boundaries and creating moments that matter.
</p>

                        <PDFDownloadLink
                            document={generatePDFContent(highestCountEvent)}
                            fileName="report.pdf"
                            style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '10px', borderRadius: '5px', marginTop: '20px', display: 'inline-block' }}
                        >
                            Download PDF
                        </PDFDownloadLink>
                        <Link to={`/getsingleEvent/${encodeURIComponent(highestCountEvent.Title)}`} style={{ display: 'block', textDecoration: 'none', marginTop: '10px' }}>View</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;
