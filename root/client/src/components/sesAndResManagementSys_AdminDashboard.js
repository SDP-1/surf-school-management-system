import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardTitle,
  CCardText,
} from "@coreui/react";
import {
  fetchTotalSessions,
  fetchTotalReservations,
  fetchTotalRevenue,
  fetchTotalParticipants,
} from "./sesAndResManagementSys_api";

const AdminDashboard = () => {
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionCount = await fetchTotalSessions();
        const reservationCount = await fetchTotalReservations();
        const revenue = await fetchTotalRevenue();
        const studentsCount = await fetchTotalParticipants();

        setTotalSessions(sessionCount);
        setTotalReservations(reservationCount);
        setTotalRevenue(revenue);
        setTotalStudents(studentsCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pieChartRef.current && totalReservations && totalSessions) {
      // Destroy existing pie chart instance if it exists
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      const pieChartData = {
        labels: ["Total Reservations", "Total Sessions"],
        datasets: [
          {
            data: [totalReservations, totalSessions],
            backgroundColor: ["#36a2eb", "#ffcd56"],
          },
        ],
      };

      const ctx = pieChartRef.current.getContext("2d");
      pieChartInstance.current = new Chart(ctx, {
        type: "pie",
        data: pieChartData,
        options: {
         
          responsive: false, // Disable responsiveness
          maintainAspectRatio: false, // Disable aspect ratio
          width: 400, // Set width
          height: 400, // Set height
        },
      });
    }
  }, [totalReservations, totalSessions]);

  useEffect(() => {
    if (
      barChartRef.current &&
      totalReservations &&
      totalSessions &&
      totalStudents
    ) {
      // Destroy existing bar chart instance if it exists
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      const barChartData = {
        labels: ["Total Sessions", "Total Reservations", "Total Students"],
        datasets: [
          {
            label: "Count",
            data: [totalSessions, totalReservations, totalStudents],
            backgroundColor: [
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(255, 99, 132, 0.5)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const ctx = barChartRef.current.getContext("2d");
      barChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: {
          maintainAspectRatio: true, // Maintain aspect ratio
          aspectRatio: 4, // Aspect ratio to control size (adjust as needed)

          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [totalReservations, totalSessions, totalStudents]);

  return (
    <div className="container">
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Admin Dashboard</h3>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6" lg="3">
                  <CCard color="primary" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Total Sessions</CCardTitle>
                      <CCardText>{totalSessions}</CCardText>
                      <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6" lg="3">
                  <CCard color="info" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Total Reservations</CCardTitle>
                      <CCardText>{totalReservations}</CCardText>
                      <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton>
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol sm="6" lg="3">
                  <CCard color="warning" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Total Students</CCardTitle>
                      <CCardText>{totalStudents}</CCardText>
                      <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton>
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol sm="6" lg="3">
                  <CCard color="success" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Total Revenue</CCardTitle>
                      <CCardText>${totalRevenue}</CCardText>
                      <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <br/><br/><br/>
            
              <h3>Statistics</h3>
              <br/>
            
              <CRow>
                <CCol>
                  <canvas
                    ref={pieChartRef}
                    width={400} // Set canvas width
                    height={400} // Set canvas height
                  ></canvas>
                </CCol>
              </CRow>
              <br/><br/><br/>

              <CRow>
                <CCol>
                  <canvas
                    ref={barChartRef}
                    width={400} // Set canvas width
                    height={400} // Set canvas height
                  ></canvas>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default AdminDashboard;


