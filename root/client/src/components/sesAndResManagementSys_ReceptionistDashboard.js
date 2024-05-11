import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
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

const Dashboard = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch monthly revenue data
        const monthlyResponse = await axios.get(
          "http://localhost:4000/reservations/monthly-revenue"
        );
        if (monthlyResponse.data && Array.isArray(monthlyResponse.data)) {
          const mergedData = mergeWithEmptyMonths(monthlyResponse.data);
          setMonthlyRevenue(mergedData);
        } else {
          console.error(
            "Monthly revenue data not found in API response:",
            monthlyResponse.data
          );
        }

        // Fetch other dashboard data
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
    if (lineChartRef.current && monthlyRevenue.length > 0) {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      const months = monthlyRevenue.map((item) => item.month);
      const revenueData = monthlyRevenue.map((item) => item.totalRevenue);

      const lineChartData = {
        labels: months,
        datasets: [
          {
            label: "Monthly Revenue",
            data: revenueData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      };

      const ctx = lineChartRef.current.getContext("2d");
      lineChartInstance.current = new Chart(ctx, {
        type: "line",
        data: lineChartData,
        options: {
          maintainAspectRatio: true,
          aspectRatio: 2,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [monthlyRevenue]);

  useEffect(() => {
    if (pieChartRef.current && totalReservations && totalSessions) {
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
          responsive: false,
          maintainAspectRatio: false,
          width: 400,
          height: 400,
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
          maintainAspectRatio: true,
          aspectRatio: 4,
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

  const getMonthName = (month) => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const mergeWithEmptyMonths = (data) => {
    const monthsData = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return {
        month: getMonthName(month),
        totalRevenue: 0,
      };
    });

    data.forEach((item) => {
      const monthIndex = item._id - 1;
      monthsData[monthIndex] = {
        month: getMonthName(item._id),
        totalRevenue: item.totalRevenue,
      };
    });

    return monthsData;
  };

  return (
    <div className="container">
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Receptionist Dashboard</h3>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6" lg="3">
                  <CCard color="primary" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Total Sessions</CCardTitle>
                      <CCardText>{totalSessions}</CCardText>
                      {/* <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton> */}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6" lg="3">
                  <CCard color="info" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Total Reservations</CCardTitle>
                      <CCardText>{totalReservations}</CCardText>
                      {/* <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton> */}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6" lg="3">
                  <CCard color="warning" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Total Students</CCardTitle>
                      <CCardText>{totalStudents}</CCardText>
                      {/* <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton> */}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6" lg="3">
                  <CCard color="success" className="text-white text-center">
                    <CCardBody>
                      <CCardTitle>Reservation Revenue</CCardTitle>
                      <CCardText>${totalRevenue}</CCardText>
                      {/* <CButton color="light" className="mt-3" block>
                        View Details
                      </CButton> */}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <br />
              <br />
              <br />
              <h3>Statistics</h3>

              <br />
              <CRow>
                <CCol sm="6" lg="6">
                  <canvas ref={pieChartRef} width={400} height={400}></canvas>
                </CCol>
                <CCol sm="6" lg="6">
                  <canvas ref={lineChartRef}></canvas>
                </CCol>
              </CRow>
              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <CRow>
                <CCol>
                  <canvas ref={barChartRef} width={400} height={400}></canvas>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Dashboard;
