import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

function OutgoingReportCSV({ data }) {
  const [outgoings, setOutgoings] = useState([]);
  const [filterStatus, setFilterStatus] = useState(data);

  useEffect(() => {
    let e = { target: { value: filterStatus } };
    handleFilterChange(e);
  }, []);

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;

    if (selectedStatus === "all") {
      axios
        .get("http://localhost:4000/outgoing/")
        .then((res) => {
          setOutgoings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(selectedStatus);
      axios
        .get(`http://localhost:4000/outgoing/status/${selectedStatus}`)
        .then((res) => {
          setOutgoings(res.data); // Filter outgoings based on selected status
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setFilterStatus(selectedStatus);
    // console.log(outgoings);
  };

  return (
    <div className="wrapper">
      {outgoings.length > 0 && (
        <>
          <h3>Export {data} outgoings</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">RefId</th>
                <th scope="col">Date/Time</th>
                <th scope="col">Details</th>
                <th scope="col">Comment</th>
                <th scope="col">Status</th>
                <th scope="col">AcceptBy</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {outgoings.map((outgoing, index) => (
                <tr key={outgoing._id} data-status={outgoing.status}>
                  <td>{index + 1}</td>
                  <td>{outgoing.refId}</td>
                  <td>
                    {outgoing.date} / {outgoing.time}
                  </td>
                  <td>{outgoing.details}</td>
                  <td>{outgoing.comment}</td>
                  <td>{outgoing.status}</td>
                  <td>{outgoing.acceptBy}</td>
                  <td>{outgoing.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CSv button to export */}
          <div className="csv-button">
            <CSVLink data={outgoings} filename={`Export ${data} outgoings`}>
              Export
            </CSVLink>
          </div>
        </>
      )}
    </div>
  );
}

export default OutgoingReportCSV;
