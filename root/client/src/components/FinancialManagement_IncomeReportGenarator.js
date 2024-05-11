import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

function IncomeReport() {
  //   const [highestCountEvent, setHighestCountEvent] = useState(null);
  const [payments, setPayments] = useState([]);
  //   const [editPayment, setEditPayment] = useState(null);
  //   const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  //   const [refreshTable, setRefreshTable] = useState(false);
  //   const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPayments();
    // let e = { target: { value: filterStatus } };
    // handleFilterChange(e);
  }, []);

  const fetchPayments = async () => {
    // console.log("fetchPayments");
    try {
      const res = await axios.get("http://localhost:4000/payment/");
      setPayments(res.data);
      //   console.log(payments); // This will log the updated state after setting payments
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;

    if (selectedStatus === "all") {
      axios
        .get("http://localhost:4000/payment/")
        .then((res) => {
          setPayments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(selectedStatus);
      axios
        .get(`http://localhost:4000/payment/status/${selectedStatus}`)
        .then((res) => {
          setPayments(res.data); // Filter payments based on selected status
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setFilterStatus(selectedStatus);
    // console.log(payments);
  };

  // Function to generate PDF content
  const generatePDFContent = (payments) => (
    <Document>
      <Page>
        <View>
          <Text style={styles.title}>All incomes</Text>
          <View style={styles.tableContainer}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.columnHeader}>#</Text>
                <Text style={styles.columnHeader}>RefId</Text>
                <Text style={styles.columnHeader}>Date/Time</Text>
                <Text style={styles.columnHeader}>Details</Text>
                <Text style={styles.columnHeader}>Comment</Text>
                <Text style={styles.columnHeader}>Status</Text>
                <Text style={styles.columnHeader}>AcceptBy</Text>
                <Text style={styles.columnHeader}>Cash Type</Text>
                <Text style={styles.columnHeader}>Is Advance</Text>
                <Text style={styles.columnHeader}>Total</Text>
                <Text style={styles.columnHeader}>Paid</Text>
                <Text style={styles.columnHeader}>Due</Text>
              </View>
              {payments.map((payment, index) => (
                <View style={styles.tableRow} key={payment._id}>
                  <Text>{index + 1}</Text>
                  <Text>{payment.refId}</Text>
                  <Text>{`${payment.date} / ${payment.time}`}</Text>
                  <Text>{payment.details}</Text>
                  <Text>{payment.comment}</Text>
                  <Text>{payment.status}</Text>
                  <Text>{payment.acceptBy}</Text>
                  <Text>{payment.cashType}</Text>
                  <Text>{payment.Advance ? "Yes" : "No"}</Text>
                  <Text>{payment.totalAmount}</Text>
                  <Text>{payment.amountPaid}</Text>
                  <Text>{payment.amountDue}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    tableContainer: {
      marginTop: 10,
    },
    table: {
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
    },
    columnHeader: {
      padding: 5,
      fontWeight: "bold",
    },
  });

  //   const styles = StyleSheet.create({
  //     page: {
  //       flexDirection: "column",
  //       backgroundColor: "#ffffff",
  //       padding: 20,
  //     },
  //     section: {
  //       margin: 10,
  //       padding: 10,
  //     },
  //     title: {
  //       fontSize: 18,
  //       fontWeight: "bold",
  //       marginBottom: 10,
  //     },
  //     middle: {
  //       fontSize: 12,
  //       fontWeight: "bold",
  //     },
  //     paragraph: {
  //       fontSize: 11,
  //       lineHeight: 1.5,
  //       marginTop: "10px",
  //     },
  //     image: {
  //       marginTop: "20px",
  //       marginBottom: "20px",
  //       maxWidth: "100%",
  //       maxHeight: "200px",
  //       margin: "10px auto",
  //     },
  //   });

  return (
    <div>
      <PDFDownloadLink
        document={generatePDFContent(payments)}
        fileName="report.pdf"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "blue",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "20px",
          display: "inline-block",
        }}
      >
        Download PDF
      </PDFDownloadLink>
      <Link
        to={`/getAllIncome/${encodeURIComponent(filterStatus)}`}
        style={{
          display: "block",
          textDecoration: "none",
          marginTop: "10px",
        }}
      >
        View
      </Link>
    </div>
  );
}

export default IncomeReport;
